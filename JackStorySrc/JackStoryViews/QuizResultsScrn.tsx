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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackList } from '../JackStoryRoutes/StackWays';
import { addCrystalsAndCompleteStory } from '../JackStoryStorage/progressStorage';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const QuizResultsScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackList, 'QuizResultsScrn'>>();
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

  const handleRestart = () => {
    (navigation as any).replace('QuizScrn', { storyId });
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
        <View style={styles.headerFrame}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() =>
              navigation.navigate('TabWays', {
                screen: 'QuizCategoriesScrn',
              } as never)
            }
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QUIZ RESULT</Text>
        </View>

        <View style={styles.resultFrame}>
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>
              {passed ? 'Quiz successfully passed!' : 'Quiz completed'}
            </Text>
            <Text style={styles.categoryName}>{storyTitle}</Text>
            <Text style={styles.scoreLine}>
              Correct answers:{' '}
              <Text style={styles.scoreHighlight}>
                {score} out of {total}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.buttonsColumn}>
          <PressableWithAnimation
            onPress={handleShare}
            style={styles.shareButtonWrap}
          >
            <LinearGradient
              colors={['#C724B1', '#E91E8C']}
              style={styles.shareButton}
            >
              <Text style={styles.buttonText}>SHARE</Text>
            </LinearGradient>
          </PressableWithAnimation>
          <PressableWithAnimation
            onPress={handleRestart}
            style={styles.restartButtonWrap}
          >
            <LinearGradient
              colors={['#200653', '#460CB9']}
              style={styles.restartButton}
            >
              <Text style={styles.buttonText}>RESTART</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>

        <Image
          source={require('../JackStoryAssets/images/jackstorretsim.png')}
          style={styles.characterImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default QuizResultsScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  headerFrame: {
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
  resultFrame: {
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
  resultContent: {
    padding: 28,
    paddingHorizontal: 28,
  },
  resultTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  scoreLine: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
  },
  scoreHighlight: {
    fontFamily: 'kefa-bold',
    color: '#FFB74D',
  },
  buttonsColumn: {
    alignItems: 'center',
    gap: 16,
  },
  shareButtonWrap: {
    alignSelf: 'center',
    top: -50,
  },
  shareButton: {
    width: 167,
    height: 55,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  restartButtonWrap: {
    alignSelf: 'center',
    top: -50,
  },
  restartButton: {
    width: 175,
    height: 55,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  characterImage: {
    position: 'absolute',
    right: -20,
    bottom: 0,
  },
});
