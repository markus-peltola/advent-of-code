import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day2.txt');
  const rows = input.toString().split('\r\n');

  /*
  A & X = Rock
  B & Y = Paper
  C & Z = Scissors
  */

  const pointMap: Map<string, number> = new Map();
  pointMap.set('X', 1);
  pointMap.set('Y', 2);
  pointMap.set('Z', 3);

  const winMap: Map<string, string> = new Map();
  winMap.set('X', 'C');
  winMap.set('Y', 'A');
  winMap.set('Z', 'B');

  const tieMap: Map<string, string> = new Map();
  tieMap.set('X', 'A');
  tieMap.set('Y', 'B');
  tieMap.set('Z', 'C');

  let totalPoints = 0;

  for (const row of rows) {
    const opponent = row.split(' ')[0];
    const me = row.split(' ')[1];

    if (opponent === tieMap.get(me)) {
      totalPoints += pointMap.get(me) + 3;
    } else if (opponent === winMap.get(me)) {
      totalPoints += pointMap.get(me) + 6;
    } else {
      totalPoints += pointMap.get(me);
    }
  }

  // Answer to part 1
  console.log(totalPoints);
}

function part2() {
  const input = fs.readFileSync('input/day2.txt');
  const rows = input.toString().split('\r\n');

  /*
  A & X = Rock
  B & Y = Paper
  C & Z = Scissors
  */

  const pointMap: Map<string, number> = new Map();
  pointMap.set('X', 1);
  pointMap.set('Y', 2);
  pointMap.set('Z', 3);

  const winMap: Map<string, string> = new Map();
  winMap.set('A', 'Y');
  winMap.set('B', 'Z');
  winMap.set('C', 'X');

  const tieMap: Map<string, string> = new Map();
  tieMap.set('A', 'X');
  tieMap.set('B', 'Y');
  tieMap.set('C', 'Z');

  const loseMap: Map<string, string> = new Map();
  loseMap.set('A', 'Z');
  loseMap.set('B', 'X');
  loseMap.set('C', 'Y');

  let totalPoints = 0;

  for (const row of rows) {
    const opponent = row.split(' ')[0];
    const endResult = row.split(' ')[1];

    let me = '';

    if (endResult === 'X') {
      // I need to lose
      me = loseMap.get(opponent);
      totalPoints += pointMap.get(me);
    } else if (endResult === 'Y') {
      // I need to tie
      me = tieMap.get(opponent);
      totalPoints += pointMap.get(me) + 3;
    } else {
      // I need to win
      me = winMap.get(opponent);
      totalPoints += pointMap.get(me) + 6;
    }
  }

  // Answer to part 2
  console.log(totalPoints);
}

part1();
part2();
