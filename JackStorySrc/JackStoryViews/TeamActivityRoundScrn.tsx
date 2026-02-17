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
import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  getRandomLetter,
  getLetterImage,
} from '../JackStoryData/teamActivityLetters';
import { useStore } from '../JackStoryStorage/settingsContext';

const TIMER_SECONDS = 5;
const PLAYER_COLORS = [
  '#FFC3C3',
  '#FBC698',
  '#FBEC98',
  '#D9FB98',
  '#98FBE8',
  '#e0c3fc',
];

type RoundParams = {
  rounds: number;
  players: string[];
  roundIndex: number;
  playerIndex: number;
  scores: { correct: number; incorrect: number }[];
};

const TeamActivityRoundScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RoundParams>, string>>();
  const params = route.params as RoundParams;

  const { rounds, players, roundIndex, playerIndex, scores } = params ?? {
    rounds: 5,
    players: ['Player 1', 'Player 2'],
    roundIndex: 0,
    playerIndex: 0,
    scores: [
      { correct: 0, incorrect: 0 },
      { correct: 0, incorrect: 0 },
    ],
  };

  const [letter] = useState(() => getRandomLetter());
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answered, setAnswered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { vibration } = useStore();
  const currentPlayer = players[playerIndex];

  useEffect(() => {
    if (answered) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => handleAnswer(false), 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered]);

  const handleAnswer = (correct: boolean) => {
    if (answered) return;

    if (vibration) {
      Vibration.vibrate(200);
    }
    setAnswered(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const newScores = scores.map((s, i) =>
      i === playerIndex
        ? correct
          ? { ...s, correct: s.correct + 1 }
          : { ...s, incorrect: s.incorrect + 1 }
        : s,
    );

    const nextPlayerIndex = playerIndex + 1;
    const nextRoundIndex =
      nextPlayerIndex >= players.length ? roundIndex + 1 : roundIndex;
    const nextPlayer = nextPlayerIndex >= players.length ? 0 : nextPlayerIndex;

    if (nextRoundIndex >= rounds) {
      navigation.replace(
        'TeamActivityResultsScrn' as never,
        {
          players,
          scores: newScores,
        } as never,
      );
    } else {
      navigation.replace(
        'TeamActivityRoundScrn' as never,
        {
          rounds,
          players,
          roundIndex: nextRoundIndex,
          playerIndex: nextPlayer,
          scores: newScores,
        } as never,
      );
    }
  };

  const handleFinish = () => {
    navigation.replace(
      'TeamActivityResultsScrn' as never,
      {
        players,
        scores,
      } as never,
    );
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
            <Text style={styles.headerTitle}>ROUND {roundIndex + 1}</Text>
          </ImageBackground>
        </View>

        <View
          style={[
            styles.playerBadge,
            {
              backgroundColor:
                PLAYER_COLORS[playerIndex % PLAYER_COLORS.length],
            },
          ]}
        >
          <Text style={styles.playerName}>{currentPlayer}</Text>
        </View>

        <View style={styles.timerWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstortmr.png')}
            style={styles.timerCircle}
            resizeMode="stretch"
          >
            <Text style={styles.timerText}>{timeLeft} S</Text>
          </ImageBackground>
        </View>

        <View style={styles.letterWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorlettfr.png')}
            style={styles.letterFrame}
            resizeMode="stretch"
          >
            {getLetterImage(letter) ? (
              <Image
                source={getLetterImage(letter)!}
                style={styles.letterImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.letterText}>{letter}</Text>
            )}
          </ImageBackground>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleAnswer(true)}
            disabled={answered}
            style={styles.doneButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstdn.png')}
              style={[styles.actionButton, styles.doneButton]}
            >
              <Text style={styles.buttonText}>DONE</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleAnswer(false)}
            disabled={answered}
            style={styles.notDoneButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstnotdn.png')}
              style={[styles.actionButton, styles.notDoneButton]}
            >
              <Text style={styles.buttonText}>NOT DONE</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleFinish}
          style={styles.finishWrap}
        >
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
            style={styles.finishButton}
          >
            <Text style={styles.buttonText}>FINISH ACTIVITY</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityRoundScrn;

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
    marginBottom: 12,
  },
  homeButton: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
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
  playerBadge: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 16,
    minWidth: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  timerWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerCircle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  timerText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  letterWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  letterFrame: {
    width: 292,
    height: 268,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterImage: {
    width: 95,
    height: 113,
  },
  letterText: {
    fontSize: 80,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  doneButtonWrap: {
    // ...
  },
  notDoneButtonWrap: {
    // ...
  },
  actionButton: {
    width: 140,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    opacity: 1,
  },
  notDoneButton: {
    opacity: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  finishWrap: {
    alignSelf: 'center',
  },
  finishButton: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
