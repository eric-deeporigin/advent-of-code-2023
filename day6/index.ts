import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const getTimes = (inputStr: string) => {
  const nestedInput = inputStr
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").split(" "));
  const res: [number, number][] = nestedInput[0].map((line, i, arr) => {
    return [+line, +nestedInput[1][i]];
  });

  res.shift();

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
// Ans
console.log(
  "🚀 part1",
  races.map(findNumWaysToWin).reduce((acc, wins) => acc * wins, 1)
);

// Pt 2

const race: [string, string] = getTimes(input).reduce(
  (race, subSet) => {
    race[0] = `${race[0]}${subSet[0]}`;
    race[1] = `${race[1]}${subSet[1]}`;
    return race;
  },
  ["", ""]
);

// Ans
const finalRace = findNumWaysToWin([+race[0], +race[1]]);
console.log("🚀 part2", finalRace);
