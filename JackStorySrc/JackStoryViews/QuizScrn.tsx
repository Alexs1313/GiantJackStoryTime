import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackList } from '../JackStoryRoutes/StackWays';
import { getStoryById } from '../JackStoryData/storiesWithQuizzes';

const QuizScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackList, 'QuizScrn'>>();
  const { storyId } = route.params ?? { storyId: '1' };

  const story = getStoryById(storyId);
  const quiz = story?.quiz ?? [];
  const total = quiz.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quiz[currentIndex];
  const isLast = currentIndex === total - 1;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    if (selectedIndex === null) return;
    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);
    setSelectedIndex(null);
    if (isLast) {
      const score = newAnswers.filter(
        (a, i) => a === quiz[i]?.correctIndex,
      ).length;
      (navigation as any).navigate('QuizResultsScrn', {
        storyId,
        storyTitle: story?.title ?? 'Story',
        score,
        total,
      });
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    timerRef.current = setTimeout(advance, 1500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedIndex]);

  if (!story || total === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No quiz for this story.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!question) {
    return null;
  }

  const letters = ['A', 'B', 'C'];

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerFrame}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QUIZZES</Text>
        </View>

        <View style={styles.panelWrap}>
          <View style={styles.quizFrame}>
            <View style={styles.quizContent}>
              <Text style={styles.categoryTitle}>{story.title}</Text>
              <Text style={styles.questionCounter}>
                Question {currentIndex + 1}
              </Text>
              <Text style={styles.questionText}>{question.question}</Text>
              {question.options.map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = idx === question.correctIndex;
                const showAsCorrect = isSelected && isCorrect;
                const showAsWrong = isSelected && !isCorrect;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() =>
                      selectedIndex === null && setSelectedIndex(idx)
                    }
                    disabled={selectedIndex !== null}
                    style={[
                      styles.optionButton,
                      showAsCorrect && styles.optionButtonCorrect,
                      showAsWrong && styles.optionButtonWrong,
                    ]}
                  >
                    <Text style={styles.optionText}>
                      {letters[idx]}) {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <Image
          source={require('../JackStoryAssets/images/qjackk.png')}
          style={styles.characterImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default QuizScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  headerFrame: {
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
  backBtn: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  panelWrap: {
    paddingHorizontal: 8,
  },
  quizFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  quizContent: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  categoryTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  questionCounter: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 12,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#7D5226',
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionButtonCorrect: {
    backgroundColor: '#349400',
  },
  optionButtonWrong: {
    backgroundColor: '#B40000',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-regular',
  },
  saveButtonWrap: {
    marginTop: 24,
    alignSelf: 'stretch',
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  characterImage: {
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    color: '#2d8cf0',
  },
});
