import { readFile } from "fs/promises";
import { exec } from "child_process";

const cmdType = {
  ONE_TIME: "one-time",
  RECURRING: "recurring",
};
const startScheduler = async () => {
  const data = await readFile("input-cmd.txt", "utf-8");
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line.length > 0);
  const oneTimeRegex = /^(\d{1,2}) (\d{1,2}) (\d{1,2}) (\d{1,2}) (\d{4}) (.+)$/;
  const recurringRegex = /^\*\/(\d+) (.+)$/;

  const oneTimeCmds = [];
  const recursiveCmds = [];
  const cmds = [];
  lines.forEach((line) => {
    const oneTimeMatch = line.match(oneTimeRegex);
    const recurringMatch = line.match(recurringRegex);
    if (oneTimeMatch) {
      const [_, min, hour, day, month, year, command] = oneTimeMatch;
      const targetTime = new Date(year, month - 1, day, hour, min, 0, 0);
      const now = new Date();
      if (targetTime >= now) {
        const timeDiff = targetTime - now;
        setTimeout(() => {
          executeCmd(command);
        }, timeDiff);
      }
    } else if (recurringMatch) {
      const [_, interval, command] = recurringMatch;
      executeCmd(command);
      setInterval(() => {
        executeCmd(command);
      }, interval * 60 * 1000);
    } else {
      console.error("invalid command -->", line);
    }
  });
};
startScheduler();

const executeCmd = (command) => {
  exec(command, (err, stdout, stderr) => {
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());
    if (err) console.error("Error:", err.message);
  });
};
