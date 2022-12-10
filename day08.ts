import * as fs from 'fs';

async function part1() {
  const input = fs.readFileSync('input/day8.txt');
  const rows = input.toString().split('\r\n');
  const treeMap: number[][] = [];

  // Build the tree map
  for (const row of rows) {
    const numArray: number[] = [];
    for (let i = 0; i < row.length; i++) {
      numArray.push(parseInt(row[i]));
    }
    treeMap.push(numArray);
  }

  let visibleTrees = 0;

  // Coordinate array is presumed to be square
  for (let y = 0; y < treeMap.length; y++) {
    for (let x = 0; x < treeMap.length; x++) {
      const currentTree = treeMap[y][x];
      // If the tree is at the outer ring of the tree map
      if (y === 0 || y === treeMap.length - 1 || x === 0 || x === treeMap.length - 1) {
        visibleTrees++;
      } else {
        // Check if the tree is visible or not
        let visible = true;
        // Check if visible from west
        for (let i = 0; i < x; i++) {
          if (treeMap[y][i] >= currentTree) {
            visible = false;
            break;
          }
        }
        if (visible) {
          visibleTrees++;
          continue;
        }
        visible = true;
        // Check if visible from east
        for (let i = treeMap.length - 1; i > x; i--) {
          if (treeMap[y][i] >= currentTree) {
            visible = false;
            break;
          }
        }
        if (visible) {
          visibleTrees++;
          continue;
        }
        visible = true;
        // Check if visible from north
        for (let i = 0; i < y; i++) {
          if (treeMap[i][x] >= currentTree) {
            visible = false;
            break;
          }
        }
        if (visible) {
          visibleTrees++;
          continue;
        }
        visible = true;
        // Check if visible from south
        for (let i = treeMap.length - 1; i > y; i--) {
          if (treeMap[i][x] >= currentTree) {
            visible = false;
            break;
          }
        }
        if (visible) visibleTrees++;
      }
    }
  }

  console.log(visibleTrees);
}

async function part2() {
  const input = fs.readFileSync('input/day8.txt');
  const rows = input.toString().split('\r\n');
  const treeMap: number[][] = [];

  // Build the tree map
  for (const row of rows) {
    const numArray: number[] = [];
    for (let i = 0; i < row.length; i++) {
      numArray.push(parseInt(row[i]));
    }
    treeMap.push(numArray);
  }

  let bestScenicScore = 0;

  // Coordinate array is presumed to be square
  for (let y = 1; y < treeMap.length - 1; y++) {
    for (let x = 1; x < treeMap.length - 1; x++) {
      const currentTree = treeMap[y][x];
      let currentScenicScore = 0;
      let scenicScoreArray: number[] = [];
      // Check visible trees from west
      let scenicCounter = 0;
      for (let i = x - 1; i >= 0; i--) {
        if (treeMap[y][i] >= currentTree) {
          scenicCounter++;
          break;
        }
        scenicCounter++;
      }
      scenicScoreArray.push(scenicCounter);
      scenicCounter = 0;
      // Check visible trees from east
      for (let i = x + 1; i < treeMap.length; i++) {
        if (treeMap[y][i] >= currentTree) {
          scenicCounter++;
          break;
        }
        scenicCounter++;
      }
      scenicScoreArray.push(scenicCounter);
      scenicCounter = 0;
      // Check visible trees from north
      for (let i = y - 1; i >= 0; i--) {
        if (treeMap[i][x] >= currentTree) {
          scenicCounter++;
          break;
        }
        scenicCounter++;
      }
      scenicScoreArray.push(scenicCounter);
      scenicCounter = 0;
      // Check visible trees from south
      for (let i = y + 1; i < treeMap.length; i++) {
        if (treeMap[i][x] >= currentTree) {
          scenicCounter++;
          break;
        }
        scenicCounter++;
      }
      scenicScoreArray.push(scenicCounter);
      // Calculate the scenic score
      currentScenicScore = scenicScoreArray.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
      if (currentScenicScore > bestScenicScore) bestScenicScore = currentScenicScore;
    }
  }

  console.log(bestScenicScore);
}

part1();
part2();
