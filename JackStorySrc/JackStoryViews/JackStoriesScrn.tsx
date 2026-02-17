import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STORIES_WITH_QUIZZES } from '../JackStoryData/storiesWithQuizzes';
import {
  loadProgress,
  unlockStoryWithCrystals,
  type Progress,
} from '../JackStoryStorage/progressStorage';
import { StackList } from '../JackStoryRoutes/StackWays';

export type StoryItem = {
  id: string;
  title: string;
  description: string;
  fullText: string;
  cost: number;
};

const STORIES_LIST: StoryItem[] = STORIES_WITH_QUIZZES.map((s, i) => ({
  id: s.id,
  title: s.title,
  description: s.description,
  fullText: s.fullText,
  cost: i > 0 ? 5 : 0,
}));

const JackStoriesScrn = () => {
  const navigation = useNavigation<StackList>();
  const [progress, setProgress] = useState<Progress>({
    crystals: 0,
    completedStoryIds: [],
    unlockedStoryIds: [],
  });

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, []),
  );

  const isUnlocked = (storyId: string, index: number) =>
    index === 0 ||
    progress.unlockedStoryIds.includes(storyId) ||
    progress.completedStoryIds.includes(storyId);
  const isCompleted = (storyId: string) =>
    progress.completedStoryIds.includes(storyId);
  const canBuyUnlock = (storyId: string, index: number) =>
    index > 0 &&
    !isUnlocked(storyId, index) &&
    progress.crystals >= STORIES_LIST[index].cost;

  const onReadMore = (story: StoryItem, index: number) => {
    if (isUnlocked(story.id, index)) {
      navigation.navigate('StoryDetailScrn', {
        storyId: story.id,
        title: story.title,
        fullText: story.fullText,
      });
      return;
    }
    if (canBuyUnlock(story.id, index)) {
      unlockStoryWithCrystals(story.id).then(newProgress => {
        if (newProgress) {
          setProgress(newProgress);
          navigation.navigate('StoryDetailScrn', {
            storyId: story.id,
            title: story.title,
            fullText: story.fullText,
          });
        }
      });
    }
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../JackStoryAssets/images/jackstoryheader.png')}
          style={styles.headerFrame}
          resizeMode="stretch"
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image
              source={require('../JackStoryAssets/images/jackstoryback.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>JACK'S STORIES</Text>
        </ImageBackground>

        <ImageBackground
          source={require('../JackStoryAssets/images/jackstoryqfra.png')}
          style={{
            width: 117,
            height: 77,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Text style={styles.currencyText}>{progress.crystals}</Text>
            <Image
              source={require('../JackStoryAssets/images/jackstorypoint.png')}
            />
          </View>
        </ImageBackground>

        <View style={styles.cardsWrap}>
          {STORIES_LIST.map((story, index) => {
            const unlocked = isUnlocked(story.id, index);
            const completed = isCompleted(story.id);
            const canBuy = canBuyUnlock(story.id, index);
            const showLockOverlay = !unlocked && !canBuy;
            return (
              <View key={story.id} style={styles.cardWrap}>
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstoryfrm.png')}
                  style={[styles.cardFrame]}
                  resizeMode="stretch"
                >
                  {showLockOverlay && (
                    <View style={styles.lockedOverlay}>
                      <Image
                        source={require('../JackStoryAssets/images/jackstorylock.png')}
                        style={{ marginBottom: 10 }}
                      />
                      <Image
                        source={require('../JackStoryAssets/images/jackstoryopen.png')}
                      />
                    </View>
                  )}
                  <View
                    style={[
                      styles.cardContent,
                      showLockOverlay && { opacity: 0.5 },
                    ]}
                  >
                    <Text style={styles.cardTitle}>{story.title}</Text>
                    <Text style={styles.cardDescription} numberOfLines={4}>
                      {story.description}
                    </Text>
                    {completed ? (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onReadMore(story, index)}
                        style={styles.completedWrap}
                      >
                        <ImageBackground
                          source={require('../JackStoryAssets/images/jackstorybutton.png')}
                          style={styles.completedButton}
                          resizeMode="stretch"
                        >
                          <Image
                            source={require('../JackStoryAssets/images/jackstorydone.png')}
                          />
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : unlocked ? (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onReadMore(story, index)}
                        style={styles.readMoreWrap}
                      >
                        <ImageBackground
                          source={require('../JackStoryAssets/images/jackstorybutton.png')}
                          style={styles.readMoreButton}
                          resizeMode="stretch"
                        >
                          <Text style={styles.readMoreText}>READ MORE</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : canBuy ? (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onReadMore(story, index)}
                        style={styles.readMoreWrap}
                      >
                        <Image
                          source={require('../JackStoryAssets/images/jackstoryopen.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.readMoreWrap}>
                        <ImageBackground
                          source={require('../JackStoryAssets/images/jackstorybutton.png')}
                          style={styles.readMoreButton}
                          resizeMode="stretch"
                        >
                          <Text style={styles.readMoreText}>
                            <Text style={styles.readMoreText}>READ MORE</Text>
                          </Text>
                        </ImageBackground>
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default JackStoriesScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  headerFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    minHeight: 82,
    marginBottom: 16,
  },
  backBtn: {
    position: 'absolute',
    left: 26,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  currencyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 10,
  },
  currencyText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  crystalIcon: {
    fontSize: 18,
  },
  crystalIconSmall: {
    fontSize: 14,
  },
  cardsWrap: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  cardWrap: {
    marginBottom: 20,
  },
  cardFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    overflow: 'hidden',
  },
  lockedOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  lockIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  costText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  cardContent: {
    padding: 24,
    paddingHorizontal: 28,
  },
  cardTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    paddingHorizontal: 10,
    marginBottom: 16,
    textAlign: 'center',
  },
  readMoreWrap: {
    alignSelf: 'center',
  },
  readMoreButton: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedWrap: {
    alignSelf: 'center',
  },
  completedButton: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 36,
    color: '#0a0',
    fontFamily: 'kefa-bold',
  },
  readMoreText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
