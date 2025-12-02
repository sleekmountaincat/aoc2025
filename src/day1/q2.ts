import fs from "fs";

let dial = 50;
let cnt = 0;

const map = fs
  .readFileSync("src/day1/input.txt")
  .toString()
  .split("\n")
  .forEach(l=>{
    const d = l[0];
    const n = +l.slice(1) % 100;

    let newDial = d === "L" ? dial - n : dial + n;

    if (newDial < 0) {
      if (dial != 0 ) cnt++;
      newDial += 100;
    } else if (newDial > 99) {
      if (newDial - 100 != 0) cnt++;
      newDial -= 100;
    }

    if (newDial === 0) cnt++;

    cnt += Math.floor(+l.slice(1) / 100);

    dial = newDial;
  });

console.log(cnt)


