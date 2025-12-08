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
  ptA: number;
  ptB: number;
  distance: number;
}

const lim = 1000;
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

  if (heap.size() < lim) {
    heap.enqueue({ ptA: a.i, ptB: b.i, distance: d });
  } else if (d < heap.front()!.distance) {
    heap.dequeue();
    heap.enqueue({ ptA: a.i, ptB: b.i, distance: d });
  }
}

heap.toArray().reverse().forEach(d => {
  let found = false;
  for (let c of circuits) {
    if (c.has(d.ptA) || c.has(d.ptB)) {
      c.add(d.ptA);
      c.add(d.ptB);
      found = true;
    }
  }

  if (!found) circuits.push(new Set([d.ptA, d.ptB]));
});

for (let i = 0; i < circuits.length; i++) {
  for (let j = i + 1; j < circuits.length; j++) {
    if ([...circuits[i]].some(pt => circuits[j].has(pt))) {
      circuits[i] = new Set([...circuits[i], ...circuits[j]]);
      circuits.splice(j, 1);
      j = i + 1;
    }
  }
}

circuits.sort((a, b) => b.size - a.size);

console.log(circuits.splice(0, 3).reduce((acc, cur) => acc * cur.size, 1));

function calcDist(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
}
