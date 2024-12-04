import fs from "fs";

const useTestInput = true;

const inputFile = fs.readFileSync("input/day05.txt");

const testInput: string = ``;

let inputRows: string[];
if (useTestInput) {
  inputRows = testInput.split("\n");
} else {
  inputRows = inputFile.toString().split("\n").slice(0, -1);
}

async function part1() {}

async function part2() {}

part1();
// part2();
