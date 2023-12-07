import fs from 'fs';

const DAY = '07';

interface Hand {
  cards: string[];
  bid: number;
  type: number;
}

const cardValues_part1 = new Map([
  ['A', 12],
  ['K', 11],
  ['Q', 10],
  ['J', 9],
  ['T', 8],
  ['9', 7],
  ['8', 6],
  ['7', 5],
  ['6', 4],
  ['5', 3],
  ['4', 2],
  ['3', 1],
  ['2', 0]
]);

function getCardAmounts_part1(cards: string[]): number[] {
  const setCards = new Set(cards);
  const returnArray: number[] = [];

  for (const setCard of setCards) {
    returnArray.push(cards.filter((handCard) => handCard === setCard).length);
  }

  return returnArray;
}

function getHandType_part1(cards: string[]): number {
  const cardAmounts = getCardAmounts_part1(cards);

  // If Five of a kind
  if (cardAmounts.length === 1) return 7;
  // If Four of a kind
  if (cardAmounts.includes(4)) return 6;
  // If Full house
  if (cardAmounts.includes(3)) {
    if (cardAmounts.includes(2)) return 5;
    // If Three of a kind
    else return 4;
  }
  // If Two pairs
  if (cardAmounts.filter((num) => num === 2).length === 2) return 3;
  if (cardAmounts.includes(2)) return 2;
  return 1;
}

function handSort_part1(a: Hand, b: Hand): number {
  // Compare hand types first
  if (a.type > b.type) return 1;
  if (a.type < b.type) return -1;

  // If same hand types, compare cards one by one
  for (let i = 0; i < a.cards.length; i++) {
    if (cardValues_part1.get(a.cards[i])! > cardValues_part1.get(b.cards[i])!) return 1;
    if (cardValues_part1.get(a.cards[i])! < cardValues_part1.get(b.cards[i])!) return -1;
  }

  return 0;
}

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const hands: Hand[] = [];

  for (const row of rows) {
    hands.push({
      cards: row.split(' ')[0].split(''),
      bid: parseInt(row.split(' ')[1]),
      type: getHandType_part1(row.split(' ')[0].split(''))
    });
  }

  hands.sort(handSort_part1);

  let points = 0;
  hands.forEach((hand, i) => {
    points += hand.bid * (i + 1);
  });
  console.log(points);
}

const cardValues_part2 = new Map([
  ['A', 12],
  ['K', 11],
  ['Q', 10],
  ['T', 9],
  ['9', 8],
  ['8', 7],
  ['7', 6],
  ['6', 5],
  ['5', 4],
  ['4', 3],
  ['3', 2],
  ['2', 1],
  ['J', 0]
]);

function getCardAmounts_part2(cards: string[]): [number[], number] {
  const setCards = new Set(cards);
  let jokers = 0;
  const returnArray: number[] = [];

  for (const setCard of setCards) {
    if (setCard === 'J') {
      jokers = cards.filter((handCard) => handCard === 'J').length;
    } else {
      returnArray.push(cards.filter((handCard) => handCard === setCard).length);
    }
  }

  return [returnArray, jokers];
}

function getHandType_part2(cards: string[]): number {
  const [cardAmounts, jokers] = getCardAmounts_part2(cards);

  // Different combinations without jokers
  const fourOfAKind = cardAmounts.includes(4);
  const threeOfAKind = cardAmounts.includes(3);
  const twoPairs = cardAmounts.filter((num) => num === 2).length === 2;
  const pair = cardAmounts.includes(2);

  // If Five of a kind
  if (cardAmounts.length === 1 || jokers === 5) return 7;
  // If Four of a kind
  if (fourOfAKind || (threeOfAKind && jokers) || (pair && jokers === 2) || jokers === 3) return 6;
  // If Full house
  if (threeOfAKind) {
    if (pair || jokers) return 5;
    // Else Three of a kind
    return 4;
  }
  if (twoPairs && jokers) return 5;
  // If Three of a kind
  if (pair && jokers) return 4;
  if (jokers === 2) return 4;
  // If Two pairs
  if (twoPairs) return 3;
  if (pair && jokers) return 3;
  // If Pair
  if (pair || jokers) return 2;
  return 1;
}

function handSort_part2(a: Hand, b: Hand): number {
  // Compare hand types first
  if (a.type > b.type) return 1;
  if (a.type < b.type) return -1;

  // If same hand types, compare cards one by one
  for (let i = 0; i < a.cards.length; i++) {
    if (cardValues_part2.get(a.cards[i])! > cardValues_part2.get(b.cards[i])!) return 1;
    if (cardValues_part2.get(a.cards[i])! < cardValues_part2.get(b.cards[i])!) return -1;
  }

  return 0;
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const hands: Hand[] = [];

  for (const row of rows) {
    hands.push({
      cards: row.split(' ')[0].split(''),
      bid: parseInt(row.split(' ')[1]),
      type: getHandType_part2(row.split(' ')[0].split(''))
    });
  }

  hands.sort(handSort_part2);

  let points = 0;
  hands.forEach((hand, i) => {
    points += hand.bid * (i + 1);
  });
  console.log(points);
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
part2(`day${DAY}.txt`);
