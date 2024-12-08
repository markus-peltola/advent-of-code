import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day08.txt');

const testInput: string = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

let inputRows: string[];
if (useTestInput) {
  inputRows = testInput.split('\n');
} else {
  inputRows = inputFile.toString().split('\n').slice(0, -1);
}

type Point = { x: number; y: number };
type AntennaCoords = {
  type: string,
  coords: Point[]
}

const map = inputRows.map(row => row.split(''));
const mapHeight = map.length;
const mapWidth = map[0].length;

function getAntinodePoints(point1: Point, point2: Point): Point[] {
  const x1 = point1.x;
  const x2 = point2.x;
  const y1 = point1.y;
  const y2 = point2.y;

  let antinode1: Point;
  let antinode2: Point;

  if (y2 > y1 && x2 > x1 || y2 < y1 && x2 < x1) {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    antinode1 = { x: Math.min(x1, x2) - dx, y: Math.min(y1, y2) - dy }
    antinode2 = { x: Math.max(x1, x2) + dx, y: Math.max(y1, y2) + dy }
  } else {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    antinode1 = { x: Math.max(x1, x2) + dx, y: Math.min(y1, y2) - dy }
    antinode2 = { x: Math.min(x1, x2) - dx, y: Math.max(y1, y2) + dy }
  }

  const returnArray = [];
  if (antinode1.x >= 0 && antinode1.x < mapWidth && antinode1.y >= 0 && antinode1.y < mapHeight) {
    returnArray.push(antinode1);
  }
  if (antinode2.x >= 0 && antinode2.x < mapWidth && antinode2.y >= 0 && antinode2.y < mapHeight) {
    returnArray.push(antinode2);
  }

  return returnArray;
}

function getAntennaCoords(map: string[][]): AntennaCoords[] {
  const antennaCoords: AntennaCoords[] = [];
  // Get all the different kind of antennas from the map
  const antennaTypes = new Set<string>();
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      if (map[y][x] !== '.') antennaTypes.add(map[y][x]);
    }
  }

  // Get all the coords for different antennas from the map
  for (const antenna of antennaTypes) {
    antennaCoords.push({ type: antenna, coords: [] });
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        if (map[y][x] === antenna) antennaCoords.find(antennaCoord => antennaCoord.type === antenna)!.coords.push({ y, x });
      }
    }
  }
  return antennaCoords;
}

function generateUniquePairs(coords: Point[]): [Point, Point][] {
  const pairs: [Point, Point][] = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      pairs.push([coords[i], coords[j]]);
    }
  }

  return pairs;
}

function part1() {
  const antennaCoords = getAntennaCoords(map);
  const antinodes: Point[] = [];
  for (const antCoords of antennaCoords) {
    console.log(`Calculating antinodes for antenna: ${antCoords.type}`);
    const coordPairs = generateUniquePairs(antCoords.coords);
    for (const coordPair of coordPairs) {
      const coordPairAntinodes = getAntinodePoints(coordPair[0], coordPair[1]);
      for (const antinodeCandidate of coordPairAntinodes) {
        if (antinodes.some(antinode => antinode.x === antinodeCandidate.x && antinode.y === antinodeCandidate.y)) continue;
        antinodes.push(antinodeCandidate);
      }
    }
    console.log(`Antinodes so far: ${antinodes.length}`);
  }
  console.log(`Total antinodes: ${antinodes.length}`);
}

function part2() {
  const antennaCoords = getAntennaCoords(map);
  const antinodes: Point[] = [];
}

// part1();
part2();
