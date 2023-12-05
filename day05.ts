import fs from 'fs';

const DAY = '05';

interface MapObject {
  srcStart: number;
  srcEnd: number;
  destStart: number;
  length: number;
}

function getRows(rows: string[], indexRange: number[]): string[] {
  const returnRows: string[] = [];
  for (let i = indexRange[0]; i < indexRange[1]; i++) {
    returnRows.push(rows[i]);
  }
  return returnRows;
}

function buildMapObject(rows: string[]): MapObject[] {
  const mapObjects: MapObject[] = [];
  for (const row of rows) {
    mapObjects.push({
      srcStart: parseInt(row.split(' ')[1]),
      srcEnd: parseInt(row.split(' ')[1]) + parseInt(row.split(' ')[2]) - 1,
      destStart: parseInt(row.split(' ')[0]),
      length: parseInt(row.split(' ')[2])
    });
  }
  return mapObjects;
}

function getMappedItem(mapObjects: MapObject[], srcNumber: number): number {
  for (const mapObject of mapObjects) {
    if (srcNumber >= mapObject.srcStart && srcNumber <= mapObject.srcEnd) {
      return srcNumber - (mapObject.srcStart - mapObject.destStart);
    }
  }
  return srcNumber;
}

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const seeds = rows[0]
    .split(': ')[1]
    .split(' ')
    .map((num) => parseInt(num));

  const seed2soilIndexes: number[] = [];
  const soil2fertilizerIndexes: number[] = [];
  const fertilizer2waterIndexes: number[] = [];
  const water2lightIndexes: number[] = [];
  const light2temperatureIndexes: number[] = [];
  const temperature2humidityIndexes: number[] = [];
  const humidity2locationIndexes: number[] = [];

  seed2soilIndexes.push(rows.findIndex((row) => row === 'seed-to-soil map:') + 1);
  seed2soilIndexes.push(rows.findIndex((row) => row === 'soil-to-fertilizer map:') - 1);
  soil2fertilizerIndexes.push(rows.findIndex((row) => row === 'soil-to-fertilizer map:') + 1);
  soil2fertilizerIndexes.push(rows.findIndex((row) => row === 'fertilizer-to-water map:') - 1);
  fertilizer2waterIndexes.push(rows.findIndex((row) => row === 'fertilizer-to-water map:') + 1);
  fertilizer2waterIndexes.push(rows.findIndex((row) => row === 'water-to-light map:') - 1);
  water2lightIndexes.push(rows.findIndex((row) => row === 'water-to-light map:') + 1);
  water2lightIndexes.push(rows.findIndex((row) => row === 'light-to-temperature map:') - 1);
  light2temperatureIndexes.push(rows.findIndex((row) => row === 'light-to-temperature map:') + 1);
  light2temperatureIndexes.push(rows.findIndex((row) => row === 'temperature-to-humidity map:') - 1);
  temperature2humidityIndexes.push(rows.findIndex((row) => row === 'temperature-to-humidity map:') + 1);
  temperature2humidityIndexes.push(rows.findIndex((row) => row === 'humidity-to-location map:') - 1);
  humidity2locationIndexes.push(rows.findIndex((row) => row === 'humidity-to-location map:') + 1);
  humidity2locationIndexes.push(rows.length);

  const seed2soilRows = getRows(rows, seed2soilIndexes);
  const soil2fertilizerRows = getRows(rows, soil2fertilizerIndexes);
  const fertilizer2waterRows = getRows(rows, fertilizer2waterIndexes);
  const water2lightRows = getRows(rows, water2lightIndexes);
  const light2temperatureRows = getRows(rows, light2temperatureIndexes);
  const temperature2humidityRows = getRows(rows, temperature2humidityIndexes);
  const humidity2locationRows = getRows(rows, humidity2locationIndexes);

  const seed2soilMap = buildMapObject(seed2soilRows);
  const soil2fertilizerMap = buildMapObject(soil2fertilizerRows);
  const fertilizer2waterMap = buildMapObject(fertilizer2waterRows);
  const water2lightMap = buildMapObject(water2lightRows);
  const light2temperatureMap = buildMapObject(light2temperatureRows);
  const temperature2humidityMap = buildMapObject(temperature2humidityRows);
  const humidity2locationMap = buildMapObject(humidity2locationRows);

  let minimumLocation = Number.POSITIVE_INFINITY;

  for (const seed of seeds) {
    const soil = getMappedItem(seed2soilMap, seed);
    const fertilizer = getMappedItem(soil2fertilizerMap, soil);
    const water = getMappedItem(fertilizer2waterMap, fertilizer);
    const light = getMappedItem(water2lightMap, water);
    const temperature = getMappedItem(light2temperatureMap, light);
    const humidity = getMappedItem(temperature2humidityMap, temperature);
    const location = getMappedItem(humidity2locationMap, humidity);
    minimumLocation = Math.min(minimumLocation, location);
  }

  console.log(minimumLocation);
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const seeds = rows[0]
    .split(': ')[1]
    .split(' ')
    .map((num) => parseInt(num));

  const seed2soilIndexes: number[] = [];
  const soil2fertilizerIndexes: number[] = [];
  const fertilizer2waterIndexes: number[] = [];
  const water2lightIndexes: number[] = [];
  const light2temperatureIndexes: number[] = [];
  const temperature2humidityIndexes: number[] = [];
  const humidity2locationIndexes: number[] = [];

  seed2soilIndexes.push(rows.findIndex((row) => row === 'seed-to-soil map:') + 1);
  seed2soilIndexes.push(rows.findIndex((row) => row === 'soil-to-fertilizer map:') - 1);
  soil2fertilizerIndexes.push(rows.findIndex((row) => row === 'soil-to-fertilizer map:') + 1);
  soil2fertilizerIndexes.push(rows.findIndex((row) => row === 'fertilizer-to-water map:') - 1);
  fertilizer2waterIndexes.push(rows.findIndex((row) => row === 'fertilizer-to-water map:') + 1);
  fertilizer2waterIndexes.push(rows.findIndex((row) => row === 'water-to-light map:') - 1);
  water2lightIndexes.push(rows.findIndex((row) => row === 'water-to-light map:') + 1);
  water2lightIndexes.push(rows.findIndex((row) => row === 'light-to-temperature map:') - 1);
  light2temperatureIndexes.push(rows.findIndex((row) => row === 'light-to-temperature map:') + 1);
  light2temperatureIndexes.push(rows.findIndex((row) => row === 'temperature-to-humidity map:') - 1);
  temperature2humidityIndexes.push(rows.findIndex((row) => row === 'temperature-to-humidity map:') + 1);
  temperature2humidityIndexes.push(rows.findIndex((row) => row === 'humidity-to-location map:') - 1);
  humidity2locationIndexes.push(rows.findIndex((row) => row === 'humidity-to-location map:') + 1);
  humidity2locationIndexes.push(rows.length);

  const seed2soilRows = getRows(rows, seed2soilIndexes);
  const soil2fertilizerRows = getRows(rows, soil2fertilizerIndexes);
  const fertilizer2waterRows = getRows(rows, fertilizer2waterIndexes);
  const water2lightRows = getRows(rows, water2lightIndexes);
  const light2temperatureRows = getRows(rows, light2temperatureIndexes);
  const temperature2humidityRows = getRows(rows, temperature2humidityIndexes);
  const humidity2locationRows = getRows(rows, humidity2locationIndexes);

  const seed2soilMap = buildMapObject(seed2soilRows);
  const soil2fertilizerMap = buildMapObject(soil2fertilizerRows);
  const fertilizer2waterMap = buildMapObject(fertilizer2waterRows);
  const water2lightMap = buildMapObject(water2lightRows);
  const light2temperatureMap = buildMapObject(light2temperatureRows);
  const temperature2humidityMap = buildMapObject(temperature2humidityRows);
  const humidity2locationMap = buildMapObject(humidity2locationRows);

  let minimumLocation = Number.POSITIVE_INFINITY;

  for (let i = 0; i < seeds.length; i += 2) {
    for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
      const soil = getMappedItem(seed2soilMap, j);
      const fertilizer = getMappedItem(soil2fertilizerMap, soil);
      const water = getMappedItem(fertilizer2waterMap, fertilizer);
      const light = getMappedItem(water2lightMap, water);
      const temperature = getMappedItem(light2temperatureMap, light);
      const humidity = getMappedItem(temperature2humidityMap, temperature);
      const location = getMappedItem(humidity2locationMap, humidity);
      minimumLocation = Math.min(minimumLocation, location);
    }
  }

  console.log(minimumLocation);
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
part2(`day${DAY}_example.txt`);
// part2(`day${DAY}.txt`);
