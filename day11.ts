import * as fs from 'fs';

class Monkey {
  items: number[];
  inspections: number;
  multiplier: string;
  divisibleBy: number;
  trueMonkey: number;
  falseMonkey: number;

  constructor(items: number[], multiplier: string, divisibleBy: number, trueMonkey: number, falseMonkey: number) {
    this.items = items;
    this.inspections = 0;
    this.multiplier = multiplier;
    this.divisibleBy = divisibleBy;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
  }

  inspect(mod = 3): { monkey: number; item: number } {
    this.inspections++;
    let currentItem = this.items.shift();
    let newItem: number;
    // Calculate the new worry level based on monkeys multiplier
    if (this.multiplier.startsWith('+')) {
      if (this.multiplier.endsWith('old')) {
        newItem = currentItem + currentItem;
      } else {
        newItem = currentItem + parseInt(this.multiplier.split(' ')[1]);
      }
    } else if (this.multiplier.startsWith('*')) {
      if (this.multiplier.endsWith('old')) {
        newItem = currentItem * currentItem;
      } else {
        newItem = currentItem * parseInt(this.multiplier.split(' ')[1]);
      }
    }
    // Lower worry levels
    newItem = newItem % mod;
    // Test who to throw the inspected item
    if (newItem % this.divisibleBy === 0) {
      return { monkey: this.trueMonkey, item: newItem };
    } else {
      return { monkey: this.falseMonkey, item: newItem };
    }
  }

  catchItem(item: number) {
    this.items.push(item);
  }
}

function main() {
  const input = fs.readFileSync('input/day11.txt');
  const inputRows = input.toString().split(/^\s*$/gm);

  let items: number[] = [];
  let multiplier: string;
  let divisibleBy: number;
  let trueMonkey: number;
  let falseMonkey: number;

  const NUMBER_OF_ROUNDS = 10000;

  const monkeys: Monkey[] = [];

  // Instantiate the monkeys
  for (const row of inputRows) {
    if (row.startsWith('Monkey')) {
      // Clear the temp variables for a new monkey
      items = [];
      multiplier = '';
      divisibleBy = 0;
      trueMonkey = 0;
      falseMonkey = 0;
    } else if (row.trim().startsWith('Starting items')) {
      items = Array.from(row.trim().split(': ')[1].split(', ')).map((item) => parseInt(item));
    } else if (row.trim().startsWith('Operation')) {
      const rowArray = row.trim().split(' ');
      multiplier = `${rowArray[rowArray.length - 2]} ${rowArray[rowArray.length - 1]}`;
    } else if (row.trim().startsWith('Test')) {
      divisibleBy = parseInt(row.trim().split(' ')[3]);
    } else if (row.trim().startsWith('If true')) {
      trueMonkey = parseInt(row.trim().split(' ').pop());
    } else if (row.trim().startsWith('If false')) {
      falseMonkey = parseInt(row.trim().split(' ').pop());
      // Create a new monkey
      monkeys.push(new Monkey(items, multiplier, divisibleBy, trueMonkey, falseMonkey));
    }
  }

  // Calculating mod for part2
  let mod = 1;
  for (const monkey of monkeys) {
    mod *= monkey.divisibleBy;
  }

  // Play X rounds of keep away
  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    for (const monkey of monkeys) {
      const itemAmount = monkey.items.length;
      for (let j = 0; j < itemAmount; j++) {
        // const throwTo = monkey.inspect(); // Part 1
        const throwTo = monkey.inspect(mod); // Part 2
        monkeys[throwTo.monkey].catchItem(throwTo.item);
      }
    }
  }

  // answer to part 1
  const inspectionScores = monkeys.map((monkey) => monkey.inspections).sort((a, b) => a - b);
  console.log(inspectionScores);
  console.log(inspectionScores[inspectionScores.length - 1] * inspectionScores[inspectionScores.length - 2]);
}

main();
