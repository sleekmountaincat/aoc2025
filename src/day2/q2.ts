import fs from "fs";
const { factors } = require("factors-of-n") as {
  factors: (n: number) => number[];
};

let cnt = 0;

const map = fs
  .readFileSync("src/day2/input.txt")
  .toString()
  .split(",")
  .forEach(l=>{
    let [min, max] = l.split("-").map(Number);

    for (let i = min; i <= max; i++) {
      let s = i.toString();
      let facts = factors(s.length).slice(0, -1);

      for (const f of facts) {
        const chunks = s.match(new RegExp(`.{1,${f}}`, 'g')) || [];
        if (chunks.every((v) => v === chunks[0]) && chunks.length > 1) {
          cnt += i;
          break
        }
      }
    }
  });

console.log(cnt)
