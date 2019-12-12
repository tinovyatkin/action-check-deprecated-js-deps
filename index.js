import core from "@actions/core";
import getAllDeps from "./get-all-deps";

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput("milliseconds");
    console.log(`Waiting ${ms} milliseconds ...`);

    core.debug(new Date().toTimeString());
    const res = getAllDeps();
    console.log(res);
    core.debug(new Date().toTimeString());

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
