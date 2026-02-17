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

const aboutGJackStory =
  "Giant Jack: Story Time is a cozy app with stories from Giant Jack, who shares strange, warm and a little funny tales from his world. You read stories, answer questions and gradually open new chapters for Jack's stones. There is also a separate activity for the company, where participants take turns calling out words for a given letter. The app plays cheerful music, and all data is stored only on your device. This is a space for stories, time together and a light mood.";

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
      source={require('../JackStoryAssets/images/jackstorybg_image.png')}
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
          <Text style={styles.headerTitle}>ABOUT THE APP</Text>
        </ImageBackground>

        <View style={styles.contentWrap}>
          <Image
            source={require('../JackStoryAssets/images/jackstoryicon.png')}
            style={styles.characterImage}
          />

          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.textFrame}
            resizeMode="stretch"
          >
            <View style={styles.textContainer}>
              <Text style={styles.aboutText}>{aboutGJackStory}</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleJckShare}
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
          </ImageBackground>
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
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  headerFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    minHeight: 82,
    marginBottom: 20,
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
  contentWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  characterImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
    overflow: 'hidden',
  },
  textFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 370,
  },
  textContainer: {
    padding: 44,
    paddingTop: 58,
    paddingHorizontal: 38,
    paddingBottom: 80,
  },
  aboutText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  shareButtonWrap: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
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
});
