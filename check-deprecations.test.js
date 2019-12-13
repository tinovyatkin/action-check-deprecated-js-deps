import checkDeprecations from "./check-deprecations";

describe("checkDeprecations", () => {
  it("returns list of deprecated modules", async () => {
    const deps = new Map([
      ["eslint", [{ version: "latest" }]],
      [
        "css-mqpacker",
        [
          {
            file: "test/package.json",
            type: "devDependencies",
            version: "2.0.0"
          },
          {
            file: "wow/package.json",
            type: "dependencies",
            version: "7.0.0"
          }
        ]
      ]
    ]);
    const res = await checkDeprecations(deps);
    expect(res).toBeInstanceOf(Set);
    expect(res).toHaveProperty("size", 1);
    expect(res.has("css-mqpacker")).toBeTruthy();
  }, 20000);
});
