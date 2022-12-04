import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day4.txt');
  const rows = input.toString().split('\r\n');

  let pairs = 0;

  for (const row of rows) {
    const elf1 = row.split(',')[0].split('-');
    const elf2 = row.split(',')[1].split('-');

    if (parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[1])) pairs++;
    else if (parseInt(elf2[0]) <= parseInt(elf1[0]) && parseInt(elf2[1]) >= parseInt(elf1[1])) pairs++;
  }

  // Answer to part 1
  console.log(pairs);
}

async function part2() {
  const input = fs.readFileSync('input/day4.txt');
  const rows = input.toString().split('\r\n');

  let pairs = 0;

  for (const row of rows) {
    const elf1 = row.split(',')[0].split('-');
    const elf2 = row.split(',')[1].split('-');
    const elf1_1 = parseInt(elf1[0]);
    const elf1_2 = parseInt(elf1[1]);
    const elf2_1 = parseInt(elf2[0]);
    const elf2_2 = parseInt(elf2[1]);

    if ((elf1_1 >= elf2_1 && elf1_1 <= elf2_2) || (elf1_2 >= elf2_1 && elf1_2 <= elf2_2)) pairs++;
    else if ((elf2_1 >= elf1_1 && elf2_1 <= elf1_2) || (elf2_2 >= elf1_1 && elf2_2 <= elf1_2)) pairs++;
  }

  // Answer to part 2
  console.log(pairs);
}

// part1();
part2();
