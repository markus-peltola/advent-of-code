import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day3.txt');
  const rows = input.toString().split('\r\n');

  let totalPriority = 0;

  for (const row of rows) {
    const firstHalf = row.substring(0, row.length / 2);
    const secondHalf = row.substring(row.length / 2);

    for (let i = 0; i < firstHalf.length; i++) {
      if (secondHalf.includes(firstHalf[i])) {
        const charAsciiVal: number = firstHalf[i].charCodeAt(0);
        if (charAsciiVal > 64 && charAsciiVal < 91) totalPriority += charAsciiVal - 38;
        else if (charAsciiVal > 96 && charAsciiVal < 123) totalPriority += charAsciiVal - 96;
        break;
      }
    }
  }

  // Answer to part 1
  console.log(totalPriority);
}

async function part2() {
  const input = fs.readFileSync('input/day3.txt');
  const rows = input.toString().split('\r\n');

  let totalPriority = 0;
  const groups: string[][] = [];

  // Divide elves into groups
  for (let i = 0; i < rows.length; i += 3) {
    groups.push([rows[i], rows[i + 1], rows[i + 2]]);
  }

  for (const group of groups) {
    const itemTypes: string[] = [];
    for (const elf of group) {
      for (let i = 0; i < elf.length; i++) {
        if (!itemTypes.includes(elf[i])) itemTypes.push(elf[i]);
      }
    }
    for (const item of itemTypes) {
      if (group[0].includes(item) && group[1].includes(item) && group[2].includes(item)) {
        const charAsciiVal: number = item.charCodeAt(0);
        if (charAsciiVal > 64 && charAsciiVal < 91) totalPriority += charAsciiVal - 38;
        else if (charAsciiVal > 96 && charAsciiVal < 123) totalPriority += charAsciiVal - 96;
        break;
      }
    }
  }

  // Answer to part 2
  console.log(totalPriority);
}

// part1();
part2();
