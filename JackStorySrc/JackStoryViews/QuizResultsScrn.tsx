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

const SUCCESS_MESSAGE =
  "You passed the quiz with flying colors!\nI'm glad you read my story carefully\nand answered my questions correctly!\nSo you can exchange the stones for a\nnew story!";

const FAIL_MESSAGE =
  "Unfortunately, you didn't answer all the questions correctly. In order to unlock a new story, you need to pass the current quiz. Don't be discouraged, you have an infinite number of attempts!";

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
        message: `I scored ${score}/${total} on the quiz for "${storyTitle}" in Giant Jack: Story Time!`,
        title: 'Quiz result',
      });
    } catch (_) {}
  };

  const handleRetry = () => {
    navigation.navigate('QuizScrn', { storyId });
  };

  const handleStories = () => {
    navigation.replace('JackStoriesScrn');
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
            onPress={() => navigation.navigate('DashScrn' as never)}
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
            <Text style={styles.headerTitle}>RESULTS</Text>
          </ImageBackground>
        </View>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.resultFrame}
            resizeMode="stretch"
          >
            <View style={styles.resultContent}>
              <Text style={styles.storyTitle}>{storyTitle}</Text>
              <Text style={styles.scoreText}>
                {score}/{total}
              </Text>
              <Text style={styles.messageText}>
                {passed ? SUCCESS_MESSAGE : FAIL_MESSAGE}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.buttonsRow}>
          {passed ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleShare}
              style={styles.shareButtonWrap}
            >
              <ImageBackground
                source={require('../JackStoryAssets/images/jackstoryshr.png')}
                style={styles.shareButton}
              >
                <Text style={styles.buttonText}>SHARE</Text>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleRetry}
              style={styles.retryButtonWrap}
            >
              <ImageBackground
                source={require('../JackStoryAssets/images/jackstorretry.png')}
                style={styles.retryButton}
              >
                <Text style={styles.buttonText}>RETRY</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleStories}
            style={styles.storiesButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
              style={styles.storiesButton}
            >
              <Text style={styles.buttonText}>STORIES</Text>
            </ImageBackground>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  resultFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
  },
  resultContent: {
    paddingTop: 40,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  storyTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonWrap: {
    marginHorizontal: 6,
    marginBottom: 12,
    zIndex: 2,
  },
  shareButton: {
    width: 140,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonWrap: {
    marginHorizontal: 6,
    marginBottom: 12,
    zIndex: 2,
  },
  retryButton: {
    width: 140,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesButtonWrap: {
    marginHorizontal: 6,
    marginBottom: 12,
    zIndex: 2,
  },
  storiesButton: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  characterWrap: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 16,
  },
  characterImage: {
    position: 'absolute',
    right: -35,
    bottom: 0,
  },
});
