import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day07.txt');

const testInput: string = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

let inputRows: string[];
if (useTestInput) {
  inputRows = testInput.split('\n');
} else {
  inputRows = inputFile.toString().split('\n');
}

type Equation = {
  testValue: number;
  numbers: number[];
};

function testEquation(equation: Equation): boolean {
  const sum = equation.numbers[0] + equation.numbers[1];
  const product = equation.numbers[0] * equation.numbers[1];

  if (equation.numbers.length === 2) {
    if (sum === equation.testValue || product === equation.testValue) return true;
    else return false;
  } else {
    const sumTree = testEquation({ testValue: equation.testValue, numbers: [sum, ...equation.numbers.slice(2)] });
    if (sumTree) return true;
    const multiplyTree = testEquation({ testValue: equation.testValue, numbers: [product, ...equation.numbers.slice(2)] });
    if (multiplyTree) return true;
  }
  return false;
}

function part1() {
  const equations: Equation[] = inputRows.map((row) => {
    return {
      testValue: parseInt(row.split(':')[0]),
      numbers: row
        .split(':')[1]
        .trim()
        .split(' ')
        .map((num) => parseInt(num))
    };
  });

  let total = 0;

  for (const equation of equations) {
    if (testEquation(equation)) total += equation.testValue;
  }
  console.log(total);
}

function testEquation2(equation: Equation): boolean {
  const sum = equation.numbers[0] + equation.numbers[1];
  const product = equation.numbers[0] * equation.numbers[1];
  const concat = parseInt(equation.numbers[0].toString() + equation.numbers[1].toString());

  if (equation.numbers.length === 2) {
    if (sum === equation.testValue || product === equation.testValue || concat === equation.testValue) return true;
    else return false;
  } else {
    const sumTree = testEquation2({ testValue: equation.testValue, numbers: [sum, ...equation.numbers.slice(2)] });
    if (sumTree) return true;
    const multiplyTree = testEquation2({ testValue: equation.testValue, numbers: [product, ...equation.numbers.slice(2)] });
    if (multiplyTree) return true;
    const concatTree = testEquation2({ testValue: equation.testValue, numbers: [concat, ...equation.numbers.slice(2)] });
    if (concatTree) return true;
  }
  return false;
}
function part2() {
  const equations: Equation[] = inputRows.map((row) => {
    return {
      testValue: parseInt(row.split(':')[0]),
      numbers: row
        .split(':')[1]
        .trim()
        .split(' ')
        .map((num) => parseInt(num))
    };
  });

  let total = 0;

  for (const equation of equations) {
    if (testEquation2(equation)) total += equation.testValue;
  }
  console.log(total);
}

// part1();
part2();
