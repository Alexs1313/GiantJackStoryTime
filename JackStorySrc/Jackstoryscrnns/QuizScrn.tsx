import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getStoryById } from '../Jackstorydta/storiesWithQuizzes';
import { useStore } from '../Jackstorystorr/settingsContext';

const QuizScrn = () => {
  const navigation = useNavigation();
  const { vibration } = useStore();
  const route = useRoute();
  const { storyId } = route.params ?? { storyId: '1' };

  const jackStoryStory = getStoryById(storyId);
  const jackStoryQuiz = jackStoryStory?.quiz ?? [];
  const jackStoryTotal = jackStoryQuiz.length;

  const [jackStoryCurrentIndex, setJackStoryCurrentIndex] = useState(0);
  const [jackStorySelectedIndex, setJackStorySelectedIndex] = useState<
    number | null
  >(null);
  const [jackStoryAnswers, setJackStoryAnswers] = useState<number[]>([]);

  const jackStoryQuestion = jackStoryQuiz[jackStoryCurrentIndex];
  const jackStoryIsLast = jackStoryCurrentIndex === jackStoryTotal - 1;
  const jackStoryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const jackStoryAdvance = () => {
    if (jackStorySelectedIndex === null) return;

    const jackStoryNewAnswers = [...jackStoryAnswers, jackStorySelectedIndex];
    setJackStoryAnswers(jackStoryNewAnswers);

    const jackStoryIsCorrect =
      jackStorySelectedIndex ===
      jackStoryQuiz[jackStoryCurrentIndex]?.correctIndex;

    if (!jackStoryIsCorrect && vibration) {
      Vibration.vibrate(120);
    }

    setJackStorySelectedIndex(null);

    if (jackStoryIsLast) {
      const jackStoryScore = jackStoryNewAnswers.filter(
        (answer, index) => answer === jackStoryQuiz[index]?.correctIndex,
      ).length;

      (navigation as any).navigate('QuizResultsScrn', {
        storyId: storyId,
        storyTitle: jackStoryStory?.title ?? 'Story',
        score: jackStoryScore,
        total: jackStoryTotal,
      });
    } else {
      setJackStoryCurrentIndex(index => index + 1);
    }
  };

  useEffect(() => {
    if (jackStorySelectedIndex === null) return;

    jackStoryTimerRef.current = setTimeout(jackStoryAdvance, 1500);

    return () => {
      if (jackStoryTimerRef.current) {
        clearTimeout(jackStoryTimerRef.current);
      }
    };
  }, [jackStorySelectedIndex]);

  if (!jackStoryStory || jackStoryTotal === 0) {
    return (
      <View style={styles.jackStoryCentered}>
        <Text style={styles.jackStoryErrorText}>No quiz for this story.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.jackStoryLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!jackStoryQuestion) {
    return null;
  }

  const jackStoryLetters = ['A', 'B', 'C'];

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.jackStoryImageBackground}
    >
      <ScrollView
        contentContainerStyle={styles.jackStoryScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.jackStoryHeaderFrame}>
          <TouchableOpacity
            style={styles.jackStoryBackBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>

          <Text style={styles.jackStoryHeaderTitle}>QUIZZES</Text>
        </View>

        <View style={styles.jackStoryPanelWrap}>
          <View style={styles.jackStoryQuizFrame}>
            <View style={styles.jackStoryQuizContent}>
              <Text style={styles.jackStoryCategoryTitle}>
                {jackStoryStory.title}
              </Text>

              <Text style={styles.jackStoryQuestionCounter}>
                Question {jackStoryCurrentIndex + 1}
              </Text>

              <Text style={styles.jackStoryQuestionText}>
                {jackStoryQuestion.question}
              </Text>

              {jackStoryQuestion.options.map((option, index) => {
                const jackStoryIsSelected = jackStorySelectedIndex === index;
                const jackStoryIsCorrect =
                  index === jackStoryQuestion.correctIndex;
                const jackStoryShowAsCorrect =
                  jackStoryIsSelected && jackStoryIsCorrect;
                const jackStoryShowAsWrong =
                  jackStoryIsSelected && !jackStoryIsCorrect;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() =>
                      jackStorySelectedIndex === null &&
                      setJackStorySelectedIndex(index)
                    }
                    disabled={jackStorySelectedIndex !== null}
                    style={[
                      styles.jackStoryOptionButton,
                      jackStoryShowAsCorrect &&
                        styles.jackStoryOptionButtonCorrect,
                      jackStoryShowAsWrong && styles.jackStoryOptionButtonWrong,
                    ]}
                  >
                    <Text style={styles.jackStoryOptionText}>
                      {jackStoryLetters[index]} {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <Image
          source={require('../JackStoryAssets/images/qjackk.png')}
          style={styles.jackStoryCharacterImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default QuizScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  jackStoryHeaderFrame: {
    width: '88%',
    alignSelf: 'center',
    minHeight: 66,
    marginBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryBackBtn: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  jackStoryHeaderTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryPanelWrap: {
    paddingHorizontal: 8,
  },
  jackStoryQuizFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  jackStoryQuizContent: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  jackStoryCategoryTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  jackStoryQuestionCounter: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 12,
    textAlign: 'center',
  },
  jackStoryQuestionText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  jackStoryOptionButton: {
    backgroundColor: '#7D5226',
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    alignItems: 'center',
  },
  jackStoryOptionButtonCorrect: {
    backgroundColor: '#349400',
  },
  jackStoryOptionButtonWrong: {
    backgroundColor: '#B40000',
  },
  jackStoryOptionText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-regular',
  },
  jackStorySaveButtonWrap: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  jackStorySaveButton: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  jackStorySaveButtonDisabled: {
    opacity: 0.5,
  },
  jackStorySaveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  jackStoryCharacterImage: {
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
  jackStoryCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  jackStoryErrorText: {
    fontSize: 16,
    marginBottom: 12,
  },
  jackStoryLink: {
    fontSize: 16,
    color: '#2d8cf0',
  },
});
