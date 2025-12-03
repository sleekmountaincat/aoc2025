import fs from "fs";

let cnt = 0;

const map = fs
  .readFileSync("src/day3/input.txt")
  .toString()
  .split("\n")
  .forEach(l=>{
    const bank = l.split("").map(Number);
    const d1 = Math.max(...bank.slice(0,-1));
    const d2 = Math.max(...bank.slice(bank.indexOf(d1)+1));
    cnt += +`${d1}${d2}`;
  });

  console.log(cnt)