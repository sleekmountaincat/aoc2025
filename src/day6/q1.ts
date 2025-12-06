import fs from "fs";

let cnt = 0;

const lines = fs
  .readFileSync("src/day6/input.txt")
  .toString()
  .split("\n")
  .map(l => l.trim().split(/\s+/));

  let len = lines.length;

  for (let i = 0; i < lines[0].length ; i++) {
    let p = ""
    for (let j = 0; j < len-1; j++) {
      p += j === len - 2 ? `${lines[j][i]}` : `${lines[j][i]} ${lines[len-1][i]} `
    }
    console.log(p)
    cnt += eval(p);
  }

console.log(cnt)

// lines[0][0] 
//   lines[len-1][0]
// lines[1][0]
//   lines[len -1][0]
// lines[2][0]

// +

// lines[0][1] 
//   lines[len -1][1]
// lines[1][1]
//   lines[len -1][1]
// lines[2][1]