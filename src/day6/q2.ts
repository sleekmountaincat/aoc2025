import fs from "fs";

let cnt = 0;
let equa = ""

const lines = fs
  .readFileSync("src/day6/input.txt")
  .toString()
  .split("\n")
  .map(l => l.split(""));

  let len = lines.length;

  for (let i = lines[0].length - 1; i >= 0; i--) {
    let p="";

    for (let j = 0; j < len; j++) {
      p += lines[j][i]
    }

    if (p.includes("*") || p.includes("+")) {
      equa += " " + p;
      // remove all whitespace, replace with math term, then get rid of math term at start and end
      equa = equa.replaceAll(/\s+/g, p[p.length - 1]).replace(/^\D+|\D+$/g, "");
      cnt += eval(equa);
      equa = "";
    } else {
      equa += " " + p;
    }
  }

console.log(cnt)