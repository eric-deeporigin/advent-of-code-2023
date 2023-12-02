import * as fs from "fs";
import * as path from "path";

// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

const gameIdRegex = /Game\s(\d+)\:\s(.+)/;

const games = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const getPowerOfGame = (game: string) => {
  const match = game.match(gameIdRegex);
  if (match === null) {
    // skip
    return;
  }

  // 1
  // 1 blue, 8 green; 14 green, 15 blue; 3 green, 9 blue; 8 green, 8 blue, 1 red; 1 red, 9 green, 10 blue

  const gameId = match[1];
  const rounds = match[2].split("; ");
  // 1 blue, 8 green
  // 14 green, 15 blue
  // 3 green, 9 blue
  // 8 green, 8 blue, 1 red
  // 1 red, 9 green, 10 blue

  const roundMap: Record<string, number> = {
    red: 0,
    blue: 0,
    green: 0,
  };

  const largestNums = rounds.reduce((ans, r) => {
    const cube = r.split(", ");
    // 1 blue
    // 8 green
    for (let c of cube) {
      const [num, color] = c.split(" ");
      if (ans[color] < +num) {
        ans[color] = +num;
      }
    }

    return ans;
  }, roundMap);

  console.log(
    "🚀 ~ file: part2.ts:53 ~ getPowerOfGame ~ largestNums:",
    largestNums
  );
  return largestNums.red * largestNums.green * largestNums.blue;
};

const powers: number[] = [];

for (let game of games) {
  const powerOfGame = getPowerOfGame(game);
  if (powerOfGame) {
    powers.push(powerOfGame);
  }
}

const sum = powers.reduce((s, id) => s + +id, 0);

console.log(sum);
