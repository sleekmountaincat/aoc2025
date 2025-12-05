import fs from "fs";

interface Range {
  start: number;
  end: number;
}

let fresh: Range[] = [];
let combined: Range[] = [];
let cnt = 0;

fs
  .readFileSync("src/day5/input.txt")
  .toString()
  .split("\n")
  .forEach(l => {
    let line = l.split("-").map(Number);

    if (line.length > 1) {
      fresh.push({ start: line[0], end: line[1] });
    }
  });

fresh.sort((a, b) => a.start - b.start);

combined.push(fresh[0]);

for (let i = 1; i < fresh.length; i++) {
  let last = combined[combined.length - 1];
  
  if (fresh[i].start <= last.end) {
    last.end = Math.max(last.end, fresh[i].end);
  } else {
    combined.push(fresh[i]);
  }
}

for (let r of combined) {
  cnt += (r.end - r.start + 1);
}

console.log(cnt)