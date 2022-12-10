import * as fs from 'fs';

const crates = [
  ['F', 'C', 'P', 'G', 'Q', 'R'],
  ['W', 'T', 'C', 'P'],
  ['B', 'H', 'P', 'M', 'C'],
  ['L', 'T', 'Q', 'S', 'M', 'P', 'R'],
  ['P', 'H', 'J', 'Z', 'V', 'G', 'N'],
  ['D', 'P', 'J'],
  ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'],
  ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'],
  ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W']
];

async function part1() {
  const input = fs.readFileSync('input/day5.txt');
  const steps = input.toString().split('\r\n');

  for (const step of steps) {
    const amount = parseInt(step.split(' ')[1]);
    const from = parseInt(step.split(' ')[3]);
    const to = parseInt(step.split(' ')[5]);

    for (let i = 0; i < amount; i++) {
      crates[to - 1].push(crates[from - 1].pop());
    }
  }

  const answer: string[] = [];

  crates.forEach((crateStack) => answer.push(crateStack.pop()));
  console.log(answer.join(''));
}

async function part2() {
  const input = fs.readFileSync('input/day5.txt');
  const steps = input.toString().split('\r\n');

  for (const step of steps) {
    const amount = parseInt(step.split(' ')[1]);
    const from = parseInt(step.split(' ')[3]);
    const to = parseInt(step.split(' ')[5]);

    const cratesToMove = crates[from - 1].splice(crates[from - 1].length - amount);
    crates[to - 1].push(...cratesToMove);
  }

  const answer: string[] = [];

  crates.forEach((crateStack) => answer.push(crateStack.pop()));
  console.log(answer.join(''));
}

// part1();
part2();
