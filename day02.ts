import fs from 'fs';

const useTestInput = false;

const inputFile = fs.readFileSync('input/day02.txt');

const testInput: string = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

let reports: string[];
if (useTestInput) {
  reports = testInput.split('\n');
} else {
  reports = inputFile.toString().split('\n').slice(0, -1);
}

async function part1() {
  let safeReports = 0;
  for (const report of reports) {
    const levels = report.split(' ').map((level) => parseInt(level));
    let safeReport = true;
    let direction: 'inc' | 'dec';
    // If there is no direction, report is unsafe
    if (levels[0] === levels[1]) continue;
    if (levels[1] - levels[0] < 0) direction = 'dec';
    else direction = 'inc';

    for (let x = 1; x < levels.length; x++) {
      let levelChange: number;
      if (direction === 'inc') {
        levelChange = levels[x] - levels[x - 1];
      } else {
        levelChange = levels[x - 1] - levels[x];
      }
      // Level change should be between 1 and 3 to be safe
      if (levelChange < 1 || levelChange > 3) {
        safeReport = false;
        break;
      }
    }

    if (safeReport) safeReports++;
  }

  console.log(safeReports);
}

async function part2() {
  const logStream = fs.createWriteStream('logs/day02_part2.txt', { flags: 'a' });
  let safeReports = 0;
  for (const report of reports) {
    const levels = report.split(' ').map((level) => parseInt(level));
    // logStream.write(`Testing report: ${levels}\n`);
    let currentReportSafe = false;

    if (testIncreasingLevels(levels, false, logStream)) {
      safeReports++;
      currentReportSafe = true;
      continue;
    }

    if (testDecreasingLevels(levels, false, logStream)) {
      safeReports++;
      currentReportSafe = true;
      continue;
    }
    logStream.write(`${levels}\n`);
  }

  console.log(safeReports);
  logStream.end();
}

function testIncreasingLevels(levels: number[], lifelineUsed: boolean, logStream: fs.WriteStream): boolean {
  for (let x = 1; x < levels.length; x++) {
    const levelChange = levels[x] - levels[x - 1];
    if (levelChange < 1 || levelChange > 3) {
      if (!lifelineUsed) {
        const lifelineLevels = [...levels.slice(0, x - 1), ...levels.slice(x)];
        if (testIncreasingLevels(lifelineLevels, true, logStream)) {
          // logStream.write(`Report ${lifelineLevels} found to be safe when Problem Dampener removed ${levels[x - 1]} at index ${x - 1}\n`);
          return true;
        } else if (testIncreasingLevels(levels.slice(0, -1), true, logStream)) {
          // logStream.write(`Report ${levels.slice(0, -1)} found to be safe when Problem Dampener removed the last level\n`);
          return true;
        } else return false;
      } else return false;
    }
  }
  // logStream.write(`Report ${levels} found to be safe.\n`);
  return true;
}

function testDecreasingLevels(levels: number[], lifelineUsed: boolean, logStream: fs.WriteStream): boolean {
  for (let x = 1; x < levels.length; x++) {
    const levelChange = levels[x - 1] - levels[x];
    if (levelChange < 1 || levelChange > 3) {
      if (!lifelineUsed) {
        const lifelineLevels = [...levels.slice(0, x - 1), ...levels.slice(x)];
        if (testDecreasingLevels(lifelineLevels, true, logStream)) {
          // logStream.write(`Report ${lifelineLevels} found to be safe when Problem Dampener removed ${levels[x - 1]} at index ${x - 1}\n`);
          return true;
        } else if (testDecreasingLevels(levels.slice(0, -1), true, logStream)) {
          // logStream.write(`Report ${levels.slice(0, -1)} found to be safe when Problem Dampener removed the last level\n`);
          return true;
        } else return false;
      } else return false;
    }
  }
  // logStream.write(`Report ${levels} found to be safe.\n`);
  return true;
}

// part1();
part2();
