import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_CRYSTALS = '@JackStory:crystals';
const KEY_COMPLETED_IDS = '@JackStory:completedStoryIds';
const KEY_UNLOCKED_IDS = '@JackStory:unlockedStoryIds';
const KEY_READ_STORY_IDS = '@JackStory:readStoryIds';

export type Progress = {
  crystals: number;
  completedStoryIds: string[];
  unlockedStoryIds: string[];
  readStoryIds: string[];
};

export async function loadProgress(): Promise<Progress> {
  try {
    const [crystalsStr, completedStr, unlockedStr, readStr] = await Promise.all(
      [
        AsyncStorage.getItem(KEY_CRYSTALS),
        AsyncStorage.getItem(KEY_COMPLETED_IDS),
        AsyncStorage.getItem(KEY_UNLOCKED_IDS),
        AsyncStorage.getItem(KEY_READ_STORY_IDS),
      ],
    );
    const crystals = crystalsStr != null ? parseInt(crystalsStr, 10) : 0;
    const completedStoryIds =
      completedStr != null ? JSON.parse(completedStr) : [];
    const unlockedStoryIds = unlockedStr != null ? JSON.parse(unlockedStr) : [];
    const readStoryIds = readStr != null ? JSON.parse(readStr) : [];
    return {
      crystals: isNaN(crystals) ? 0 : crystals,
      completedStoryIds: Array.isArray(completedStoryIds)
        ? completedStoryIds
        : [],
      unlockedStoryIds: Array.isArray(unlockedStoryIds) ? unlockedStoryIds : [],
      readStoryIds: Array.isArray(readStoryIds) ? readStoryIds : [],
    };
  } catch {
    return {
      crystals: 0,
      completedStoryIds: [],
      unlockedStoryIds: [],
      readStoryIds: [],
    };
  }
}

export async function saveProgress(progress: Progress): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.setItem(KEY_CRYSTALS, String(progress.crystals)),
      AsyncStorage.setItem(
        KEY_COMPLETED_IDS,
        JSON.stringify(progress.completedStoryIds),
      ),
      AsyncStorage.setItem(
        KEY_UNLOCKED_IDS,
        JSON.stringify(progress.unlockedStoryIds),
      ),
      AsyncStorage.setItem(
        KEY_READ_STORY_IDS,
        JSON.stringify(progress.readStoryIds),
      ),
    ]);
  } catch (_) {}
}

const DEFAULT_PROGRESS: Progress = {
  crystals: 0,
  completedStoryIds: [],
  unlockedStoryIds: [],
  readStoryIds: [],
};

export async function resetProgress(): Promise<Progress> {
  await saveProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
}

const CRYSTALS_TO_UNLOCK = 5;

export async function unlockStoryWithCrystals(
  storyId: string,
): Promise<Progress | null> {
  const progress = await loadProgress();
  const alreadyOpen =
    progress.unlockedStoryIds.includes(storyId) ||
    progress.completedStoryIds.includes(storyId);
  if (alreadyOpen || progress.crystals < CRYSTALS_TO_UNLOCK) {
    return null;
  }
  progress.crystals -= CRYSTALS_TO_UNLOCK;
  progress.unlockedStoryIds = [...progress.unlockedStoryIds, storyId].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10),
  );
  await saveProgress(progress);
  return progress;
}

export async function markStoryAsRead(storyId: string): Promise<void> {
  const progress = await loadProgress();
  if (progress.readStoryIds.includes(storyId)) return;
  progress.readStoryIds = [...progress.readStoryIds, storyId].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10),
  );
  await saveProgress(progress);
}

export async function addCrystalsAndCompleteStory(
  storyId: string,
): Promise<Progress> {
  const progress = await loadProgress();
  if (progress.completedStoryIds.includes(storyId)) {
    return progress;
  }
  progress.crystals += 5;
  progress.completedStoryIds = [...progress.completedStoryIds, storyId].sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10),
  );
  if (!progress.unlockedStoryIds.includes(storyId)) {
    progress.unlockedStoryIds = [...progress.unlockedStoryIds, storyId].sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10),
    );
  }
  await saveProgress(progress);
  return progress;
}
