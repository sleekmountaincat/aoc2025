import fs from "fs";
import memoize from 'memoize';

const map = fs
  .readFileSync("src/day7/input.txt")
  .toString()
  .split("\n")
  .map(l => l);

let runBeam = (x: number, y: number): number => {
  for (let i = x + 1; i < map.length; i++) {
    if (map[i][y] === '^') {
      return 1 + runBeam(i, y - 1) + runBeam(i, y + 1)
    };
  }

  return 0;
}

runBeam = memoize(runBeam, {
  cacheKey: (arguments_: number[]) => arguments_.join(',')
});

console.log(runBeam(0, map[0].indexOf('S'))+1);
