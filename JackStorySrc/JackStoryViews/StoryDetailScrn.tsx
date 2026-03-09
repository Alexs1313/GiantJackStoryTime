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
import LinearGradient from 'react-native-linear-gradient';
import { markStoryAsRead } from '../JackStoryStorage/progressStorage';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

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

  useEffect(() => {
    markStoryAsRead(storyId);
  }, [storyId]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${fullText}`,
        title,
      });
    } catch (_) {}
  };

  const handleQuiz = () => {
    (navigation as any).navigate('QuizScrn', { storyId });
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
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>JACK'S STORIES</Text>
        </View>

        <View style={styles.panelWrap}>
          <View style={styles.storyFrame}>
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>{title}</Text>
              <Text style={styles.storyBody}>{fullText}</Text>
              <Image
                source={require('../JackStoryAssets/images/detjcsk.png')}
                style={styles.characterImage}
              />
            </View>
          </View>
          <PressableWithAnimation
            onPress={handleShare}
            style={styles.shareButtonWrap}
          >
            <LinearGradient
              colors={['#73006C', '#D900CB']}
              style={styles.shareButton}
            >
              <Text style={styles.shareButtonText}>SHARE</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>
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
    fontSize: 20,
    color: '#fff',
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
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  storyContent: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 134,
  },
  storyTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  storyBody: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'left',
    lineHeight: 22,
    paddingHorizontal: 4,
  },

  quizButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  shareButtonWrap: {
    alignSelf: 'center',
    marginTop: 24,
    top: -55,
  },
  shareButton: {
    width: 170,
    height: 55,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  shareButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  characterImage: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
