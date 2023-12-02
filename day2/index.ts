import * as fs from "fs";
import * as path from "path";

// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

const desiredCubes: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const gameIdRegex = /Game\s(\d+)\:\s(.+)/;
// const cubeRegex = /(\d+)\s(green|blue|red)/

const games = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const isRoundValid = (round: string) => {
  console.log("🚀 ~ file: index.ts:21 ~ isRoundValid ~ round:", round);
  const cube = round.split(", ");
  console.log("🚀 ~ file: index.ts:22 ~ isRoundValid ~ cube:", cube);
  return cube.every((c) => {
    const [num, color] = c.split(" ");
    return +num <= desiredCubes[color];
  });
};

const validateGame = (game: string) => {
  const match = game.match(gameIdRegex);
  if (match === null) {
    // skip
    return;
  }
  const gameId = match[1];
  const rounds = match[2].split("; ");
  const isValid = rounds.every(isRoundValid);
  if (isValid) {
    return gameId;
  }

  return undefined;
};

const validGameIds: string[] = [];

for (let game of games) {
  const isValidGame = validateGame(game);
  console.log("🚀 ~ file: index.ts:48 ~ isValidGame:", isValidGame);
  if (isValidGame) {
    validGameIds.push(isValidGame);
  }
  // const [ , gameId, rounds ] = match;
}

const sum = validGameIds.reduce((s, id) => s + +id, 0);

console.log(validGameIds);
console.log(sum);
