import * as fs from 'fs';

interface fileItem {
  path: string;
  size: number;
}

interface dirItem extends fileItem {}

async function main() {
  const input = fs.readFileSync('input/day7.txt');
  const rows = input.toString().split('\r\n');

  let currentPath = '';
  const fileList: fileItem[] = [];
  const directories: string[] = ['//'];

  for (const row of rows) {
    const lineItems = row.split(' ');
    // If it's user command
    if (lineItems[0] === '$') {
      const cmd = lineItems[1];
      if (cmd === 'cd') {
        // Change current path
        const movePath = lineItems[2];
        if (movePath === '..') {
          // Change current path up
          currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        } else if (lineItems[2][0] === '/') {
          // Change to specified directory
          currentPath = lineItems[2];
        } else if (lineItems[2][0] !== '/') {
          currentPath += `/${lineItems[2]}`;
        }
      }
    } else {
      // Scrape row's directory or file
      if (lineItems[0] === 'dir') {
        if (!directories.includes(`${currentPath}/${lineItems[1]}`)) {
          directories.push(`${currentPath}/${lineItems[1]}`);
        }
      } else {
        fileList.push({ path: `${currentPath}/${lineItems[1]}`, size: parseInt(lineItems[0]) });
      }
    }
  }

  // Sum the size of each directory
  const dirList: dirItem[] = [];
  for (const dir of directories) {
    let dirSize = fileList
      .filter((file) => file.path.includes(dir))
      .map((file) => file.size)
      .reduce((acc, curVal) => acc + curVal, 0);
    dirList.push({ path: dir, size: dirSize || 0 });
  }

  // Answer to part 1
  console.log(
    dirList
      .filter((dir) => dir.size <= 100000)
      .map((dir) => dir.size)
      .reduce((acc, curVal) => acc + curVal, 0)
  );

  const totalDiskSpace = 70000000;
  const diskSpaceTaken = dirList[0].size;
  const updateSize = 30000000;
  const neededSpace = diskSpaceTaken - (totalDiskSpace - updateSize);

  // Answer to part 2
  console.log(
    dirList
      .filter((dir) => dir.size > neededSpace)
      .map((dir) => dir.size)
      .sort(compareNumbers)[0]
  );
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

main();
