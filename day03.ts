import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day03.txt');

const testInput: string = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

let inputText: string;
if (useTestInput) {
  inputText = testInput;
} else {
  inputText = inputFile.toString();
}

async function part1() {
  const regExp = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);
  const mulFunctions = inputText.match(regExp);
  if (!mulFunctions?.length) return;

  let total = 0;
  for (const mulFunc of mulFunctions) {
    const numbers = mulFunc.match(/\d{1,3},\d{1,3}/)![0];
    const firstNum = parseInt(numbers.split(',')[0]);
    const secondNum = parseInt(numbers.split(',')[1]);
    total += firstNum * secondNum;
  }
  console.log(total);
}

async function part2() {
  const regExp_func = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);
  const regExp_enable = new RegExp(/do\(\)/g);
  const regExp_disable = new RegExp(/don\'t\(\)/g);

  const funcIndexes: { func: string; index: number }[] = [];
  const enableIndexes: number[] = [];
  const disableIndexes: number[] = [];

  while (true) {
    const foundFunc = regExp_func.exec(inputText);
    if (!foundFunc || !regExp_func.lastIndex) break;
    funcIndexes.push({ func: foundFunc.toString(), index: foundFunc?.index });
  }

  while (true) {
    const foundEnable = regExp_enable.exec(inputText);
    if (foundEnable) enableIndexes.push(foundEnable?.index);
    if (!regExp_enable.lastIndex) break;
  }

  while (true) {
    const foundDisable = regExp_disable.exec(inputText);
    if (foundDisable) disableIndexes.push(foundDisable?.index);
    if (!regExp_disable.lastIndex) break;
  }

  let total = 0;
  let enabled = true;

  for (let i = 0; i < inputText.length; i++) {
    if (enableIndexes.includes(i)) enabled = true;
    if (disableIndexes.includes(i)) enabled = false;

    if (funcIndexes.some((item) => item.index === i) && enabled) {
      const numbers = funcIndexes.find((item) => item.index === i)?.func.match(/\d{1,3},\d{1,3}/)![0];
      const firstNum = parseInt(numbers!.split(',')[0]);
      const secondNum = parseInt(numbers!.split(',')[1]);
      total += firstNum * secondNum;
    }
  }

  console.log(total);
}

// part1();
part2();
