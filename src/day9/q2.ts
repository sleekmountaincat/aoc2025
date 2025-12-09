// 2d coordinate compression so i can search for this next year
import fs from "fs";
import { combinations } from 'combinatorial-generators';

interface Point {
  x: number;
  y: number;
}

let points = fs
  .readFileSync("src/day9/input.txt")
  .toString()
  .split("\n")
  .map(l => {
    const [x, y] = l.split(",").map(Number)
    return { x, y };
  });

let max = 0;

// compress the coordinates
let allX = points.map(p => p.x);
let allY = points.map(p => p.y);
let uniqX = Array.from(new Set(allX)).sort((a, b) => a - b);
let uniqY = Array.from(new Set(allY)).sort((a, b) => a - b);

let xMap: Map<number, number> = new Map();
let yMap: Map<number, number> = new Map();
uniqX.forEach((x, i) => xMap.set(x, i));
uniqY.forEach((y, i) => yMap.set(y, i));

let grid = Array.from({ length: uniqY.length }, () => Array(uniqX.length).fill('.'));

let zPoints = points.map(p => {
  grid[yMap.get(p.y)!][xMap.get(p.x)!] = '#';
  return {
    x: xMap.get(p.x)!,
    y: yMap.get(p.y)!
  }
});

// rasterize 
for (let i = 0; i < zPoints.length; i++) {
  const a = zPoints[i];
  const b = zPoints[(i + 1) % zPoints.length]; // fancy trick to wrap around to first point, thanks random internet person

  if (a.x === b.x) {
    const [y0, y1] = [a.y, b.y].sort((a, b) => a - b);
    for (let y = y0; y <= y1; y++) {
      grid[y][a.x] = '#';
    }
  } else if (a.y === b.y) {
    const [x0, x1] = [a.x, b.x].sort((a, b) => a - b);
    for (let x = x0; x <= x1; x++) {
      grid[a.y][x] = '#';
    }
  }
}

floodFill(grid, getInsidePoint(grid));

for (const [a, b] of combinations(points, 2)) {
  if (isEnclosed(a, b, grid)) {
    const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
    if (area > max) max = area;
  }
}

console.log(max)

function printGrid(grid: string[][]) {
  for (let row of grid) {
    console.log(row.join(""));
  }
}

function isEnclosed(a: Point, b: Point, grid: string[][]): boolean {
  const [x1, x2] = [xMap.get(a.x)!, xMap.get(b.x)!].sort((a, b) => a - b);
  const [y1, y2] = [yMap.get(a.y)!, yMap.get(b.y)!].sort((a, b) => a - b);

  for (let x = x1; x <= x2; x++) {
    if (grid[y1][x] === '.' || grid[y2][x] === '.') return false;
  }

  for (let y = y1; y <= y2; y++) {
    if (grid[y][x1] === '.' || grid[y][x2] === '.') return false;
  }
  return true;
}

function floodFill(grid: string[][], start: Point) {
  const stack = [start];
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (stack.length) {
    const p = stack.pop()!;
    if (grid[p.y][p.x] !== ".") continue;
    grid[p.y][p.x] = "X";

    for (const [dx, dy] of dirs) {
      const nx = p.x + dx, ny = p.y + dy;
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        if (grid[ny][nx] === ".") stack.push({ x: nx, y: ny });
      }
    }
  }
}

// raycast point in polygon, count .# and #. transitions, odd means inside
function getInsidePoint(grid: string[][]): Point {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== '.') continue;

      let hitsLeft = 0;
      let prev = '.';

      for (let i = x; i >= 0; i--) {
        const cur = grid[y][i];
        if (cur !== prev) {
          hitsLeft++;
        }
        prev = cur;
      }

      if (hitsLeft % 2 === 1) {
        return { x, y };
      }
    }
  }
  throw new Error("no inside point found");
}
