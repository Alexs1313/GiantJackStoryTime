import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const JackIntroduceScrn = () => {
  const [nextJckIdx, setNextJckIdx] = useState(0);
  const navigation = useNavigation();

  const handleNextJck = () => {
    nextJckIdx < 2
      ? setNextJckIdx(nextJckIdx + 1)
      : navigation.navigate('DashScrn' as never);
  };

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorybg_image.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.jckMainWrap}>
          {nextJckIdx === 0 ? (
            <Image
              source={require('../JackStoryAssets/images/jackstoryonb1.png')}
              style={{ top: 10 }}
            />
          ) : nextJckIdx === 1 ? (
            <Image
              source={require('../JackStoryAssets/images/jackstoryonb2.png')}
              style={{ top: 10 }}
            />
          ) : (
            <Image
              source={require('../JackStoryAssets/images/jackstoryonb3.png')}
            />
          )}

          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.jackFrameContainer}
            resizeMode="stretch"
          >
            <View style={styles.textContainer}>
              <Text style={styles.jackStoryTtl}>
                {nextJckIdx === 0
                  ? "Hi, I'm Jack!"
                  : nextJckIdx === 1
                  ? 'My stones'
                  : 'Interesting activity'}
              </Text>
              <Text style={styles.jackStorySubttl}>
                {nextJckIdx === 0
                  ? `I love stories and I notice things that others often overlook.
In this app, I've collected stories from my world - sometimes strange, sometimes simple, but always 
with details.
If you're interested in not just reading, but also noticing more - you've come to the right place.`
                  : nextJckIdx === 1
                  ? `After each story, I check how carefully you read. For correct answers, you get my stones - it shows that the story was really noticed.
When there are enough stones, I reveal the next story to you.`
                  : `If you have several people, I suggest a simple alphabet activity.
Everyone takes turns getting a random letter and has to quickly name any word that matches it while the timer counts down.
After a few rounds, you see the total number of words each person said.`}
              </Text>
            </View>
          </ImageBackground>

          <TouchableOpacity activeOpacity={0.9} onPress={handleNextJck}>
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstorybutton.png')}
              style={styles.jackButtonWrap}
            >
              <Text style={styles.jackButtonText}>
                {nextJckIdx === 0
                  ? 'HELLO!'
                  : nextJckIdx === 1
                  ? 'GOOD'
                  : 'START'}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default JackIntroduceScrn;

const styles = StyleSheet.create({
  jckMainWrap: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  imageBackground: {
    flex: 1,
  },
  jackFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 370,
  },
  textContainer: {
    padding: 50,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
  jackStoryTtl: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStorySubttl: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginTop: 10,
    textAlign: 'center',
  },
  jackButtonWrap: {
    width: 200,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 50,
  },
  jackButtonText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
