import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

// Test Input
const testInputCards = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

const inputCards = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

interface Card {
  winningNumbers: Map<string, boolean>;
  numbers: Map<string, boolean>;
  id: number;
  count: number;
  totalCards: number;
}

const parseCards = (rawCards: string[]): Card[] => {
  return rawCards.map((rawCard) => {
    const match = rawCard
      .replace(/\s\s/g, " ") // Remove double spaces
      .match(/Card\s+(\d+):\s(.+)\s\|\s(.+)/); // Capture id, winning numbers, and card numbers
    return {
      id: +match[1],
      winningNumbers: new Map(match[2].split(" ").map((num) => [num, true])),
      numbers: new Map(match[3].split(" ").map((num) => [num, true])),
      count: 0,
      totalCards: 1,
    };
  });
};

const countMatches = (cards: Card[]): Card[] => {
  return cards.map((card) => {
    let count = 0;

    for (let [winningNumber] of card.winningNumbers) {
      if (card.numbers.has(winningNumber)) {
        count++;
      }
    }

    return {
      ...card,
      count,
    };
  });
};

const calculatePointTotal = (cards: Card[]) => {
  return cards.reduce((total, card) => {
    if (card.count > 0) {
      const cardValue = Math.pow(2, card.count - 1);
      return total + cardValue;
    }

    return total;
  }, 0);
};

console.log(calculatePointTotal(countMatches(parseCards(inputCards))));
const testResult = calculatePointTotal(
  countMatches(parseCards(testInputCards))
);
console.log(testResult);
assert(testResult === 13); // test input assertion

// Part 2
const countTotalScratchCards = (cards: Card[]) => {
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    const card = cards[cardIndex];

    for (
      let currentScratchCardIndex = 0;
      currentScratchCardIndex < card.totalCards;
      currentScratchCardIndex++
    ) {
      for (let i = 1; i <= card.count; i++) {
        const nextGameIndex = cardIndex + i;
        cards[nextGameIndex].totalCards += 1;
      }
    }
  }

  const sum = cards.reduce((total, c) => total + c.totalCards, 0);
  return sum;
};

console.log(countTotalScratchCards(countMatches(parseCards(inputCards))));

const testResultPart2 = countTotalScratchCards(
  countMatches(parseCards(testInputCards))
);
console.log(testResultPart2);
assert(testResultPart2 === 30); // test input assertion
