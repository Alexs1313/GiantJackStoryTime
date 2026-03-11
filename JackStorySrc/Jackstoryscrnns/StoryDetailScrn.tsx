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

import LinearGradient from 'react-native-linear-gradient';
import { markStoryAsRead } from '../Jackstorystorr/progressStorage';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const defaultStory = {
  storyId: '1',
  title: 'Stone by the Old Trail',
  fullText:
    "I often walk old trails because they remember more than they seem. One day, almost at the very bend, I noticed a stone that was lying slightly out of place. It wasn't large, but something in its shape caught my eye—as if it had been waiting. I sat down beside it and listened. The trail had many stories, and the stone was ready to tell one.",
};

const StoryDetailScrn = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { storyId, title, fullText } = route.params ?? defaultStory;

  useEffect(() => {
    markStoryAsRead(storyId);
  }, [storyId]);

  const handleJackStoryShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${fullText}`,
        title,
      });
    } catch (_) {
      console.log('error');
    }
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
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>

          <Text style={styles.jackStoryHeaderTitle}>JACK'S STORIES</Text>
        </View>

        <View style={styles.jackStoryPanelWrap}>
          <View style={styles.jackStoryStoryFrame}>
            <View style={styles.jackStoryStoryContent}>
              <Text style={styles.jackStoryStoryTitle}>{title}</Text>

              <Text style={styles.jackStoryStoryBody}>{fullText}</Text>

              <Image
                source={require('../JackStoryAssets/images/detjcsk.png')}
                style={styles.jackStoryCharacterImage}
              />
            </View>
          </View>

          <PressableWithAnimation
            onPress={handleJackStoryShare}
            style={styles.jackStoryShareButtonWrap}
          >
            <LinearGradient
              colors={['#73006C', '#D900CB']}
              style={styles.jackStoryShareButton}
            >
              <Text style={styles.jackStoryShareButtonText}>SHARE</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default StoryDetailScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  jackStoryHeaderFrame: {
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
  jackStoryBackBtn: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  jackStoryHeaderTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryPanelWrap: {
    flex: 1,
    paddingHorizontal: 8,
  },
  jackStoryStoryFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  jackStoryStoryContent: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 134,
  },
  jackStoryStoryTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  jackStoryStoryBody: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'left',
    lineHeight: 22,
    paddingHorizontal: 4,
  },
  jackStoryQuizButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryShareButtonWrap: {
    alignSelf: 'center',
    marginTop: 24,
    top: -55,
  },
  jackStoryShareButton: {
    width: 170,
    height: 55,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#fff',
  },
  jackStoryShareButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryCharacterImage: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
