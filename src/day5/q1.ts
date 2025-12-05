import fs from "fs";

let fresh: number[] = [];
let cnt = 0;

const map = fs
  .readFileSync("src/day5/input.txt")
  .toString()
  .split("\n")
  .forEach(l => {
    let line = l.split("-").map(Number);

    if (line.length > 1) {
      fresh.push(...line)
    } else {
      for(let i = 0; i < fresh.length; i+=2) {
        if (line[0] >= fresh[i] && line[0] <= fresh[i+1]) {
          cnt++;
          break;
        }
      }
    }
  });

console.log(cnt)
