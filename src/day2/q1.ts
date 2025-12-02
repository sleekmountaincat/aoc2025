import fs from "fs";

let cnt = 0;

const map = fs
  .readFileSync("src/day2/input.txt")
  .toString()
  .split(",")
  .forEach(l=>{
    let [min, max] = l.split("-").map(Number);

    for (let i = min; i <= max; i++) {
      let s = i.toString();

      if (s.length % 2) continue;

      if (s.substring(0, s.length/2) === s.substring(s.length/2)) {
        cnt += i
      }
    }
  });

  console.log(cnt)