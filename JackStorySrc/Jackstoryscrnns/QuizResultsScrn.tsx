import { addCrystalsAndCompleteStory } from '../Jackstorystorr/progressStorage';
import LinearGradient from 'react-native-linear-gradient';

import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

const QuizResultsScrn = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { storyId, storyTitle, score, total } = route.params ?? {
    storyId: '1',
    storyTitle: 'Stone by the Old Trail',
    score: 5,
    total: 5,
  };

  const passed = score === total;

  useEffect(() => {
    if (passed && storyId) {
      addCrystalsAndCompleteStory(storyId);
    }
  }, [passed, storyId]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${total} in "${storyTitle}" quiz!`,
        title: 'Quiz result',
      });
    } catch (_) {}
  };

  const jackStoryHandleRestart = () => {
    (navigation as any).replace('QuizScrn', { storyId });
  };

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
            onPress={() =>
              navigation.navigate('TabWays', {
                screen: 'QuizCategoriesScrn',
              } as never)
            }
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>

          <Text style={styles.jackStoryHeaderTitle}>QUIZ RESULT</Text>
        </View>

        <View style={styles.jackStoryResultFrame}>
          <View style={styles.jackStoryResultContent}>
            <Text style={styles.jackStoryResultTitle}>
              {passed ? 'Quiz successfully passed!' : 'Quiz completed'}
            </Text>

            <Text style={styles.jackStoryCategoryName}>{storyTitle}</Text>

            <Text style={styles.jackStoryScoreLine}>
              Correct answers:{' '}
              <Text style={styles.jackStoryScoreHighlight}>
                {score} out of {total}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.jackStoryButtonsColumn}>
          <PressableWithAnimation
            onPress={handleShare}
            style={styles.jackStoryShareButtonWrap}
          >
            <LinearGradient
              colors={['#C724B1', '#E91E8C']}
              style={styles.jackStoryShareButton}
            >
              <Text style={styles.jackStoryButtonText}>SHARE</Text>
            </LinearGradient>
          </PressableWithAnimation>

          <PressableWithAnimation
            onPress={jackStoryHandleRestart}
            style={styles.jackStoryRestartButtonWrap}
          >
            <LinearGradient
              colors={['#200653', '#460CB9']}
              style={styles.jackStoryRestartButton}
            >
              <Text style={styles.jackStoryButtonText}>RESTART</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>

        <Image
          source={require('../JackStoryAssets/images/jackstorretsim.png')}
          style={styles.jackStoryCharacterImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default QuizResultsScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  jackStoryHeaderFrame: {
    width: '88%',
    alignSelf: 'center',
    minHeight: 66,
    marginBottom: 30,
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
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryResultFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 24,
    overflow: 'hidden',
    paddingBottom: 38,
  },
  jackStoryResultContent: {
    padding: 28,
    paddingHorizontal: 28,
  },
  jackStoryResultTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  jackStoryCategoryName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  jackStoryScoreLine: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
  },
  jackStoryScoreHighlight: {
    fontFamily: 'kefa-bold',
    color: '#FFB74D',
  },
  jackStoryButtonsColumn: {
    alignItems: 'center',
    gap: 16,
  },
  jackStoryShareButtonWrap: {
    alignSelf: 'center',
    top: -50,
  },
  jackStoryShareButton: {
    width: 167,
    height: 55,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  jackStoryRestartButtonWrap: {
    alignSelf: 'center',
    top: -50,
  },
  jackStoryRestartButton: {
    width: 175,
    height: 55,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  jackStoryButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryCharacterImage: {
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
});
