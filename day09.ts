import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day9.txt');
  const steps = input.toString().split('\r\n');

  const visitedCoords: string[] = [];

  let head = [0, 0];
  let tail = [0, 0];

  for (const step of steps) {
    const moveCount = parseInt(step.split(' ')[1]);
    const direction = step.split(' ')[0];

    for (let i = 0; i < moveCount; i++) {
      head = moveHead(head, direction);
      tail = moveTail(head, tail);
      if (!visitedCoords.includes(`${tail[0]}${tail[1]}`)) visitedCoords.push(`${tail[0]}${tail[1]}`);
    }
  }
  console.log(visitedCoords.length);
}

async function part2() {
  const input = fs.readFileSync('input/day9.txt');
  const steps = input.toString().split('\r\n');

  const visitedCoords: string[] = [];

  let head = [0, 0];
  let tail1 = [0, 0];
  let tail2 = [0, 0];
  let tail3 = [0, 0];
  let tail4 = [0, 0];
  let tail5 = [0, 0];
  let tail6 = [0, 0];
  let tail7 = [0, 0];
  let tail8 = [0, 0];
  let tail9 = [0, 0];

  for (const step of steps) {
    const moveCount = parseInt(step.split(' ')[1]);
    const direction = step.split(' ')[0];

    for (let i = 0; i < moveCount; i++) {
      head = moveHead(head, direction);
      tail1 = moveTail(head, tail1);
      tail2 = moveTail(tail1, tail2);
      tail3 = moveTail(tail2, tail3);
      tail4 = moveTail(tail3, tail4);
      tail5 = moveTail(tail4, tail5);
      tail6 = moveTail(tail5, tail6);
      tail7 = moveTail(tail6, tail7);
      tail8 = moveTail(tail7, tail8);
      tail9 = moveTail(tail8, tail9);
      if (!visitedCoords.includes(`${tail9[0]}${tail9[1]}`)) visitedCoords.push(`${tail9[0]}${tail9[1]}`);
    }
  }
  console.log(visitedCoords.length);
}

function moveHead(coords: number[], direction: string): number[] {
  switch (direction) {
    case 'U':
      return [coords[0] - 1, coords[1]];
    case 'R':
      return [coords[0], coords[1] + 1];
    case 'D':
      return [coords[0] + 1, coords[1]];
    case 'L':
      return [coords[0], coords[1] - 1];
    default:
      return coords;
  }
}

function moveTail(headCoords: number[], tailCoords: number[]): number[] {
  let newTailCoords = tailCoords;
  // Check if tail needs to move or not
  if (
    headCoords[0] - tailCoords[0] <= 1 &&
    headCoords[0] - tailCoords[0] >= -1 &&
    headCoords[1] - tailCoords[1] <= 1 &&
    headCoords[1] - tailCoords[1] >= -1
  ) {
    return newTailCoords;
  } else {
    // Ih head has moved too much right
    if (headCoords[1] - tailCoords[1] > 0) tailCoords[1] = tailCoords[1] + 1;
    // Ih head has moved too much left
    if (headCoords[1] - tailCoords[1] < 0) tailCoords[1] = tailCoords[1] - 1;
    // Ih head has moved too much down
    if (headCoords[0] - tailCoords[0] > 0) tailCoords[0] = tailCoords[0] + 1;
    // Ih head has moved too much up
    if (headCoords[0] - tailCoords[0] < 0) tailCoords[0] = tailCoords[0] - 1;
    return newTailCoords;
  }
}

// part1();
part2();
