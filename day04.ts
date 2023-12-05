import fs from 'fs';

const DAY = '04';

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const points: number[] = [];

  for (const card of rows) {
    let cardMatches = 0;
    const winningNumbers = card
      .split(': ')[1]
      .split(' | ')[0]
      .split(' ')
      .filter((num) => num !== '')
      .map((num) => parseInt(num));
    const myNumbers = card
      .split(': ')[1]
      .split(' | ')[1]
      .split(' ')
      .filter((num) => num !== '')
      .map((num) => parseInt(num));

    for (const myNumber of myNumbers) {
      if (winningNumbers.includes(myNumber)) cardMatches++;
    }

    if (cardMatches) {
      points.push(Math.pow(2, cardMatches - 1));
    }
  }
  console.log(points.reduce((a, b) => a + b, 0));
}

interface ScratchCard {
  cardNumber: number;
  winningNumbers: number[];
  myNumbers: number[];
  cardCopies: number;
}

function scratchACard(cards: ScratchCard[], cardNumber: number) {
  let wins = 0;
  const currentCard = cards.find((card) => card.cardNumber === cardNumber);
  try {
    currentCard!.cardCopies++;
  } catch {
    console.error(`Could not add copies to card number ${currentCard?.cardNumber}`);
  }
  for (const myNumber of currentCard!.myNumbers) {
    if (currentCard!.winningNumbers.includes(myNumber)) wins++;
  }
  for (let i = 0; i < wins; i++) {
    scratchACard(cards, cardNumber + i + 1);
  }
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const cards: ScratchCard[] = [];

  // Gather all cards to an array
  for (const card of rows) {
    const winningNumbers = card
      .split(': ')[1]
      .split(' | ')[0]
      .split(' ')
      .filter((num) => num !== '')
      .map((num) => parseInt(num));
    const myNumbers = card
      .split(': ')[1]
      .split(' | ')[1]
      .split(' ')
      .filter((num) => num !== '')
      .map((num) => parseInt(num));
    const cardName = card.split(': ')[0];
    cards.push({
      cardNumber: parseInt(cardName.match(/\d+/)![0]),
      winningNumbers,
      myNumbers,
      cardCopies: 0
    });
  }

  for (let i = 0; i < cards.length; i++) {
    scratchACard(cards, i + 1);
  }

  // fs.writeFileSync(`output/scratchCards.json`, JSON.stringify(cards, null, 2));

  console.log(cards.map((card) => card.cardCopies).reduce((acc, cur) => acc + cur, 0));
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
part2(`day${DAY}.txt`);
