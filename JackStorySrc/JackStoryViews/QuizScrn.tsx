import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
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

  const handleSave = () => {
    if (selectedIndex === null) return;
    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);
    setSelectedIndex(null);
    if (isLast) {
      const score = newAnswers.filter(
        (a, i) => a === quiz[i].correctIndex,
      ).length;
      navigation.navigate('QuizResultsScrn', {
        storyId,
        storyTitle: story?.title ?? 'Story',
        score,
        total,
      });
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

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

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.replace('DashScrn' as never)}
            activeOpacity={0.9}
          >
            <Image
              source={require('../JackStoryAssets/images/jackstoryhm.png')}
            />
          </TouchableOpacity>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorysmhead.png')}
            style={styles.headerBanner}
            resizeMode="stretch"
          >
            <Text style={styles.headerTitle}>QUIZ</Text>
          </ImageBackground>
        </View>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.quizFrame}
            resizeMode="stretch"
          >
            <View style={styles.quizContent}>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.questionCounter}>
                QUESTION {currentIndex + 1}/{total}
              </Text>
              <Text style={styles.questionText}>{question.question}</Text>
              {question.options.map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionRow,
                    selectedIndex === idx && styles.optionRowSelected,
                  ]}
                  onPress={() => setSelectedIndex(idx)}
                  activeOpacity={0.8}
                >
                  <View style={styles.checkbox}>
                    {selectedIndex === idx ? (
                      <Image
                        source={require('../JackStoryAssets/images/jackstorychk.png')}
                      />
                    ) : null}
                  </View>
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSave}
                disabled={selectedIndex === null}
                style={styles.saveButtonWrap}
              >
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstorybutton.png')}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <Image
          source={require('../JackStoryAssets/images/jackstoryquizin.png')}
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
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  homeButton: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  homeIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerBanner: {
    width: 170,
    minHeight: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
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
  },
  quizContent: {
    padding: 14,
    paddingTop: 30,
    paddingHorizontal: 45,
  },
  storyTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 8,
    marginTop: 30,
    textAlign: 'center',
  },
  questionCounter: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 7,
    padding: 8,
    marginBottom: 10,
  },
  optionRowSelected: {
    backgroundColor: 'transparent',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 7,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-regular',
  },
  saveButtonWrap: {
    alignSelf: 'center',
    marginTop: 20,
    top: 40,
    zIndex: 1,
  },
  saveButton: {
    width: 200,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  characterWrap: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 8,
  },
  characterImage: {
    position: 'absolute',
    right: -35,
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
