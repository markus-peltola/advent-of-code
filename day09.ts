import fs from 'fs';

const useTestInput = true;

const inputFile = fs.readFileSync('input/day09.txt');

const testInput: string = `2333133121414131402`;

let diskMap: number[];
if (useTestInput) {
  diskMap = testInput.split('').map((x) => parseInt(x));
} else {
  diskMap = inputFile
    .toString()
    .split('')
    .map((x) => parseInt(x));
}

async function part1() {
  const rawFileData: { id: number; length: number }[] = [];
  let currentId = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 !== 0) continue;
    rawFileData.push({ id: currentId, length: diskMap[i] });
    currentId++;
  }

  const fileData = rawFileData.filter((file) => file.length);

  let checkSum = 0;

  let endFile = fileData.pop();
  let startFile = fileData.shift();
  let blockIndex = 0;
  let lastItemInUse = false;

  for (let i = 0; i < diskMap.length; i++) {
    // Handle empty spaces calculation
    if (i % 2 !== 0) {
      for (let j = 0; j < diskMap[i]; j++) {
        // Get new file from the end, when previous file is moved
        if (!endFile?.length) endFile = fileData.pop();
        // If there is no more files left, mark it and end this loop
        if (!endFile) {
          lastItemInUse = true;
          break;
        }
        checkSum += blockIndex * endFile.id;
        endFile.length--;
        blockIndex++;
      }
    } else {
      for (let j = 0; j < diskMap[i]; j++) {
        // Get new file from the start, when previous file is handled
        if (!startFile?.length) startFile = fileData.shift();
        // If there is no more files left, mark it and end this loop
        if (!startFile) {
          lastItemInUse = true;
          break;
        }
        checkSum += blockIndex * startFile.id;
        startFile.length--;
        blockIndex++;
      }
    }
    // Handle the last item until it's depleted
    if (lastItemInUse) {
      const lastItem = startFile || endFile;
      if (!lastItem) break;
      console.log(`Last item in use with id: ${lastItem?.id} and length: ${lastItem?.length}`);
      for (let j = 0; j < lastItem.length; j++) {
        checkSum += blockIndex * lastItem.id;
        blockIndex++;
      }
      break;
    }
  }

  console.log(checkSum);
}

// `2333133121414131402`

async function part2() {
  const rawFileData: { id: number; length: number; moved: boolean }[] = [];
  let currentId = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 !== 0) continue;
    rawFileData.push({ id: currentId, length: diskMap[i], moved: false });
    currentId++;
  }

  const fileData = rawFileData.filter((file) => file.length).reverse();

  let checkSum = 0;

  currentId = 0;
  let blockIndex = 0;
  let lastItemInUse = false;

  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 !== 0) {
      currentId++;
      let spaceLeft = diskMap[i];
      while (spaceLeft) {
        const movedItem = fileData.find((file) => file.length <= spaceLeft && !file.moved);
        if (movedItem) {
          movedItem.moved = true;
          for (let j = 0; j < movedItem.length; j++) {
            checkSum += blockIndex * movedItem.id;
            blockIndex++;
          }
          spaceLeft -= movedItem.length;
        } else break;
      }
    } else {
      const currentItem = fileData.find((file) => file.id === currentId);
      if (!currentItem) throw new Error('Something wen terribly wrong!');
      if (!currentItem.moved) {
        for (let j = 0; j < diskMap[i]; j++) {
          checkSum += blockIndex * currentId;
          blockIndex++;
        }
      }
    }
  }
  console.log(checkSum);
}

// part1();
part2();
