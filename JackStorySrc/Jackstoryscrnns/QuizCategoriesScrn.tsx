// categorites

import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import { STORIES_WITH_QUIZZES } from '../Jackstorydta/storiesWithQuizzes';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const CARD_WIDTH = 280;
const CARD_MARGIN = 15;
const CENTER_SCALE = 1;
const SIDE_SCALE = 0.88;
const CENTER_OPACITY = 1;
const SIDE_OPACITY = 0.7;

const DEFAULT_CENTER_INDEX = 1;

const QuizCategoriesScrn = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = CARD_WIDTH + CARD_MARGIN * 2;
  const initialScrollX = Math.min(
    DEFAULT_CENTER_INDEX * itemWidth,
    Math.max(0, (STORIES_WITH_QUIZZES.length - 1) * itemWidth),
  );
  const scrollX = useRef(new Animated.Value(initialScrollX)).current;
  const scrollViewRef = useRef(null);

  const paddingHorizontal = Math.max(0, screenWidth / 2 - itemWidth / 2);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: initialScrollX, animated: false });
  }, [screenWidth, initialScrollX]);

  const jackStrStartQuiz = (storyId: string) => {
    const root = navigation.getParent();
    (root as any)?.navigate('QuizScrn', { storyId });
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.jackStoryImageBackground}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.jackStoryHeaderFrame}>
          <Text style={styles.jackStoryHeaderTitle}>QUIZZES</Text>
        </View>

        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={false}
          contentOffset={{ x: initialScrollX, y: 0 }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          snapToOffsets={STORIES_WITH_QUIZZES.map((_, i) => i * itemWidth)}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={[
            styles.jackStoryCarouselContent,
            { paddingHorizontal, paddingBottom: 120 },
          ]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        >
          {STORIES_WITH_QUIZZES.map((story, index) => {
            const cardCenter =
              paddingHorizontal + itemWidth * index + itemWidth / 2;

            const scale = scrollX.interpolate({
              inputRange: [
                cardCenter - screenWidth / 2 - itemWidth,
                cardCenter - screenWidth / 2,
                cardCenter - screenWidth / 2 + itemWidth,
              ],
              outputRange: [SIDE_SCALE, CENTER_SCALE, SIDE_SCALE],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange: [
                cardCenter - screenWidth / 2 - itemWidth,
                cardCenter - screenWidth / 2,
                cardCenter - screenWidth / 2 + itemWidth,
              ],
              outputRange: [SIDE_OPACITY, CENTER_OPACITY, SIDE_OPACITY],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={story.id}
                style={[
                  styles.jackStoryCardWrap,
                  {
                    width: itemWidth,
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <View style={styles.jackStoryCardFrame}>
                  <Text style={styles.jackStoryCategoryTitle}>
                    {story.title}
                  </Text>

                  <Text style={styles.jackStoryQuestionCount}>
                    Questions: {story.quiz.length}
                  </Text>

                  <Image
                    source={require('../JackStoryAssets/images/qjackk.png')}
                    style={styles.jackStoryCharacterImage}
                  />
                </View>

                <PressableWithAnimation
                  onPress={() => jackStrStartQuiz(story.id)}
                  style={styles.jackStoryStartButtonWrap}
                >
                  <LinearGradient
                    colors={['#200653', '#460CB9']}
                    style={styles.jackStoryStartButton}
                  >
                    <Text style={styles.jackStoryStartButtonText}>START</Text>
                  </LinearGradient>
                </PressableWithAnimation>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

export default QuizCategoriesScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryHeaderFrame: {
    width: '82%',
    alignSelf: 'center',
    minHeight: 66,
    marginBottom: 20,
    backgroundColor: '#4B2703',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  jackStoryHeaderTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryCarouselContent: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  jackStoryCardWrap: {
    paddingHorizontal: CARD_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryCardFrame: {
    width: CARD_WIDTH,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    padding: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  jackStoryCategoryTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  jackStoryQuestionCount: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 20,
  },
  jackStoryCharacterImage: {},
  jackStoryStartButtonWrap: {
    alignSelf: 'stretch',
    top: -30,
  },
  jackStoryStartButton: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
    width: '70%',
    alignSelf: 'center',
  },
  jackStoryStartButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
});
