import fs from 'fs';

const DAY = '08';

interface MapNode {
  nodeName: string;
  nodeLeft: string;
  nodeRight: string;
}

interface Instructions {
  array: string[];
  index: number;
}

let steps = 0;

function findNextNode(mapNodes: MapNode[], currentNode: MapNode, instruction: string): MapNode {
  let newNodeName: string;
  if (instruction === 'L') newNodeName = currentNode.nodeLeft;
  else if (instruction === 'R') newNodeName = currentNode.nodeRight;
  else throw new Error(`Instruction "${instruction}" not supported!`);

  return mapNodes.find((node) => node.nodeName === newNodeName)!;
}

function findNextNodes(mapNodes: MapNode[], currentNodes: MapNode[], instructions: Instructions) {
  steps++;
  // Get the correct instruction
  if (instructions.index >= instructions.array.length) instructions.index = 0;
  const instruction = instructions.array[instructions.index];
  instructions.index++;

  const newNodeNames: string[] = [];
  const newNodes: MapNode[] = [];

  for (const currentNode of currentNodes) {
    if (instruction === 'L') newNodeNames.push(currentNode.nodeLeft);
    else if (instruction === 'R') newNodeNames.push(currentNode.nodeRight);
    else throw new Error(`Instruction "${instruction}" not supported!`);
  }

  for (const newNodeName of newNodeNames) {
    newNodes.push(...mapNodes.filter((node) => node.nodeName === newNodeName));
  }

  let areAllNodeEnds = true;

  for (const newNode of newNodes) {
    if (!newNode.nodeName.endsWith('Z')) areAllNodeEnds = false;
    if (!areAllNodeEnds) break;
  }

  if (areAllNodeEnds) return;
  else findNextNodes(mapNodes, newNodes, instructions);
}

async function part1(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  const instructions = rows[0].split('');
  const mapNodes: MapNode[] = [];
  for (const row of rows.slice(2)) {
    mapNodes.push({
      nodeName: row.substring(0, 3),
      nodeLeft: row.substring(7, 10),
      nodeRight: row.substring(12, 15)
    });
  }

  let steps = 0;
  let instructionIndex = 0;
  let currentNode = mapNodes.find((node) => node.nodeName === 'AAA')!;

  while (true) {
    // Get the correct instruction
    if (instructionIndex >= instructions.length) instructionIndex = 0;
    const instruction = instructions[instructionIndex];
    instructionIndex++;

    // Find the next node
    currentNode = findNextNode(mapNodes, currentNode, instruction);
    steps++;
    if (currentNode.nodeName === 'ZZZ') break;
  }

  console.log(steps);
}

async function part2(fileName: string) {
  const input = fs.readFileSync(`input/${fileName}`);
  const rows = input.toString().split('\r\n');

  // Get instructions
  const instructions: Instructions = {
    array: rows[0].split(''),
    index: 0
  };

  // Get map nodes
  const mapNodes: MapNode[] = [];
  for (const row of rows.slice(2)) {
    mapNodes.push({
      nodeName: row.substring(0, 3),
      nodeLeft: row.substring(7, 10),
      nodeRight: row.substring(12, 15)
    });
  }

  let currentNodes: MapNode[] = mapNodes.filter((node) => node.nodeName.endsWith('A'));

  findNextNodes(mapNodes, currentNodes, instructions);

  console.log(steps);
}

// part1(`day${DAY}_example.txt`);
// part1(`day${DAY}.txt`);
// part2(`day${DAY}_example.txt`);
part2(`day${DAY}.txt`);
