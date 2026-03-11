import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const aboutGJackStory =
  'This is an application with character, where you will find stories from Jack, separate quizzes and interactive activities with words. In the section with stories you can simply read and immerse yourself in the atmosphere, and in the quizzes you can test your attentiveness and intelligence. A separate activity offers words with a missing first letter, where you need to choose the correct option from three. Everything is presented in a bright style to spend time interestingly and with a light mood.';

const AboutScrn = () => {
  const handleJckShare = async () => {
    try {
      await Share.share({
        message:
          'This is an application with character, where you will find stories from Jack, separate quizzes and interactive activities with words. In the section with stories you can simply read and immerse yourself in the atmosphere, and in the quizzes you can test your attentiveness and intelligence. A separate activity offers words with a missing first letter, where you need to choose the correct option from three. Everything is presented in a bright style to spend time interestingly and with a light mood.',
      });
    } catch (error) {
      console.log('error', error);
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
          <Text style={styles.jackStoryHeaderTitle}>ABOUT THE APP</Text>
        </View>

        <View style={styles.jackStoryPanelWrap}>
          <View style={styles.jackStoryTextFrame}>
            <View style={styles.jackStoryTextContainer}>
              <Text style={styles.jackStoryAboutText}>{aboutGJackStory}</Text>

              <Image
                source={require('../JackStoryAssets/images/detjcsk.png')}
                style={styles.jackStoryCharacterImage}
              />
            </View>
          </View>

          <PressableWithAnimation
            onPress={handleJckShare}
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

export default AboutScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 140,
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
  jackStoryTextFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    overflow: 'hidden',
  },
  jackStoryTextContainer: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 28,
  },
  jackStoryAboutText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 20,
  },
  jackStoryCharacterImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  jackStoryShareButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  jackStoryShareButton: {
    width: 170,
    height: 55,
    borderRadius: 10,
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
});
