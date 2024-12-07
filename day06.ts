import fs from "fs";

const useTestInput = true;

// 5525 too low

const inputFile = fs.readFileSync("input/day06.txt");

const testInput: string = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

let inputRows: string[];
if (useTestInput) {
  inputRows = testInput.split("\n");
} else {
  inputRows = inputFile.toString().split("\n").slice(0, -1);
}
const map = inputRows.map((row) => row.split(""));
const mapHeight = map.length;
const mapWidth = map[0].length;

type Direction = "N" | "E" | "S" | "W";
type GuardPosition = {
  position: { x: number; y: number };
  direction: Direction;
};

function getGuardPosition(): GuardPosition {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") return { position: { x, y }, direction: "N" };
    }
  }
  throw new Error("Could not locate the guard");
}

function move(guard: GuardPosition, map: string[][]): GuardPosition {
  const x = guard.position.x;
  const y = guard.position.y;
  if (guard.direction === "N") {
    if (y > 0 && map[y - 1][x] === "#")
      return { position: { y, x: x + 1 }, direction: "E" };
    else return { position: { y: y - 1, x }, direction: "N" };
  }
  if (guard.direction === "E") {
    if (x < mapWidth - 1 && map[y][x + 1] === "#")
      return { position: { y: y + 1, x }, direction: "S" };
    else return { position: { y, x: x + 1 }, direction: "E" };
  }
  if (guard.direction === "S") {
    if (y < mapHeight - 1 && map[y + 1][x] === "#")
      return { position: { y, x: x - 1 }, direction: "W" };
    else return { position: { y: y + 1, x }, direction: "S" };
  }
  if (guard.direction === "W") {
    if (x > 0 && map[y][x - 1] === "#")
      return { position: { y: y - 1, x }, direction: "N" };
    else return { position: { y, x: x - 1 }, direction: "W" };
  }
  throw new Error("This has to be done to make Typescript shut up about it.");
}

function countXs(): number {
  let total = 0;
  for (const row of map) {
    for (const col of row) {
      if (col === "X") total++;
    }
  }
  return total;
}

async function part1() {
  let guardPosition = getGuardPosition();
  while (true) {
    map[guardPosition.position.y][guardPosition.position.x] = "X";
    guardPosition = move(guardPosition, map);
    if (
      guardPosition.position.y < 0 ||
      guardPosition.position.y >= mapHeight ||
      guardPosition.position.x < 0 ||
      guardPosition.position.x >= mapWidth
    ) {
      break;
    }
  }
  console.log(countXs());
}

async function part2() {
  const maxRounds = 100000;
  let total = 0;
  const guardStartingPosition = getGuardPosition();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      // If there is already block or it's the guard's starting position, skip to next
      if (
        map[y][x] === "#" ||
        (y === guardStartingPosition.position.y &&
          x === guardStartingPosition.position.x)
      )
        continue;
      // Reset guard position
      let guardPosition = guardStartingPosition;
      // Get a fresh copy of the map
      let mapCopy = map.slice();
      // Place a new block on the map
      mapCopy[y][x] = "#";
      // Reset the rounds
      let round = 1;
      while (true) {
        // Move the guard until it gets out...
        guardPosition = move(guardPosition, mapCopy);
        if (
          guardPosition.position.y < 0 ||
          guardPosition.position.y >= mapHeight ||
          guardPosition.position.x < 0 ||
          guardPosition.position.x >= mapWidth
        ) {
          break;
        }
        // ...or max round is reached, when it (probably) got stuck in endless loop
        if (round > maxRounds) {
          console.log(`Block placement at (${x},${y}) lead to endless loop.`);
          total++;
          break;
        }
        round++;
      }
    }
  }
  console.log(total);
}

// part1();
part2();
