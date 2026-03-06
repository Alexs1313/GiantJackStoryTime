import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import {
  getWordWithOptions,
  type WordWithOptions,
} from '../JackStoryData/guessTheLetterWords';
import { getLetterImage } from '../JackStoryData/teamActivityLetters';

const TeamActivityGuessScrn = () => {
  const navigation = useNavigation();

  const [word, setWord] = useState<WordWithOptions>(getWordWithOptions);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { height } = useWindowDimensions();

  const liftAnims = useRef(
    [0, 1, 2].map(() => new Animated.Value(0)),
  ).current;

  const nextWord = useCallback(() => {
    liftAnims.forEach(a => a.setValue(0));
    setWord(getWordWithOptions());
    setSelectedIndex(null);
  }, [liftAnims]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const t = setTimeout(nextWord, 1500);
    return () => clearTimeout(t);
  }, [selectedIndex, nextWord]);

  const handleLetterPress = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    const correct = index === word.correctIndex;
    if (correct) setCorrectCount(c => c + 1);
    else setIncorrectCount(c => c + 1);
    Animated.timing(liftAnims[index], {
      toValue: -50,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const handleResults = () => {
    (navigation as any).replace('TeamActivityResultsScrn', {
      players: ['You'],
      scores: [{ correct: correctCount, incorrect: incorrectCount }],
    });
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <View style={styles.scrollContent}>
        <View style={styles.headerFrame}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GUESS THE LETTER</Text>
        </View>

        <View
          style={[
            styles.wordFrame,
            { marginTop: height * 0.07, marginBottom: height * 0.1 },
          ]}
        >
          <Text style={styles.wordText}>{word.wordDisplay}</Text>
        </View>

        <View style={styles.lettersRow}>
          {word.options.map((letter, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === word.correctIndex;
            const showGreen = isSelected && isCorrect;
            const showRed = isSelected && !isCorrect;
            const img = getLetterImage(letter);
            return (
              <Animated.View
                key={idx}
                style={[
                  styles.letterBtn,
                  showGreen && styles.letterBtnCorrect,
                  showRed && styles.letterBtnWrong,
                  { transform: [{ translateY: liftAnims[idx] }] },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleLetterPress(idx)}
                  disabled={selectedIndex !== null}
                  style={styles.letterBtnInner}
                >
                  {img ? (
                    <Image
                      source={img}
                      style={styles.letterImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.letterChar}>{letter}</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <PressableWithAnimation onPress={handleResults} style={styles.resultsWrap}>
          <LinearGradient
            colors={['#200653', '#460CB9']}
            style={styles.resultsButton}
          >
            <Text style={styles.resultsText}>RESULTS</Text>
          </LinearGradient>
        </PressableWithAnimation>
      </View>
    </ImageBackground>
  );
};

export default TeamActivityGuessScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerFrame: {
    width: '88%',
    alignSelf: 'center',
    minHeight: 66,
    marginBottom: 24,
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
  wordFrame: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textTransform: 'lowercase',
  },
  lettersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  letterBtn: {
    width: 110,
    height: 118,
    borderRadius: 9,
    backgroundColor: '#200653',
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBtnCorrect: {
    backgroundColor: '#349400',
    bottom: 10,
  },
  letterBtnWrong: {
    backgroundColor: '#B40000',
    bottom: 10,
  },
  letterBtnInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterImg: {
    width: 70,
    height: 76,
  },
  letterChar: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  resultsWrap: {
    alignSelf: 'center',
    marginTop: 40,
  },
  resultsButton: {
    width: 231,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
