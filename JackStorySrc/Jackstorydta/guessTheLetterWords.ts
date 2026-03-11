/** Words for "Guess the Letter" game with fixed options (correct first, then two wrong). */
const WORDS_WITH_OPTIONS: { fullWord: string; options: [string, string, string] }[] = [
  { fullWord: 'apple', options: ['A', 'E', 'O'] },
  { fullWord: 'book', options: ['B', 'L', 'T'] },
  { fullWord: 'house', options: ['H', 'M', 'R'] },
  { fullWord: 'green', options: ['G', 'B', 'S'] },
  { fullWord: 'light', options: ['L', 'N', 'R'] },
  { fullWord: 'river', options: ['R', 'D', 'S'] },
  { fullWord: 'table', options: ['T', 'C', 'F'] },
  { fullWord: 'sun', options: ['S', 'M', 'P'] },
  { fullWord: 'car', options: ['C', 'B', 'F'] },
  { fullWord: 'cake', options: ['C', 'M', 'T'] },
  { fullWord: 'fish', options: ['F', 'D', 'W'] },
  { fullWord: 'dog', options: ['D', 'L', 'B'] },
  { fullWord: 'cat', options: ['C', 'H', 'M'] },
  { fullWord: 'rain', options: ['R', 'P', 'T'] },
  { fullWord: 'wall', options: ['W', 'H', 'B'] },
  { fullWord: 'wind', options: ['W', 'F', 'K'] },
  { fullWord: 'lake', options: ['L', 'M', 'R'] },
  { fullWord: 'fire', options: ['F', 'H', 'S'] },
  { fullWord: 'moon', options: ['M', 'S', 'B'] },
  { fullWord: 'sand', options: ['S', 'B', 'H'] },
  { fullWord: 'mouse', options: ['M', 'H', 'C'] },
  { fullWord: 'milk', options: ['M', 'S', 'B'] },
  { fullWord: 'time', options: ['T', 'D', 'L'] },
  { fullWord: 'flower', options: ['F', 'T', 'S'] },
  { fullWord: 'story', options: ['S', 'H', 'G'] },
  { fullWord: 'game', options: ['G', 'N', 'F'] },
  { fullWord: 'garden', options: ['G', 'H', 'P'] },
  { fullWord: 'boat', options: ['B', 'R', 'C'] },
  { fullWord: 'cloud', options: ['C', 'S', 'P'] },
  { fullWord: 'snow', options: ['S', 'K', 'T'] },
  { fullWord: 'king', options: ['K', 'R', 'B'] },
  { fullWord: 'friend', options: ['F', 'T', 'P'] },
  { fullWord: 'heart', options: ['H', 'B', 'D'] },
  { fullWord: 'power', options: ['P', 'F', 'T'] },
  { fullWord: 'guitar', options: ['G', 'B', 'S'] },
  { fullWord: 'green', options: ['G', 'D', 'P'] },
  { fullWord: 'dragon', options: ['D', 'G', 'B'] },
  { fullWord: 'blue', options: ['B', 'C', 'G'] },
  { fullWord: 'crown', options: ['C', 'B', 'F'] },
  { fullWord: 'night', options: ['N', 'L', 'F'] },
  { fullWord: 'voice', options: ['V', 'C', 'B'] },
  { fullWord: 'water', options: ['W', 'L', 'T'] },
  { fullWord: 'world', options: ['W', 'H', 'M'] },
  { fullWord: 'mind', options: ['M', 'W', 'L'] },
  { fullWord: 'bear', options: ['B', 'D', 'P'] },
  { fullWord: 'pain', options: ['P', 'R', 'C'] },
  { fullWord: 'right', options: ['R', 'L', 'D'] },
  { fullWord: 'work', options: ['W', 'B', 'F'] },
  { fullWord: 'leaf', options: ['L', 'D', 'S'] },
  { fullWord: 'make', options: ['M', 'C', 'T'] },
];

export type WordWithOptions = {
  fullWord: string;
  wordDisplay: string;
  options: string[];
  correctIndex: number;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function getWordWithOptions(): WordWithOptions {
  const item = WORDS_WITH_OPTIONS[Math.floor(Math.random() * WORDS_WITH_OPTIONS.length)];
  const wordDisplay = '_' + item.fullWord.slice(1);
  const optionsShuffled = shuffle([...item.options]);
  const correctLetter = item.options[0];
  const correctIndex = optionsShuffled.indexOf(correctLetter);

  return {
    fullWord: item.fullWord,
    wordDisplay,
    options: optionsShuffled,
    correctIndex,
  };
}
