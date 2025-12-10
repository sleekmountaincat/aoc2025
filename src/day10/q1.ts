import fs from "fs";

interface State {
  btnPress: number;
  lights: string;
}

const ans = fs
  .readFileSync("src/day10/input.txt")
  .toString()
  .split("\n")
  .map(l => {
    let buttons = l.split(" ").map(x => x.replaceAll(/[\[\](){}]/g, ""));
    let lights = buttons.splice(0, 1)[0];
    let joltage = buttons.splice(-1, 1);
    return hitButtons(lights, buttons);
  })
  .reduce((a, b) => a + b, 0);

console.log(ans);

function hitButtons(target: string, buttons: string[]): number {
  let start = '.'.repeat(target.length);

  let q: State[] = [{ btnPress: 0, lights: start }];
  let visited = new Set<string>(start);

  while (q.length > 0) {
    let state = q.shift()!;
    if (state.lights === target) return state.btnPress;

    for (let btn of buttons) {
      let nextLight = state.lights.split("");
      let lts = btn.split(",").map(Number);
      for (let lt of lts) {
        nextLight[lt] = state.lights[lt] === '.' ? '#' : '.';
      }

      if (!visited.has(nextLight.join(""))) {
        visited.add(nextLight.join(""));
        q.push({ lights: nextLight.join(""), btnPress: state.btnPress + 1 });
      }
    }
  }

  return -1;
}