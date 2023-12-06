import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const getTimes = (inputStr: string) => {
  console.log("🚀 inputStr:", inputStr);

  const nestedInput = inputStr
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").split(" "));
  console.log("🚀 ~ file: index.ts:12 ~ getTimes ~ nestedInput:", nestedInput);
  const res: [number, number][] = nestedInput[0].map((line, i, arr) => {
    return [+line, +nestedInput[1][i]];
  });

  res.shift();

  console.log(res);
  return res;
};

const calcDist = (holdTime: number, totalTime: number) => {
  const speed = holdTime;
  const dist = (totalTime - holdTime) * speed;
  return dist;
};

const findNumWaysToWin = (race: [number, number]): number => {
  const [time, distance] = race;
  let winCounter = 0;
  for (let hold = 0; hold < time; hold++) {
    const dist = calcDist(hold, time);
    if (dist > distance) {
      winCounter++;
    }
  }

  return winCounter;
};

const races = getTimes(input);
console.log(races.map(findNumWaysToWin).reduce((acc, wins) => acc * wins, 1));
