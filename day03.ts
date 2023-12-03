import fs from 'fs';

const DAY = '03';

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const partNumbers: number[] = [];

  for (let i = 0; i < rows.length; i++) {
    const rowsToCheck: string[] = [];
    rowsToCheck.push(rows[i]); // Current row
    if (i > 0) rowsToCheck.push(rows[i - 1]); // Previous row
    if (i < rows.length - 1) rowsToCheck.push(rows[i + 1]); // Next row

    let currentNumberIndexes: number[] = [];

    for (let j = 0; j < rows[i].length; j++) {
      if (!isNumber(rows[i][j])) {
        if (currentNumberIndexes.length) {
          if (checkForSymbols(rowsToCheck, [Math.min(...currentNumberIndexes), Math.max(...currentNumberIndexes)])) {
            partNumbers.push(parseInt(rows[i].substring(Math.min(...currentNumberIndexes), Math.max(...currentNumberIndexes) + 1)));
          }
          currentNumberIndexes = [];
        }
        continue;
      } else {
        currentNumberIndexes.push(j);
      }
    }
    if (currentNumberIndexes.length) {
      if (checkForSymbols(rowsToCheck, [Math.min(...currentNumberIndexes), Math.max(...currentNumberIndexes)])) {
        partNumbers.push(parseInt(rows[i].substring(Math.min(...currentNumberIndexes), Math.max(...currentNumberIndexes) + 1)));
      }
    }
  }

  console.log(partNumbers.reduce((acc, cur) => acc + cur, 0));
}

function isNumber(char: string): boolean {
  return !Number.isNaN(parseInt(char));
}

function isSymbol(char: string): boolean {
  return !isNumber(char) && char !== '.';
}

function checkForSymbols(rows: string[], indexRange: number[]): boolean {
  const currentRow = rows[0];
  const charsToCheck: string[] = [];
  const firstIndex = Math.max(indexRange[0] - 1, 0);
  const lastIndex = Math.min(indexRange[1] + 1, rows[0].length - 1);

  charsToCheck.push(currentRow[firstIndex]);
  charsToCheck.push(currentRow[lastIndex]);

  for (const row of rows.slice(1)) {
    charsToCheck.push(...row.substring(firstIndex, lastIndex + 1));
  }

  for (const char of charsToCheck) {
    if (isSymbol(char)) return true;
  }
  return false;
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
part2(`day${DAY}_example.txt`);
// part2(`day${DAY}.txt`);

// 554887 too big
