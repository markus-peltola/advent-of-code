import fs from 'fs';

const DAY = '06';

function calculateDistance(buttonHold: number, totalTime: number): number {
  const travelTime = totalTime - buttonHold;
  const speed = buttonHold;
  return speed * travelTime;
}

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const times = rows[0].split(/\s+/).slice(1);
  const distances = rows[1].split(/\s+/).slice(1);
  const records: { time: number; distance: number }[] = [];

  for (let i = 0; i < times.length; i++) {
    records.push({ time: parseInt(times[i]), distance: parseInt(distances[i]) });
  }

  let winningWays = 1;

  for (const record of records) {
    let counter = 0;
    const midPoint = Math.floor(record.time / 2);
    const midPointDistance = calculateDistance(midPoint, record.time);

    // If mid point's distance is better than the record, start finding more strategies from there
    if (midPointDistance > record.distance) {
      counter++;
      let betterStrategy1 = true;
      let betterStrategy2 = true;
      let buttonHoldTime1 = midPoint;
      let buttonHoldTime2 = midPoint;
      while (betterStrategy1 || betterStrategy2) {
        buttonHoldTime1++;
        if (betterStrategy1 && calculateDistance(buttonHoldTime1, record.time) > record.distance) {
          betterStrategy1 = true;
          counter++;
        } else {
          betterStrategy1 = false;
        }

        buttonHoldTime2--;
        if (betterStrategy2 && calculateDistance(buttonHoldTime2, record.time) > record.distance) {
          betterStrategy2 = true;
          counter++;
        } else {
          betterStrategy2 = false;
        }
      }
    }

    winningWays *= counter;
  }

  console.log(winningWays);
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const time = parseInt(rows[0].replace(/\s+/g, '').split(':')[1]);
  const distance = parseInt(rows[1].replace(/\s+/g, '').split(':')[1]);

  let winningWays = 0;
  const midPoint = Math.floor(time / 2);
  const midPointDistance = calculateDistance(midPoint, time);

  // If mid point's distance is better than the record, start finding more strategies from there
  if (midPointDistance > distance) {
    winningWays++;
    let betterStrategy1 = true;
    let betterStrategy2 = true;
    let buttonHoldTime1 = midPoint;
    let buttonHoldTime2 = midPoint;

    while (betterStrategy1 || betterStrategy2) {
      buttonHoldTime1++;
      if (betterStrategy1 && calculateDistance(buttonHoldTime1, time) > distance) {
        betterStrategy1 = true;
        winningWays++;
      } else {
        betterStrategy1 = false;
      }

      buttonHoldTime2--;
      if (betterStrategy2 && calculateDistance(buttonHoldTime2, time) > distance) {
        betterStrategy2 = true;
        winningWays++;
      } else {
        betterStrategy2 = false;
      }
    }
  }

  console.log(winningWays);
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
part2(`day${DAY}.txt`);
