import fs from "fs";
import { init } from 'z3-solver';

let ans: BigInt = BigInt(0);
let lines = fs
  .readFileSync("src/day10/input.txt")
  .toString()
  .split("\n");

for (let l of lines) {
  let buttons = l.split(" ").map(x => x.replaceAll(/[\[\](){}]/g, ""));
  let lights = buttons.splice(0, 1)[0];
  let joltage = buttons.splice(-1, 1)[0].split(",").map(Number);
  let btns = buttons.map(b => b.trim().split(",").map(Number));
  ans += await hitButtons(joltage, btns);
}

console.log(ans);

async function hitButtons(target: number[], buttons: number[][]) {
  const { Context } = await init();
  const { Int, Optimize } = Context('main');

  const opt = new Optimize();
  const btns: Map<Number, ReturnType<typeof Int.const>> = new Map();

  for (let x = 0; x < buttons.length; x++) {
    btns.set(x, Int.const(`x${x}`));
    opt.add(btns.get(x)!.ge(0));
  }

  for (let t = 0; t < target.length; t++) {
    let sum: ReturnType<typeof Int.const> | null = null;

    for (let b = 0; b < buttons.length; b++) {
      if (buttons[b].includes(t)) {
        sum = sum ? sum.add(btns.get(b)!) : btns.get(b)!;
      }
    }

    opt.add(sum!.eq(target[t]));
  }

  let press = btns.get(0)!;
  for (let i = 1; i < btns.size; i++) {
    press = press.add(btns.get(i)!);
  }

  opt.minimize(press);

  if (await opt.check() === 'sat') {
    let btnTot: BigInt = BigInt(0);

    for (let b of btns.keys()) {
      btnTot += opt.model().eval(btns.get(b)!).value();;
    }
    console.log(btnTot)
    return btnTot;
  } else {
    throw new Error("ummmmmmmm")
  }
}
