import fs from "fs";

let devs: Map<string, string[]> = new Map();
fs
  .readFileSync("src/day11/input.txt")
  .toString()
  .split("\n")
  .forEach(l => {
    let dev = l.replace(":", "").split(" ");
    devs.set(dev[0], dev.slice(1));
  })

console.log(runMachine("you"));

function runMachine(key: string): number {
  let cur = devs.get(key)!;

  if (cur[0] === "out") return 1;

  return cur.reduce((a, c) => { return a + runMachine(c) }, 0);
}

