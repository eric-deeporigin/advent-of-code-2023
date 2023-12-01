import * as fs from "fs";
import * as path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "./input.txt"))
  .toString()
  .split("\n");

const spelledOutDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const wordToDigit: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const lookAhead = (
  index: number,
  charArr: string[],
  direction: number
): string | undefined => {
  const foundWord = spelledOutDigits.find((word) => {
    const offsetIndex = index + direction * word.length;
    let lookedAtWord = "";
    // looking ahead
    if (offsetIndex > index) {
      lookedAtWord = charArr.slice(index, offsetIndex).join("");
    } else {
      // looking behind
      lookedAtWord = charArr.slice(offsetIndex, index).join("");
    }

    return word === lookedAtWord;
  });

  if (foundWord) {
    return String(wordToDigit[foundWord]);
  }
};

const findDigit = (
  index: number,
  charArr: string[],
  direction: number
): string => {
  const char = charArr[index];
  if (!Number.isNaN(Number(char))) {
    return char;
  }

  const wordDigit = lookAhead(index, charArr, direction);
  if (wordDigit) {
    return wordDigit;
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
