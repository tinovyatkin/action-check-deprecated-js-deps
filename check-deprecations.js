import npmQuery from "package-json";
import * as semver from "semver";
import * as core from "@actions/core";

/**
 *
 * @param {Map<string, {file: string, type: 'dependencies' | 'devDependencies' | 'resolutions', version: string}[]>} allDeps
 */
export default async function checkDeprecations(allDeps) {
  const ignore =
    core.getInput("ignore", {
      required: false
    }) || "";
  const modulesToIgnore = new Set(ignore.split(/\s*,\s*/g).filter(v => v));

  /** @type {Set<string>} */
  const deprecated = new Set();

  for (const [name, pkgs] of allDeps) {
    const tag = pkgs.find(({ version }) => !semver.valid(version));
    const latestUsedVersion = tag
      ? tag.version
      : pkgs.sort((p1, p2) => (semver.gte(p1.version, p2.version) ? -1 : 1))[0]
          .version;

    try {
      const pi = await npmQuery(name, {
        version: latestUsedVersion
      });
      if (pi.deprecated) {
        console.warn("📦  \x1b[1m\x1b[31m%s\x1b[0m: %s", name, pi.deprecated);
        for (const pk of pkgs) {
          console.log("\t %s [%s]: %s", pk.file, pk.type, pk.version);
        }
        if (modulesToIgnore.has(name)) console.warn("Ignoring...");
        else deprecated.add(name);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return deprecated;
}
