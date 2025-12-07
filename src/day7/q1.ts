import fs from "fs";

let bs = new Set<string>();
let split = new Set<string>();

const map = fs
  .readFileSync("src/day7/input.txt")
  .toString()
  .split("\n")
  .map(l => l);

console.log(runBeam(0, map[0].indexOf('S')));

function runBeam(x: number, y: number): number {
  if (bs.has(`${x},${y}`)) return 0;

  bs.add(`${x},${y}`);
  for (let i = x + 1; i < map.length; i++) {
    if (map[i][y] === '^') {
      if (split.has(`${i},${y}`)) return 0;
      split.add(`${i},${y}`);
      return 1 + runBeam(i, y - 1) + runBeam(i, y + 1)
    };
  }

  return 0;
}