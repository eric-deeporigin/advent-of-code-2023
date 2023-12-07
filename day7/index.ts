import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

interface Hand {
  cards: string[];
  rawCards: string;
  bid: number;
  strength: HandStrength;
}

enum HandStrength {
  FIVE_OF_A_KIND = 7,
  FOUR_OF_A_KIND = 6,
  FULL_HOUSE = 5,
  THREE_OF_A_KIND = 4,
  TWO_PAIR = 3,
  ONE_PAIR = 2,
  HIGH_CARD = 1,
}

const parseInput = (rawInput: string): Hand[] => {
  const hands = rawInput.split("\n").map((line) => {
    const [rawCards, bid] = line.split(" ");
    const cards = rawCards.split("");
    const hand: Hand = {
      rawCards,
      bid: +bid,
      cards,
      strength: determineStrength({ cards }),
    };

    return hand;
  });

  return hands;
};

const determineStrength = (hand: Pick<Hand, "cards">) => {
  const cardMap = new Map();
  hand.cards.forEach((card) => {
    cardMap.set(card, (cardMap.get(card) || 0) + 1);
  });
  //   console.log(cardMap.entries());
  let handStrength = HandStrength.HIGH_CARD;
  for (let cardCount of cardMap.entries()) {
    const count = cardCount[1];
    if (count === 5) {
      handStrength = HandStrength.FIVE_OF_A_KIND;
    } else if (count === 4) {
      handStrength = HandStrength.FOUR_OF_A_KIND;
    } else if (count === 3) {
      if (handStrength === HandStrength.ONE_PAIR) {
        handStrength = HandStrength.FULL_HOUSE;
      } else {
        handStrength = HandStrength.THREE_OF_A_KIND;
      }
    } else if (count === 2) {
      if (handStrength === HandStrength.THREE_OF_A_KIND) {
        handStrength = HandStrength.FULL_HOUSE;
      } else if (handStrength === HandStrength.ONE_PAIR) {
        handStrength = HandStrength.TWO_PAIR;
      } else {
        handStrength = HandStrength.ONE_PAIR;
      }
    }
  }

  return handStrength;
};

const cardValueMap = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const getCardValue = (card: string): number => {
  return cardValueMap[card];
};

const sort = (hand1: Hand, hand2: Hand): number => {
  //   console.log("hand1", hand1);
  const diff = hand1.strength - hand2.strength;
  if (diff !== 0) {
    return diff;
  }

  // hands are the same strength, iterate through both to find the largest card
  for (let i = 0; i < hand1.cards.length; i++) {
    const card1 = getCardValue(hand1.cards[i]);
    const card2 = getCardValue(hand2.cards[i]);
    const cardDiff = card1 - card2;
    if (cardDiff < 0) {
      return -1;
    } else if (cardDiff > 0) {
      return 1;
    } else {
      // Cards are the same
      continue;
    }
  }

  return 0;
};

const sumWinnings = (hands: Hand[]): number => {
  const sum = hands.reduce((total, hand, i) => {
    const multiplier = i + 1;
    return total + hand.bid * multiplier;
  }, 0);

  return sum;
};

const sortedHands = parseInput(input).sort(sort);
// console.table(sortedHands.map((hand) => hand.rawCards));
console.table(sortedHands);
console.log(sumWinnings(sortedHands));

const sortedTestHands = parseInput(testInput).sort(sort);
console.table(sortedTestHands);
assert(sumWinnings(sortedTestHands) === 6440);
