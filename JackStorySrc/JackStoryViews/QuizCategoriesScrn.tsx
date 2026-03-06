import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import { STORIES_WITH_QUIZZES } from '../JackStoryData/storiesWithQuizzes';

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
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const paddingHorizontal = Math.max(0, screenWidth / 2 - itemWidth / 2);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: initialScrollX, animated: false });
  }, [screenWidth, initialScrollX]);

  const startQuiz = (storyId: string) => {
    const root = navigation.getParent();
    (root as any)?.navigate('QuizScrn', { storyId });
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerFrame}>
          <Text style={styles.headerTitle}>QUIZZES</Text>
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
            styles.carouselContent,
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
                  styles.cardWrap,
                  {
                    width: itemWidth,
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <View style={styles.cardFrame}>
                  <Text style={styles.categoryTitle}>{story.title}</Text>
                  <Text style={styles.questionCount}>
                    Questions: {story.quiz.length}
                  </Text>
                  <Image
                    source={require('../JackStoryAssets/images/qjackk.png')}
                    style={styles.characterImage}
                  />
                </View>
                <PressableWithAnimation
                  onPress={() => startQuiz(story.id)}
                  style={styles.startButtonWrap}
                >
                  <LinearGradient
                    colors={['#200653', '#460CB9']}
                    style={styles.startButton}
                  >
                    <Text style={styles.startButtonText}>START</Text>
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
  imageBackground: {
    flex: 1,
  },
  headerFrame: {
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
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  carouselContent: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardWrap: {
    paddingHorizontal: CARD_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFrame: {
    width: CARD_WIDTH,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    padding: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  questionCount: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 20,
  },
  characterImage: {},
  startButtonWrap: {
    alignSelf: 'stretch',
    top: -30,
  },
  startButton: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
    width: '70%',
    alignSelf: 'center',
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
});
