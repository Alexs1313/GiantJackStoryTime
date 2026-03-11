export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type StoryWithQuiz = {
  id: string;
  title: string;
  fullText: string;
  description: string;
  quiz: QuizQuestion[];
};

export const STORIES_WITH_QUIZZES: StoryWithQuiz[] = [
  {
    id: '1',
    title: 'Attention to detail',
    description: 'Quiz 1 — Attention to detail',
    fullText: '',
    quiz: [
      { question: 'Which is heavier: 1 kg of stones or 1 kg of feathers?', options: ['Stones', 'Feathers', 'Equally'], correctIndex: 2 },
      { question: 'Which month has 28 days?', options: ['February', 'All months', 'April'], correctIndex: 1 },
      { question: 'If you have 3 apples and you take 2, how many do you have left?', options: ['1', '2', '3'], correctIndex: 1 },
      { question: 'What always grows but never decreases?', options: ['Age', 'Tree', 'Mountain'], correctIndex: 0 },
      { question: 'How many letters are in the word "alphabet"?', options: ['7', '8', '8 (count the letters a-l-p-h-a-b-e-t — 8)'], correctIndex: 0 },
      { question: 'What disappears if you name it?', options: ['Silence', 'Air', 'Sun'], correctIndex: 0 },
      { question: 'What has keys, but does not open doors?', options: ['Piano', 'Lock', 'Chest'], correctIndex: 0 },
      { question: 'What can be caught, but cannot be thrown?', options: ['Ball', 'Cold', 'Stone'], correctIndex: 1 },
      { question: 'If today is Monday, what day will it be in 7 days?', options: ['Sunday', 'Monday', 'Tuesday'], correctIndex: 1 },
      { question: 'What has a head and a tail, but no body?', options: ['Coin', 'Snake', 'Fish'], correctIndex: 0 },
    ],
  },
  {
    id: '2',
    title: 'Logic',
    description: 'Quiz 2 — Logic',
    fullText: '',
    quiz: [
      { question: 'If 2+2×2 = ?', options: ['8', '6', '4'], correctIndex: 1 },
      { question: 'Which is greater: half of 10 or a third of 18?', options: ['Half', 'One third', 'Equal'], correctIndex: 1 },
      { question: 'How many corners does a cube have?', options: ['6', '8', '12'], correctIndex: 1 },
      { question: 'Which number continues the series: 2, 4, 8, 16, ?', options: ['20', '24', '32'], correctIndex: 2 },
      { question: 'If all cats are animals and some animals are black, are all cats black?', options: ['Yes', 'No', 'It is impossible to determine'], correctIndex: 1 },
      { question: 'How many minutes are there in an hour and a half?', options: ['60', '75', '90'], correctIndex: 2 },
      { question: 'If one step is 1 meter, how many meters are there in 10 steps?', options: ['9', '10', '11'], correctIndex: 1 },
      { question: 'Which number is extra: 3, 5, 7, 8, 11?', options: ['7', '8', '11'], correctIndex: 1 },
      { question: 'How many sides does a triangle have?', options: ['3', '4', '5'], correctIndex: 0 },
      { question: 'If there are 5 oranges in the basket and you took 5, how many do you have?', options: ['0', '5', '1'], correctIndex: 1 },
    ],
  },
  {
    id: '3',
    title: 'Observation',
    description: 'Quiz 3 — Observation',
    fullText: '',
    quiz: [
      { question: 'What color is the sky on a clear day?', options: ['Blue', 'Green', 'Red'], correctIndex: 0 },
      { question: 'How many days are there in a week?', options: ['5', '6', '7'], correctIndex: 2 },
      { question: 'Which is faster: light or sound?', options: ['Light', 'Sound', 'Equal'], correctIndex: 0 },
      { question: 'How many fingers are there on two hands?', options: ['8', '10', '10 (5 on each — total 10)'], correctIndex: 1 },
      { question: 'What season comes after spring?', options: ['Autumn', 'Summer', 'Winter'], correctIndex: 1 },
      { question: 'What is wetter after rain?', options: ['Asphalt', 'Puddle', 'Everything around'], correctIndex: 2 },
      { question: 'How many months are there in a year?', options: ['10', '11', '12'], correctIndex: 2 },
      { question: 'What has pages?', options: ['Book', 'Stone', 'Tree'], correctIndex: 0 },
      { question: 'What day comes before Friday?', options: ['Wednesday', 'Thursday', 'Sunday'], correctIndex: 1 },
      { question: 'What shines during the day?', options: ['Moon', 'Sun', 'Star'], correctIndex: 1 },
    ],
  },
  {
    id: '4',
    title: 'Thinking',
    description: 'Quiz 4 — Thinking',
    fullText: '',
    quiz: [
      { question: 'If you drink water, it becomes…', options: ['Dry', 'Part of you', 'Steam'], correctIndex: 1 },
      { question: 'What is always in front of you, but you don\'t see it?', options: ['Future', 'Air', 'Shadow'], correctIndex: 0 },
      { question: 'Which is bigger: 100 or 10×9?', options: ['100', '90', 'Same'], correctIndex: 0 },
      { question: 'What can be broken without touching?', options: ['Glass', 'Promise', 'Stone'], correctIndex: 1 },
      { question: 'If you are facing south, where is the east?', options: ['Right', 'Left', 'Behind'], correctIndex: 1 },
      { question: 'What has wings but does not fly?', options: ['Bird', 'Airplane', 'House (wings of a building)'], correctIndex: 2 },
      { question: 'If 5 people have 2 apples each, how many apples are there together?', options: ['7', '10', '12'], correctIndex: 1 },
      { question: 'Which is lighter: a kilogram of iron or a kilogram of cotton wool?', options: ['Iron', 'Cotton wool', 'Same'], correctIndex: 2 },
      { question: 'What cannot be seen but can be felt?', options: ['Wind', 'Stone', 'Ice'], correctIndex: 0 },
      { question: 'What occurs twice in the word "giant"?', options: ['The letter "e"', 'The letter "v"', 'The letter "n"'], correctIndex: 0 },
    ],
  },
  {
    id: '5',
    title: 'General Knowledge',
    description: 'Quiz 5 — General Knowledge',
    fullText: '',
    quiz: [
      { question: 'How many continents are there on Earth?', options: ['5', '6', '7'], correctIndex: 2 },
      { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Mars'], correctIndex: 1 },
      { question: 'How many hours are there in a day?', options: ['12', '24', '48'], correctIndex: 1 },
      { question: 'The largest ocean?', options: ['Atlantic', 'Indian', 'Pacific'], correctIndex: 2 },
      { question: 'How many colors are there in a rainbow?', options: ['6', '7', '8'], correctIndex: 1 },
      { question: 'What gas do people need to breathe?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen'], correctIndex: 1 },
      { question: 'How many legs does a spider have?', options: ['6', '8', '10'], correctIndex: 1 },
      { question: 'The largest animal in the world?', options: ['Elephant', 'Blue whale', 'Giraffe'], correctIndex: 1 },
      { question: 'How many days are there in a leap year?', options: ['365', '366', '364'], correctIndex: 1 },
      { question: 'Which planet is known for its rings?', options: ['Jupiter', 'Saturn', 'Mars'], correctIndex: 1 },
    ],
  },
];

export function getStoryById(id: string): StoryWithQuiz | undefined {
  return STORIES_WITH_QUIZZES.find((s) => s.id === id);
}
