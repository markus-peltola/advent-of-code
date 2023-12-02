import fs from 'fs';

const DAY = '02';

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

async function part1() {
  const input = fs.readFileSync(`input/day${DAY}.txt`);
  const games = input.toString().split('\r\n');

  const gamesPossible = new Map<number, boolean>();
  let totalSum = 0;

  for (const game of games) {
    const gameId = parseInt(game.split(':')[0].split(' ')[1]);
    const sets = game.split(':')[1].split(';');
    let gamePossible = true;
    for (const set of sets) {
      const setColors = set.split(',');
      for (const setColor of setColors) {
        const color = setColor.trim().split(' ')[1];
        switch (color) {
          case 'red':
            if (parseInt(setColor.trim().split(' ')[0]) > RED_CUBES) gamePossible = false;
            break;
          case 'green':
            if (parseInt(setColor.trim().split(' ')[0]) > GREEN_CUBES) gamePossible = false;
            break;
          case 'blue':
            if (parseInt(setColor.trim().split(' ')[0]) > BLUE_CUBES) gamePossible = false;
            break;
          default:
            break;
        }
        if (!gamePossible) break;
      }
      if (!gamePossible) break;
    }
    if (gamePossible) totalSum += gameId;
  }
  console.log(totalSum);
}

async function part2() {
  const input = fs.readFileSync(`input/day${DAY}.txt`);
  const games = input.toString().split('\r\n');

  let totalSum = 0;

  for (const game of games) {
    let fewestRedCubes = 0;
    let fewestGreenCubes = 0;
    let fewestBlueCubes = 0;
    const sets = game.split(':')[1].split(';');
    for (const set of sets) {
      const setColors = set.split(',');
      for (const setColor of setColors) {
        const color = setColor.trim().split(' ')[1];
        const amount = parseInt(setColor.trim().split(' ')[0]);
        switch (color) {
          case 'red':
            if (amount > fewestRedCubes) fewestRedCubes = amount;
            break;
          case 'green':
            if (amount > fewestGreenCubes) fewestGreenCubes = amount;
            break;
          case 'blue':
            if (amount > fewestBlueCubes) fewestBlueCubes = amount;
            break;
          default:
            throw new Error(`Color ${color} not supported!`);
        }
      }
    }
    totalSum += fewestRedCubes * fewestGreenCubes * fewestBlueCubes;
  }

  console.log(totalSum);
}

// part1();
part2();
