import fs from 'fs';

const useTestInput = false;

// 1778 too low

const inputFile = fs.readFileSync('input/day06.txt');

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
  inputRows = testInput.split('\n');
} else {
  inputRows = inputFile.toString().split('\n');
}
const originalMap = inputRows.map((row) => row.split(''));
const mapHeight = originalMap.length;
const mapWidth = originalMap[0].length;

type Direction = 'N' | 'E' | 'S' | 'W';
type GuardPosition = {
  position: { x: number; y: number };
  direction: Direction;
};

function getGuardPosition(): GuardPosition {
  for (let y = 0; y < originalMap.length; y++) {
    for (let x = 0; x < originalMap[y].length; x++) {
      if (originalMap[y][x] === '^') return { position: { x, y }, direction: 'N' };
    }
  }
  throw new Error('Could not locate the guard');
}

function move(guard: GuardPosition, map: string[][]): GuardPosition {
  const x = guard.position.x;
  const y = guard.position.y;
  if (guard.direction === 'N') {
    if (y > 0 && map[y - 1][x] === '#') return { position: { y, x }, direction: 'E' };
    else return { position: { y: y - 1, x }, direction: 'N' };
  }
  if (guard.direction === 'E') {
    if (x < mapWidth - 1 && map[y][x + 1] === '#') return { position: { y, x }, direction: 'S' };
    else return { position: { y, x: x + 1 }, direction: 'E' };
  }
  if (guard.direction === 'S') {
    if (y < mapHeight - 1 && map[y + 1][x] === '#') return { position: { y, x }, direction: 'W' };
    else return { position: { y: y + 1, x }, direction: 'S' };
  }
  if (guard.direction === 'W') {
    if (x > 0 && map[y][x - 1] === '#') return { position: { y, x }, direction: 'N' };
    else return { position: { y, x: x - 1 }, direction: 'W' };
  }
  throw new Error('This has to be done to make Typescript shut up about it.');
}

function countXs(): number {
  let total = 0;
  for (const row of originalMap) {
    for (const col of row) {
      if (col === 'X') total++;
    }
  }
  return total;
}

const guardStartingPosition = getGuardPosition();

async function part1() {
  let guardPosition = getGuardPosition();
  while (true) {
    originalMap[guardPosition.position.y][guardPosition.position.x] = 'X';
    guardPosition = move(guardPosition, originalMap);
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
  const maxRounds = 10000;
  let total = 0;
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      // Use X's from part 1 to decide where to place the blocks
      if (originalMap[y][x] !== 'X') continue;
      // Reset guard position
      let guardPosition = guardStartingPosition;
      // Get a fresh copy of the map
      let mapCopy = originalMap.map((rows) => [...rows]);
      // Place a new block on the map
      mapCopy[y][x] = '#';
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
          total++;
          break;
        }
        round++;
      }
    }
  }
  console.log(total);
}

part1();
part2();
