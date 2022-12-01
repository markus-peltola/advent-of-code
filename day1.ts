import * as fs from 'fs';

async function main() {
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

  // Answer to part 1
  console.log(caloriesList[caloriesList.length - 1]);
  // Answer to part 2
  console.log(caloriesList[caloriesList.length - 1] + caloriesList[caloriesList.length - 2] + caloriesList[caloriesList.length - 3]);
}

// part1();
main();
