import fs from "fs";
import memoize from "memoize";

let devs: Map<string, string[]> = new Map();

fs.readFileSync("src/day11/input.txt")
  .toString()
  .split("\n")
  .forEach(l => {
    let dev = l.replace(":", "").split(" ");
    devs.set(dev[0], dev.slice(1));
  })

let runMachine = (key: string, dac: boolean, fft: boolean): number => {
  let cur = devs.get(key)!;

  if (cur[0] === "out") return dac && fft ? 1 : 0;

  return cur.reduce((a, c) => { return a + runMachine(c, dac || c === "dac", fft || c === "fft") }, 0);
}

runMachine = memoize(runMachine, {
  cacheKey: (arguments_) => arguments_.join(',')
});

console.log(runMachine("svr", false, false));