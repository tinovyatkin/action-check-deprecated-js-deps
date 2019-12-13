"use strict";

import { existsSync } from "fs";
import path from "path";

import getPackages from "get-monorepo-packages";
import * as core from "@actions/core";
import loadJsonFile from "load-json-file";

export default function getAllDependencies() {
  const rootDir = core.getInput("root", { required: false }) || process.cwd();

  // check if we have package.json in the
  /**
   * @type {{location: string, package: Object}[]}
   */
  const allPackages = getPackages(rootDir);
  if (!Array.isArray(allPackages))
    throw new Error(`Failure while searching for package.json files`);
  const rootPackageJson = path.join(rootDir, "package.json");
  if (
    existsSync(rootPackageJson) &&
    !allPackages.some(({ location }) => location === rootPackageJson)
  ) {
    allPackages.push({
      location: rootPackageJson,
      package: loadJsonFile.sync(rootPackageJson)
    });
  }

  /**
   * @type {Map<string, {file: string, type: 'dependencies' | 'devDependencies' | 'resolutions', version: string}[]>}
   */
  const result = new Map();
  for (const { location, package: pk } of allPackages) {
    for (const type of ["devDependencies", "dependencies", "resolutions"]) {
      if (type in pk) {
        for (const [name, version] of Object.entries(pk[type])) {
          if (!result.has(name)) result.set(name, []);
          result.get(name).push({
            file: path.relative(rootDir, location),
            type,
            version
          });
        }
      }
    }
  }
  return result;
}
