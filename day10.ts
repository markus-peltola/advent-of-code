import * as fs from 'fs';

function main() {
  const input = fs.readFileSync('input/day10.txt');
  const instructions = input.toString().split('\r\n');

  const signalStrengths: number[] = [];
  const screen: string[] = [];

  let clock = 0;
  let xRegister = 1;

  for (const step of instructions) {
    if (clock > 240) break;
    if (step.startsWith('noop')) {
      screen.push(drawPixel(xRegister, clock));
      clock++;
      if (clock === 20 || (clock - 20) % 40 === 0) signalStrengths.push(clock * xRegister);
    } else if (step.startsWith('addx')) {
      screen.push(drawPixel(xRegister, clock));
      clock++;
      if (clock === 20 || (clock - 20) % 40 === 0) signalStrengths.push(clock * xRegister);
      screen.push(drawPixel(xRegister, clock));
      clock++;
      if (clock === 20 || (clock - 20) % 40 === 0) signalStrengths.push(clock * xRegister);
      xRegister += parseInt(step.split(' ')[1]);
    }
  }

  // Answer to part 1
  console.log(signalStrengths.reduce((accumulator, currentValue) => accumulator + currentValue, 0));

  // Answer to part 2
  for (let i = 0; i < 240; i += 40) {
    console.log(screen.slice(i, i + 40).join(''));
  }
}

function drawPixel(xRegister: number, clock: number): string {
  const sprite = [xRegister - 1, xRegister, xRegister + 1];
  if (sprite.includes(clock % 40)) return '#';
  else return '.';
}

main();
