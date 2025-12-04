import fs from "fs";

let cnt = 0;

const map = fs
  .readFileSync("src/day4/input.txt")
  .toString()
  .split("\n")
  .map(l => `X${l}X`);

map.unshift("X".repeat(map[0].length));
map.push("X".repeat(map[0].length));

for (let i = 1; i < map.length - 1; i++) {
  for (let j = 1; j < map[0].length - 1; j++) {
    if (map[i][j] === '@') {
      const neighbors = `${map[i - 1][j]}${map[i + 1][j]}${map[i][j - 1]}${map[i][j + 1]}${map[i - 1][j - 1]}${map[i - 1][j + 1]}${map[i + 1][j - 1]}${map[i + 1][j + 1]}`;
      if ((neighbors.split('@').length - 1) < 4) cnt++;
    }
  }
}

console.log(cnt)