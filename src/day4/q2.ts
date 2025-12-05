import fs from "fs";

let total = 0;
let count = 0;

let map = fs
  .readFileSync("src/day4/input.txt")
  .toString()
  .split("\n")
  .map(l => `X${l}X`);

map.unshift("X".repeat(map[0].length));
map.push("X".repeat(map[0].length));

do {
  [count, map] = removeBale(map);
  total += count;
  console.log('count', count);
} while (count > 0);

console.log('total', total)

function removeBale(map: string[]): [number, string[]] {
  let cnt = 0;
  let nextMap = [...map]

  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] === '@') {
        const neighbors = `${map[i - 1][j]}${map[i + 1][j]}${map[i][j - 1]}${map[i][j + 1]}${map[i - 1][j - 1]}${map[i - 1][j + 1]}${map[i + 1][j - 1]}${map[i + 1][j + 1]}`;
        if ((neighbors.split('@').length - 1) < 4) {
          cnt++;
          nextMap[i] = nextMap[i].substring(0, j) + 'R' + nextMap[i].substring(j + 1);
        }
      }
    }
  }

  return [cnt, nextMap];
}