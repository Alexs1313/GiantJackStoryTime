import { getLetterImage } from '../Jackstorydta/teamActivityLetters';
import { useStore } from '../Jackstorystorr/settingsContext';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Vibration,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';

import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import {
  getWordWithOptions,
  type WordWithOptions,
} from '../Jackstorydta/guessTheLetterWords';

const TeamActivityGuessScrn = () => {
  const navigation = useNavigation();
  const { vibration } = useStore();

  const [jackStoryWord, setJackStoryWord] =
    useState<WordWithOptions>(getWordWithOptions);
  const [jackStoryCorrectCount, setJackStoryCorrectCount] = useState(0);
  const [jackStoryIncorrectCount, setJackStoryIncorrectCount] = useState(0);
  const [jackStorySelectedIndex, setJackStorySelectedIndex] = useState<
    number | null
  >(null);
  const { height: jackStoryHeight } = useWindowDimensions();

  const jackStoryLiftAnims = useRef(
    [0, 1, 2].map(() => new Animated.Value(0)),
  ).current;

  const handleJackStoryNextWord = useCallback(() => {
    jackStoryLiftAnims.forEach(jackStoryAnim => jackStoryAnim.setValue(0));
    setJackStoryWord(getWordWithOptions());
    setJackStorySelectedIndex(null);
  }, [jackStoryLiftAnims]);

  useEffect(() => {
    if (jackStorySelectedIndex === null) return;
    const jackStoryTimeout = setTimeout(handleJackStoryNextWord, 1500);
    return () => clearTimeout(jackStoryTimeout);
  }, [jackStorySelectedIndex, handleJackStoryNextWord]);

  const handleJackStoryLetterPress = (jackStoryIndex: number) => {
    if (jackStorySelectedIndex !== null) return;

    setJackStorySelectedIndex(jackStoryIndex);

    const jackStoryCorrect = jackStoryIndex === jackStoryWord.correctIndex;

    if (jackStoryCorrect) {
      setJackStoryCorrectCount(jackStoryCount => jackStoryCount + 1);
    } else {
      setJackStoryIncorrectCount(jackStoryCount => jackStoryCount + 1);
      if (vibration) {
        Vibration.vibrate(120);
      }
    }

    Animated.timing(jackStoryLiftAnims[jackStoryIndex], {
      toValue: -50,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const handleJackStoryResults = () => {
    (navigation as any).replace('TeamActivityResultsScrn', {
      players: ['You'],
      scores: [
        {
          correct: jackStoryCorrectCount,
          incorrect: jackStoryIncorrectCount,
        },
      ],
    });
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.jackStoryImageBackground}
    >
      <View style={styles.jackStoryScrollContent}>
        <View style={styles.jackStoryHeaderFrame}>
          <TouchableOpacity
            style={styles.jackStoryBackBtn}
            onPress={() =>
              navigation.navigate('TabWays', {
                screen: 'TeamActivityRulesScrn',
              } as never)
            }
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>

          <Text style={styles.jackStoryHeaderTitle}>GUESS THE LETTER</Text>
        </View>

        <View
          style={[
            styles.jackStoryWordFrame,
            {
              marginTop: jackStoryHeight * 0.07,
              marginBottom: jackStoryHeight * 0.1,
            },
          ]}
        >
          <Text style={styles.jackStoryWordText}>
            {jackStoryWord.wordDisplay}
          </Text>
        </View>

        <View style={styles.jackStoryLettersRow}>
          {jackStoryWord.options.map((jackStoryLetter, jackStoryIndex) => {
            const jackStoryIsSelected =
              jackStorySelectedIndex === jackStoryIndex;
            const jackStoryIsCorrect =
              jackStoryIndex === jackStoryWord.correctIndex;
            const jackStoryShowGreen =
              jackStoryIsSelected && jackStoryIsCorrect;
            const jackStoryShowRed = jackStoryIsSelected && !jackStoryIsCorrect;
            const jackStoryImg = getLetterImage(jackStoryLetter);

            return (
              <Animated.View
                key={jackStoryIndex}
                style={[
                  styles.jackStoryLetterBtn,
                  jackStoryShowGreen && styles.jackStoryLetterBtnCorrect,
                  jackStoryShowRed && styles.jackStoryLetterBtnWrong,
                  {
                    transform: [
                      { translateY: jackStoryLiftAnims[jackStoryIndex] },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleJackStoryLetterPress(jackStoryIndex)}
                  disabled={jackStorySelectedIndex !== null}
                  style={styles.jackStoryLetterBtnInner}
                >
                  {jackStoryImg ? (
                    <Image
                      source={jackStoryImg}
                      style={styles.jackStoryLetterImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.jackStoryLetterChar}>
                      {jackStoryLetter}
                    </Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <PressableWithAnimation
          onPress={handleJackStoryResults}
          style={styles.jackStoryResultsWrap}
        >
          <LinearGradient
            colors={['#200653', '#460CB9']}
            style={styles.jackStoryResultsButton}
          >
            <Text style={styles.jackStoryResultsText}>RESULTS</Text>
          </LinearGradient>
        </PressableWithAnimation>
      </View>
    </ImageBackground>
  );
};

export default TeamActivityGuessScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  jackStoryHeaderFrame: {
    width: '92%',
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
  jackStoryBackBtn: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  jackStoryHeaderTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryWordFrame: {
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
  jackStoryWordText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textTransform: 'lowercase',
  },
  jackStoryLettersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  jackStoryLetterBtn: {
    width: 110,
    height: 118,
    borderRadius: 9,
    backgroundColor: '#200653',
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryLetterBtnCorrect: {
    backgroundColor: '#349400',
    bottom: 10,
  },
  jackStoryLetterBtnWrong: {
    backgroundColor: '#B40000',
    bottom: 10,
  },
  jackStoryLetterBtnInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryLetterImg: {
    width: 70,
    height: 76,
  },
  jackStoryLetterChar: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  jackStoryResultsWrap: {
    alignSelf: 'center',
    marginTop: 40,
  },
  jackStoryResultsButton: {
    width: 231,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryResultsText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
