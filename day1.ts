import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day1_1.txt');
  const rows = input.toString().split('\r\n');

  let mostCalories = 0;
  let currentElfCalories = 0;

  for (const row of rows) {
    if (row) {
      currentElfCalories += parseInt(row);
    } else {
      if (currentElfCalories > mostCalories) mostCalories = currentElfCalories;
      currentElfCalories = 0;
    }
  }
  if (currentElfCalories > mostCalories) mostCalories = currentElfCalories;

  console.log(mostCalories);
}

async function part2() {
  const input = fs.readFileSync('input/day1_1.txt');
  const rows = input.toString().split('\r\n');

  const caloriesList: number[] = [];
  let currentElfCalories = 0;

  for (const row of rows) {
    if (row) {
      currentElfCalories += parseInt(row);
    } else {
      caloriesList.push(currentElfCalories);
      currentElfCalories = 0;
    }
  }
  caloriesList.push(currentElfCalories);
  caloriesList.sort((a, b) => {
    return a - b;
  });

  console.log(caloriesList[caloriesList.length - 1] + caloriesList[caloriesList.length - 2] + caloriesList[caloriesList.length - 3]);
  // console.log(caloriesList[caloriesList.length - 1]);
}

// part1();
part2();
