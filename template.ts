import fs from 'fs';

const DAY = '01';

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');
}

part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
// part2(`day${DAY}.txt`);
