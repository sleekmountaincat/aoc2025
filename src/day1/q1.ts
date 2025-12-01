import fs from "fs";

const map = fs
  .readFileSync("src/day1/input.txt")
  .toString()
  .split("\n")
  .forEach(l=>console.log(l));