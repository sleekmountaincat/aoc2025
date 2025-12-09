import fs from "fs";
import { combinations } from 'combinatorial-generators';
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

interface Point {
  i: number;
  x: number;
  y: number;
  z: number;
}

interface Dist {
  ptA: Point;
  ptB: Point;
  distance: number;
}

const heap = new MaxPriorityQueue((d: Dist) => d.distance);
const circuits: Set<number>[] = []

const points = fs
  .readFileSync("src/day8/input.txt")
  .toString()
  .split("\n")
  .map((l, i) => {
    const [x, y, z] = l.split(",").map(Number);
    return { i: i + 1, x, y, z }
  });

for (const [a, b] of combinations(points, 2)) {
  const d = calcDist(a, b);
  heap.enqueue({ ptA: a, ptB: b, distance: d });
}

const cxs = heap.toArray().reverse();

for (let m = 0; m < cxs.length; m++) {
  let found = false;
  for (let c of circuits) {
    if (c.has(cxs[m].ptA.i) || c.has(cxs[m].ptB.i)) {
      c.add(cxs[m].ptA.i);
      c.add(cxs[m].ptB.i);
      found = true;
    }
  }

  if (!found) circuits.push(new Set([cxs[m].ptA.i, cxs[m].ptB.i]));

  for (let i = 0; i < circuits.length; i++) {
    for (let j = i + 1; j < circuits.length; j++) {
      if ([...circuits[i]].some(pt => circuits[j].has(pt))) {
        circuits[i] = new Set([...circuits[i], ...circuits[j]]);
        circuits.splice(j, 1);
        j = i + 1;
      }
    }
  }

  if (circuits[0].size === points.length) {
    console.log(cxs[m].ptA.x * cxs[m].ptB.x);
    break;
  }
}

function calcDist(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
}
