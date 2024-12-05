import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day05.txt');

const testInput: string = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

let inputRows: string[];
let orderingRules: string[] = [];
let updates: string[] = [];
if (useTestInput) {
  inputRows = testInput.split('\n');
  orderingRules = inputRows.slice(0, 21);
  updates = inputRows.slice(22);
} else {
  inputRows = inputFile.toString().split('\n').slice(0, -1);
  orderingRules = inputRows.slice(0, 1176);
  updates = inputRows.slice(1177);
}

function testOrder(orders: string[], updates: string[]): boolean {
  for (const update of updates) {
    if (update === orders[0]) return true;
    if (update === orders[1]) return false;
  }
  throw new Error('Jotain meni vikaan');
}

async function part1() {
  let total = 0;

  for (const update of updates) {
    // Get the update page numbers to array
    const updateArray = update.split(',');
    let orderMatches = true;

    for (const orderingRule of orderingRules) {
      // Get the orders in array of two
      const orders = orderingRule.split('|');
      if (updateArray.includes(orders[0]) && updateArray.includes(orders[1])) {
        if (!testOrder(orders, updateArray)) {
          orderMatches = false;
          break;
        }
      }
    }
    if (orderMatches) total += parseInt(updateArray[Math.floor(updateArray.length / 2)]);
  }
  console.log(total);
}

function getSortedMiddlePage(orders: string[][], updates: string[]): number {
  let changesMade = false;
  do {
    changesMade = false;
    for (const order of orders) {
      if (updates.includes(order[0]) && updates.includes(order[1]) && !testOrder(order, updates)) {
        const firstOrderIndex = updates.findIndex((update) => order[0] === update);
        const secondOrderIndex = updates.findIndex((update) => order[1] === update);
        updates[firstOrderIndex] = order[1];
        updates[secondOrderIndex] = order[0];
        changesMade = true;
      }
    }
  } while (changesMade);
  return parseInt(updates[Math.floor(updates.length / 2)]);
}

async function part2() {
  let total = 0;
  const orderRuleArray = orderingRules.map((row) => row.split('|'));

  for (const update of updates) {
    // Get the update page numbers to array
    const updateArray = update.split(',');
    let orderMatches = true;

    for (const orderingRule of orderingRules) {
      // Get the orders in array of two
      const orders = orderingRule.split('|');
      if (updateArray.includes(orders[0]) && updateArray.includes(orders[1])) {
        if (!testOrder(orders, updateArray)) {
          orderMatches = false;
          break;
        }
      }
    }
    if (!orderMatches) total += getSortedMiddlePage(orderRuleArray, updateArray);
  }
  console.log(total);
}

// part1();
part2();
