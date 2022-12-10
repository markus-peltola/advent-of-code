import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day6.txt', { encoding: 'utf8' });

  const lastFour: string[] = [];

  // Add the first four characters to the array
  for (let i = 0; i < 4; i++) {
    lastFour.push(input[i]);
  }

  // Start checking when the all last four chars are different
  for (let i = 4; i < input.length; i++) {
    if (dontHaveDuplicates(lastFour)) {
      // Answer to part 1
      console.log(i);
      break;
    }
    lastFour.push(input[i]);
    lastFour.shift();
  }
}

async function part2() {
  const input = fs.readFileSync('input/day6.txt', { encoding: 'utf8' });
  const lastFourteen: string[] = [];

  // Add the first four characters to the array
  for (let i = 0; i < 14; i++) {
    lastFourteen.push(input[i]);
  }

  // Start checking when the all last four chars are different
  for (let i = 14; i < input.length; i++) {
    if (dontHaveDuplicates(lastFourteen)) {
      // Answer to part 1
      console.log(i);
      break;
    }
    lastFourteen.push(input[i]);
    lastFourteen.shift();
  }
}

function dontHaveDuplicates(array: string[]) {
  return new Set(array).size === array.length;
}

// part1();
part2();
