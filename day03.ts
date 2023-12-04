import fs from 'fs';

const DAY = '03';

interface LocationData {
  type: 'partNumber' | 'symbol';
  value: string | number;
  coordinates: {
    x: number;
    y: number;
  };
}

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

function calculateGearRatio(potenialGear: LocationData, parts: LocationData[]): number | undefined {
  // console.log(`Checking potenial gear with coords ${potenialGear.coordinates.y}, ${potenialGear.coordinates.x}`);
  const nearByParts: LocationData[] = [];
  const accetableXCoords = [potenialGear.coordinates.x, potenialGear.coordinates.x + 1, potenialGear.coordinates.x - 1];

  const partsToCheck = parts.filter((part) => {
    if (
      (part.coordinates.y === potenialGear.coordinates.y ||
        part.coordinates.y === potenialGear.coordinates.y - 1 ||
        part.coordinates.y === potenialGear.coordinates.y + 1) &&
      (part.coordinates.x === potenialGear.coordinates.x ||
        part.coordinates.x === potenialGear.coordinates.x + 1 ||
        part.coordinates.x === potenialGear.coordinates.x - 1 ||
        part.coordinates.x === potenialGear.coordinates.x - 2 ||
        part.coordinates.x === potenialGear.coordinates.x - 3)
    )
      return true;
  });

  for (const part of partsToCheck) {
    // Add all the coords that the part takes up on x axis
    const partXCoords = [part.coordinates.x];
    if (part.value.toString().length > 1) partXCoords.push(part.coordinates.x + 1);
    if (part.value.toString().length > 2) partXCoords.push(part.coordinates.x + 2);

    // Check if the part is in acceptable range of the potential gear
    for (const partXCoord of partXCoords) {
      if (accetableXCoords.includes(partXCoord)) {
        nearByParts.push(part);
        break;
      }
    }
  }

  if (nearByParts.length === 2) return nearByParts.reduce((acc, cur) => acc * (cur.value as number), 1);
  else return undefined;
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const locationData: LocationData[] = [];

  for (let y = 0; y < rows.length; y++) {
    let previousCharWasNumber = false;
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === '.') {
        previousCharWasNumber = false;
        continue;
      }
      if (!!rows[y][x].match(/\d+/) && !previousCharWasNumber) {
        previousCharWasNumber = true;
        locationData.push({
          type: 'partNumber',
          value: parseInt(rows[y].substring(x).match(/\d+/)![0]),
          coordinates: { x, y }
        });
      } else if (!rows[y][x].match(/\d+/)) {
        previousCharWasNumber = false;
        locationData.push({
          type: 'symbol',
          value: rows[y][x],
          coordinates: { x, y }
        });
      }
    }
  }

  const parts = locationData.filter((data) => data.type === 'partNumber');
  const potenialGears = locationData.filter((data) => data.value === '*');

  const gearRatios: number[] = [];

  for (const potenialGear of potenialGears) {
    const gearRatio = calculateGearRatio(potenialGear, parts);
    if (gearRatio) {
      gearRatios.push(gearRatio);
    }
  }

  console.log(gearRatios.reduce((acc, cur) => acc + cur, 0));
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
part2(`day${DAY}.txt`);
