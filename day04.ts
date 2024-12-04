import fs from "fs";

const useTestInput = false;

const inputFile = fs.readFileSync("input/day04.txt");

const testInput: string = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

let inputRows: string[];
let inputText: string[][];
if (useTestInput) {
  inputRows = testInput.split("\n");
  inputText = inputRows.map((row) => row.split(""));
} else {
  inputRows = inputFile.toString().split("\n").slice(0, -1);
  inputText = inputRows.map((row) => row.split(""));
}

let count = 0;
const width = inputText[0].length;
const height = inputText.length;

function testNW(y: number, x: number) {
  if (inputText[y - 1][x - 1] !== "M") return;
  if (inputText[y - 2][x - 2] !== "A") return;
  if (inputText[y - 3][x - 3] !== "S") return;
  count++;
}
function testN(y: number, x: number) {
  if (inputText[y - 1][x] !== "M") return;
  if (inputText[y - 2][x] !== "A") return;
  if (inputText[y - 3][x] !== "S") return;
  count++;
}
function testNE(y: number, x: number) {
  if (inputText[y - 1][x + 1] !== "M") return;
  if (inputText[y - 2][x + 2] !== "A") return;
  if (inputText[y - 3][x + 3] !== "S") return;
  count++;
}
function testE(y: number, x: number) {
  if (inputText[y][x + 1] !== "M") return;
  if (inputText[y][x + 2] !== "A") return;
  if (inputText[y][x + 3] !== "S") return;
  count++;
}
function testW(y: number, x: number) {
  if (inputText[y][x - 1] !== "M") return;
  if (inputText[y][x - 2] !== "A") return;
  if (inputText[y][x - 3] !== "S") return;
  count++;
}
function testSW(y: number, x: number) {
  if (inputText[y + 1][x - 1] !== "M") return;
  if (inputText[y + 2][x - 2] !== "A") return;
  if (inputText[y + 3][x - 3] !== "S") return;
  count++;
}
function testS(y: number, x: number) {
  if (inputText[y + 1][x] !== "M") return;
  if (inputText[y + 2][x] !== "A") return;
  if (inputText[y + 3][x] !== "S") return;
  count++;
}
function testSE(y: number, x: number) {
  if (inputText[y + 1][x + 1] !== "M") return;
  if (inputText[y + 2][x + 2] !== "A") return;
  if (inputText[y + 3][x + 3] !== "S") return;
  count++;
}

function testXmas(y: number, x: number) {
  if (y > 2) {
    if (x > 2) testNW(y, x);
    testN(y, x);
    if (x < width - 3) testNE(y, x);
  }
  if (x < width - 3) testE(y, x);
  if (x > 2) testW(y, x);
  if (y < height - 3) {
    if (x > 2) testSW(y, x);
    testS(y, x);
    if (x < width - 3) testSE(y, x);
  }
}

async function part1() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (inputText[y][x] === "X") testXmas(y, x);
    }
  }
  console.log(count);
}

function testX_mas(y: number, x: number) {
  if (
    (inputText[y - 1][x - 1] === "M" && inputText[y + 1][x + 1] === "S") ||
    (inputText[y - 1][x - 1] === "S" && inputText[y + 1][x + 1] === "M")
  ) {
    if (
      (inputText[y - 1][x + 1] === "M" && inputText[y + 1][x - 1] === "S") ||
      (inputText[y - 1][x + 1] === "S" && inputText[y + 1][x - 1] === "M")
    ) {
      count++;
    }
  }
}

async function part2() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (
        inputText[y][x] === "A" &&
        x !== 0 &&
        y !== 0 &&
        x < width - 1 &&
        y < height - 1
      )
        testX_mas(y, x);
    }
  }
  console.log(count);
}

// part1();
part2();
