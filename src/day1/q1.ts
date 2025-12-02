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
      newDial += 100;
    } else if (newDial > 99) {
      newDial -= 100;
    }

    if (newDial === 0) cnt++;
    console.log(dial, d, n, newDial, cnt)

    dial = newDial;
  });