import * as fs from "fs";
import * as path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "./input.txt"))
  .toString()
  .split("\n");

const findDigit = (
  index: number,
  charArr: string[],
  direction: number
): string => {
  const char = charArr[index];
  if (!Number.isNaN(Number(char))) {
    return char;
  }

  return findDigit(index + direction, charArr, direction);
};

const sum = input.reduce((total, line) => {
  let startIndex = 0;
  let endIndex = line.length - 1;
  const chars = line.split("");

  const calibrationValue: string[] = [
    findDigit(startIndex, chars, 1),
    findDigit(endIndex, chars, -1),
  ];
  const value = Number(calibrationValue.join(""));

  return total + value;
}, 0);

console.log(sum);
