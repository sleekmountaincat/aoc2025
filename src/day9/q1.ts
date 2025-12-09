import fs from "fs";
import { combinations } from 'combinatorial-generators';

let max = 0;

const points = fs
  .readFileSync("src/day9/input.txt")
  .toString()
  .split("\n")
  .map(l => l.split(",").map(Number));

for (const [a, b] of combinations(points, 2)) {
  const area = (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
  if (area > max) max = area;
}

console.log(max)
