import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day01.txt');

const testInput: string = `3   4
4   3
2   5
1   3
3   9
3   3`

let inputRows: string[];
if (useTestInput) {
  inputRows = testInput.split('\n');
} else {
  inputRows = inputFile.toString().split('\n').slice(0, -1);
}

async function part1() {
  const list1 = inputRows.map(row => parseInt(row.split(/\s+/)[0])).sort((a, b) => a - b);
  const list2 = inputRows.map(row => parseInt(row.split(/\s+/)[1])).sort((a, b) => a - b);

  let counter = 0;

  for (let x = 0; x < list1.length; x++) {
    counter += Math.abs(list1[x] - list2[x]);
  }

  console.log(counter);
}

async function part2() {
  const list1 = inputRows.map(row => parseInt(row.split(/\s+/)[0]));
  const list2 = inputRows.map(row => parseInt(row.split(/\s+/)[1]));

  let similarityScore = 0;

  for (const list1number of list1) {
    let hits = 0;
    for (const list2number of list2) {
      if (list1number === list2number) hits++;
    }
    if (hits) similarityScore += list1number * hits;
  }

  console.log(similarityScore);
}

// part1();
part2();
