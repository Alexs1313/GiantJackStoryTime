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
    title: "Stone by the Old Trail",
    description:
      "I often walk old trails because they remember more than they seem. One day, almost at the very bend, I noticed a stone that was lying slightly out of...",
    fullText:
      "I often walk old trails because they remember more than they seem. One day, almost at the very bend, I noticed a stone that was lying slightly out of place. It looked as if someone had deliberately pushed it with their foot, but not all the way. I picked it up and felt warm, although the ground around it was cold after the night.\nI stood with it in my hand and wondered who had been here before me and why they had left it like that. The stone did not respond, but it did not need to. I put it back, exactly where I found it. And I walked on, knowing that some things should stay in their places.",
    quiz: [
      { question: "Where was the stone?", options: ["In the middle of the road", "A little to the side of the path", "Near the water"], correctIndex: 1 },
      { question: "Why did the stone attract Jack's attention?", options: ["It shone", "It was warm", "It was not quite in its place"], correctIndex: 2 },
      { question: "What was the ground like around it?", options: ["Dry", "Hot", "Cold"], correctIndex: 2 },
      { question: "What did Jack do with the stone?", options: ["Picked it up", "Thrown it", "Put it back in the same place"], correctIndex: 2 },
      { question: "The main idea of ​​the story:", options: ["Stones have power", "You don't need to take everything with you", "Trails are dangerous"], correctIndex: 1 },
    ],
  },
  {
    id: '2',
    title: "Valley where the fog appeared",
    description: "As I descended into the valley, the sky was clear...",
    fullText:
      "As I descended into the valley, the sky was clear, and nothing foretold change. But within a few minutes the air became thick, and the fog slowly covered everything around. I stopped seeing the distant hills, and then the path under my feet. That's when I heard a voice.\nIt didn't call me or ask me to stop. The voice just spoke, as if it were telling itself something important. I didn't move or look for the speaker. I listened. And I realized that not every voice exists to answer.",
    quiz: [
      { question: "Where was Jack?", options: ["In the mountains", "In the valley", "In the forest"], correctIndex: 1 },
      { question: "What appeared suddenly?", options: ["Rain", "Wind", "Fog"], correctIndex: 2 },
      { question: "What was the voice like?", options: ["Alarming", "Calm", "Loud"], correctIndex: 1 },
      { question: "What did Jack do?", options: ["Walked forward", "Started calling", "Stopped and listened"], correctIndex: 2 },
      { question: "What did he understand?", options: ["Need to find the source", "Not every voice needs an answer", "Fog is dangerous"], correctIndex: 1 },
    ],
  },
  {
    id: '3',
    title: "Footprints after the rain",
    description: "After a heavy rain, the ground became soft...",
    fullText:
      "After a heavy rain, the ground became soft, and footprints were clearly visible on it. They led forward, straight and confident. I followed them longer than I planned, because I wanted to understand where they would lead. But at a certain point, the footprints simply disappeared, as if they had been erased.\nI stood in this place for a long time and looked at the clean earth. As if nothing had happened. Then I realized: sometimes the path is important in itself, even if it has no end.",
    quiz: [
      { question: "When did the tracks appear?", options: ["In the morning", "After the rain", "In the evening"], correctIndex: 1 },
      { question: "What were the tracks like?", options: ["Old", "Clear", "Tangled"], correctIndex: 1 },
      { question: "What happened to the tracks?", options: ["Led to the forest", "Twisted", "Disappeared"], correctIndex: 2 },
      { question: "How did Jack react?", options: ["Went back", "Started looking for the person", "Stopped and thought"], correctIndex: 2 },
      { question: "Main idea:", options: ["All paths have an end", "The movement itself is important, not the ending", "Tracks cannot be trusted"], correctIndex: 1 },
    ],
  },
  {
    id: '4',
    title: "Smokeless Fire",
    description: "In the evening, between large stones, I saw a fire...",
    fullText:
      "In the evening, between large stones, I saw a fire. It was small, even and strangely calm. There was no smell, no smoke, no crackling. I sat down next to it and watched it glow for a long time without touching it.\nI could have done something - put it out or fanned it. But I did nothing. Because sometimes the best decision is not to interfere.",
    quiz: [
      { question: "Where was the fire?", options: ["In a cave", "Among the stones", "On a tree"], correctIndex: 1 },
      { question: "What did the fire not have?", options: ["Light", "Warmth", "Smoke"], correctIndex: 2 },
      { question: "What did Jack do?", options: ["Extinguished", "Walked", "Observed"], correctIndex: 2 },
      { question: "What was the fire like?", options: ["Sharp", "Calm", "Unstable"], correctIndex: 1 },
    ],
  },
  {
    id: '5',
    title: "A bridge that led nowhere",
    description: "I saw a bridge that seemed to appear from the ground...",
    fullText:
      "I saw a bridge that seemed to appear from the ground and disappear into the air. It had no clear beginning and no end in sight. I took a few steps on it and felt that this was enough.\nI did not go further, but I did not regret it either. Because sometimes it is enough to know that the path exists, even if you are not ready to walk it.",
    quiz: [
      { question: "What did Jack see?", options: ["Stairs", "Road", "Bridge"], correctIndex: 2 },
      { question: "What was the bridge like?", options: ["Short", "Without a clear beginning and end", "Broken"], correctIndex: 1 },
      { question: "How many steps did Jack take?", options: ["None", "Many", "A few"], correctIndex: 2 },
      { question: "Why did he stop?", options: ["Scared", "That was enough", "Tired"], correctIndex: 1 },
      { question: "What is the story about?", options: ["About fear", "About choice", "About loss"], correctIndex: 1 },
    ],
  },
  {
    id: '6',
    title: "A Cracked Stone",
    description: "I found a large stone at the bottom of a hill...",
    fullText:
      "I found a large stone at the bottom of a hill. It looked solid and heavy, but when I looked closer, I saw a thin crack that ran almost across the entire surface. It didn't split the stone in half or make it brittle. On the contrary, it seemed to hold the stone together because of it.\nI ran my fingers along the crack and imagined how long it took for it to appear. The stone didn't break, it didn't crumble, it stayed in place. And I realized that sometimes it's the damage that shows true strength.",
    quiz: [
      { question: "Where was the stone?", options: ["By the water", "On the path", "At the bottom of the hill"], correctIndex: 2 },
      { question: "What was on the stone?", options: ["A pattern", "A crack", "A hole"], correctIndex: 1 },
      { question: "What was the crack like?", options: ["Rough", "Thin", "Deep"], correctIndex: 1 },
      { question: "What did the stone look like overall?", options: ["Brittle", "Strong", "Broken"], correctIndex: 1 },
      { question: "The main idea of ​​the story:", options: ["Stones break", "Damage can show strength", "Cracks are dangerous"], correctIndex: 1 },
    ],
  },
  {
    id: '7',
    title: "A Road That Turns Back",
    description: "I was walking down a road that seemed long and straight...",
    fullText:
      "I was walking down a road that seemed long and straight. I was sure I was moving forward until I suddenly recognized a familiar tree. A few steps later, I saw the place where I started.\nNothing around me had changed, but the feelings were different. I didn't get upset or angry. I realized that this path was needed not for a new place, but for a new perspective.",
    quiz: [
      { question: "What did the road seem like at first?", options: ["Short", "Straight and long", "Convoluted"], correctIndex: 1 },
      { question: "What helped Jack understand that he had returned?", options: ["A stone", "A building", "A familiar tree"], correctIndex: 2 },
      { question: "Has the place changed?", options: ["Yes", "No", "Partially"], correctIndex: 1 },
      { question: "What really changed?", options: ["Weather", "Time", "Jack's feelings"], correctIndex: 2 },
      { question: "Main idea:", options: ["Don't go far", "Roads are useless", "The path can change your perspective"], correctIndex: 2 },
    ],
  },
  {
    id: '8',
    title: "The Shadow That Walked Next To Me",
    description: "As the sun began to tilt, I noticed a shadow next to me...",
    fullText:
      "As the sun began to tilt, I noticed a shadow next to me. It didn't move like mine, and it appeared even when I stopped. It wasn't scary, but it made me look more closely.\nI didn't try to understand its origin. I simply accepted that not everything around me needed to be explained. And that was enough.",
    quiz: [
      { question: "When did the shadow appear?", options: ["In the morning", "At noon", "At sunset"], correctIndex: 2 },
      { question: "How was the shadow different?", options: ["It was bigger", "It did not follow Jack's movements", "It was darker"], correctIndex: 1 },
      { question: "How did Jack react?", options: ["He tried to catch up", "He was scared", "He watched calmly"], correctIndex: 2 },
      { question: "What did he not do?", options: ["He watched", "He accepted", "He looked for an explanation"], correctIndex: 2 },
      { question: "Main idea:", options: ["Everything needs to be understood", "Not everything has an explanation", "Shadows are dangerous"], correctIndex: 1 },
    ],
  },
  {
    id: '9',
    title: "A Place Without Traces",
    description: "I reached a patch of land where there was no trace...",
    fullText:
      "I reached a patch of land where there was no trace. Not even the wind left its mark. The place looked as if no one had ever been here.\nI stood there longer than I had planned. And I realized that the absence of traces could also mean something.",
    quiz: [
      { question: "What was special about this place?", options: ["Lots of footprints", "Water", "No footprints at all"], correctIndex: 2 },
      { question: "Who left no footprints?", options: ["People", "Animals", "Even the wind"], correctIndex: 2 },
      { question: "What did the place look like?", options: ["Abandoned", "Empty", "Dangerous"], correctIndex: 1 },
      { question: "What did Jack do?", options: ["Left immediately", "Left a sign", "Stopped and thought"], correctIndex: 2 },
      { question: "Main idea:", options: ["Footprints are important", "Emptiness means nothing", "Absence can also matter"], correctIndex: 2 },
    ],
  },
  {
    id: '10',
    title: "Before moving on",
    description: "Before continuing on my path, I looked back one last time...",
    fullText:
      "Before continuing on my path, I looked back one last time. I wasn't looking for anything new or trying to change anything. I was just looking.\nAnd that was enough to understand - you can move on without any doubts.",
    quiz: [
      { question: "What did Jack do before he left?", options: ["Sat down", "Looked around", "Stopped for a long time"], correctIndex: 1 },
      { question: "Did he see anything new?", options: ["Yes", "No", "Partially"], correctIndex: 1 },
      { question: "What was the purpose of this moment?", options: ["To turn back", "To finish", "To move on confidently"], correctIndex: 2 },
      { question: "What did Jack feel?", options: ["Doubt", "Haste", "Calm confidence"], correctIndex: 2 },
      { question: "The main idea of ​​the finale:", options: ["The end of the journey", "Pause", "Willingness to move on"], correctIndex: 2 },
    ],
  },
];

export function getStoryById(id: string): StoryWithQuiz | undefined {
  return STORIES_WITH_QUIZZES.find((s) => s.id === id);
}
