import fs from "fs";

let cnt = 0;
const s = 12;

const map = fs
  .readFileSync("src/day3/input.txt")
  .toString()
  .split("\n")
  .forEach(l => {
    let bank = l.split("").map(Number);
    let n = '';

    for (let i = s - 1; i >= 1; i--) {
      const nextDigit = Math.max(...bank.slice(0, -i));
      n += nextDigit.toString()
      bank = bank.slice(bank.indexOf(nextDigit) + 1);
    }

    cnt += +(n + Math.max(...bank).toString());
  });

console.log(cnt)
