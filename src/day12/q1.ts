import fs from "fs";

let area: number[] = [];
let a = 0;
let tot = 0;
fs
  .readFileSync("src/day12/input.txt")
  .toString()
  .split("\n")
  .map(l => {
    if (l.includes("#")) {
      a += (l.match(/#/g) || []).length;
    } else if (!l.length) {
      area.push(a)
      a = 0
    } else if (l.includes("x")) {
      let x = l.split(":");
      let [h, w] = x[0].split("x").map(Number);

      let nums = x[1].split(" ").map(Number).filter(c => c > 0)

      let boxesArea = nums.reduce((a, c, i) => { return a + (c * area[i]) }, 0)

      if (boxesArea / (h * w) < .74) tot++;
    }
  })

console.log(tot)