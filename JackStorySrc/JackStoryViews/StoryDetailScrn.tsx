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
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackList } from '../JackStoryRoutes/StackWays';

const defaultStory = {
  storyId: '1',
  title: 'Stone by the Old Trail',
  fullText:
    "I often walk old trails because they remember more than they seem. One day, almost at the very bend, I noticed a stone that was lying slightly out of place. It wasn't large, but something in its shape caught my eye—as if it had been waiting. I sat down beside it and listened. The trail had many stories, and the stone was ready to tell one.",
};

const StoryDetailScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackList, 'StoryDetailScrn'>>();
  const { storyId, title, fullText } = route.params ?? defaultStory;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${fullText}`,
        title,
      });
    } catch (_) {}
  };

  const handleQuiz = () => {
    navigation.navigate('QuizScrn', { storyId });
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
        <ImageBackground
          source={require('../JackStoryAssets/images/jackstoryheader.png')}
          style={styles.headerFrame}
          resizeMode="stretch"
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image
              source={require('../JackStoryAssets/images/jackstoryback.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>JACK'S STORIES</Text>
        </ImageBackground>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.storyFrame}
            resizeMode="stretch"
          >
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>{title}</Text>
              <Text style={styles.storyBody}>{fullText}</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleQuiz}
                style={styles.quizButtonWrap}
              >
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstorybutton.png')}
                  style={styles.quizButton}
                >
                  <Text style={styles.quizButtonText}>QUIZ</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleShare}
            style={styles.shareButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstoryshr.png')}
              style={styles.shareButton}
            >
              <Text style={styles.shareButtonText}>SHARE</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../JackStoryAssets/images/jackstoryreadmr.png')}
          style={styles.characterImage}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default StoryDetailScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  headerFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    minHeight: 82,
    marginBottom: 16,
  },
  backBtn: {
    position: 'absolute',
    left: 26,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  panelWrap: {
    flex: 1,
    paddingHorizontal: 8,
  },
  storyFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
  },
  storyContent: {
    padding: 24,
    paddingTop: 50,
    paddingHorizontal: 44,
    paddingBottom: 20,
  },
  storyTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  storyBody: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  quizButtonWrap: {
    alignSelf: 'center',
    top: 50,
    zIndex: 1,
  },
  quizButton: {
    width: 200,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },

  shareButtonWrap: {
    marginTop: 60,
  },
  shareButton: {
    width: 140,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  characterImage: {
    position: 'absolute',
    right: -35,
    bottom: 0,
  },
});
