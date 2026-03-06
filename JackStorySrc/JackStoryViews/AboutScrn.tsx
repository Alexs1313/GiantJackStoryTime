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
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const aboutGJackStory =
  'This is an application with character, where you will find stories from Jack, separate quizzes and interactive activities with words. In the section with stories you can simply read and immerse yourself in the atmosphere, and in the quizzes you can test your attentiveness and intelligence. A separate activity offers words with a missing first letter, where you need to choose the correct option from three. Everything is presented in a bright style to spend time interestingly and with a light mood.';

const AboutScrn = () => {
  const navigation = useNavigation();

  const handleJckShare = async () => {
    try {
      await Share.share({
        message: 'Giant Jack: Story Time — cozy stories and activities',
        title: 'Giant Jack: Story Time',
      });
    } catch (error) {
      console.log('error', error);
    }
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
          <Text style={styles.headerTitle}>ABOUT THE APP</Text>
        </View>

        <View style={styles.panelWrap}>
          <View style={styles.textFrame}>
            <View style={styles.textContainer}>
              <Text style={styles.aboutText}>{aboutGJackStory}</Text>
              <Image
                source={require('../JackStoryAssets/images/detjcsk.png')}
                style={styles.characterImage}
              />
            </View>
          </View>
          <PressableWithAnimation
            onPress={handleJckShare}
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

export default AboutScrn;

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
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  panelWrap: {
    flex: 1,
    paddingHorizontal: 8,
  },
  textFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    overflow: 'hidden',
  },
  textContainer: {
    padding: 24,
    paddingTop: 28,
    paddingHorizontal: 28,
  },
  aboutText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 20,
  },
  characterImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  shareButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  shareButton: {
    width: 170,
    height: 55,
    borderRadius: 10,
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
});
