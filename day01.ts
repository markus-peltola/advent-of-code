import fs from 'fs';

const digitStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

async function part1() {
  const input = fs.readFileSync('input/day01.txt');
  const rows = input.toString().split('\r\n');

  const digits: number[] = [];

  rows.forEach((row) => {
    const isDigit = new RegExp(/\d/);
    let firstDigit = '';
    let lastDigit = '';
    for (let i = 0; i < row.length; i++) {
      if (isDigit.test(row[i])) {
        if (!firstDigit) firstDigit = row[i];
        lastDigit = row[i];
      }
    }
    digits.push(parseInt(firstDigit + lastDigit));
  });

  console.log(digits.reduce((acc, cur) => acc + cur, 0));
}

async function part2() {
  const input = fs.readFileSync('input/day01.txt');
  const rows = input.toString().split('\r\n');

  const digits: number[] = [];

  rows.forEach((row) => {
    const isDigit = new RegExp(/\d/);
    const digitIndexMap = new Map<number, string>();
    const indexes: number[] = [];

    for (let i = 0; i < row.length; i++) {
      if (isDigit.test(row[i])) {
        digitIndexMap.set(i, row[i]);
        indexes.push(i);
      } else {
        for (const digitString of digitStrings) {
          if (row.startsWith(digitString, i)) {
            digitIndexMap.set(i, getDigit(digitString));
            indexes.push(i);
          }
        }
      }
    }

    const minIndex = Math.min(...indexes);
    const maxIndex = Math.max(...indexes);

    const digit = parseInt(digitIndexMap.get(minIndex)! + digitIndexMap.get(maxIndex)!);
    digits.push(digit);
  });

  console.log(digits.reduce((acc, cur) => acc + cur, 0));
}

function getDigit(digitString: string): string {
  let digit: string;
  switch (digitString) {
    case 'one':
      digit = '1';
      break;
    case 'two':
      digit = '2';
      break;
    case 'three':
      digit = '3';
      break;
    case 'four':
      digit = '4';
      break;
    case 'five':
      digit = '5';
      break;
    case 'six':
      digit = '6';
      break;
    case 'seven':
      digit = '7';
      break;
    case 'eight':
      digit = '8';
      break;
    case 'nine':
      digit = '9';
      break;
    default:
      digit = '';
      break;
  }
  return digit;
}

// part1();
part2();
