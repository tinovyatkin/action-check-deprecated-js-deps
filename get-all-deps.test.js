import getAllDeps from "./get-all-deps";

describe("getAllDeps", () => {
  it("returns map of all deps", () => {
    const res = getAllDeps();
    expect(res).toBeInstanceOf(Map);
    expect(res.size).toBe(19);
  });

  it("works with monorepo", () => {
    process.env.INPUT_ROOT = "__tests__/monorepo-fixture";
    const res = getAllDeps();
    expect(res).toMatchSnapshot();
  });
});
