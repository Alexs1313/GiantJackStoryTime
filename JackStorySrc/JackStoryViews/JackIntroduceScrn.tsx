import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const TEXTS = [
  {
    title: "Hi, I'm Jack!",
    subtitle: `Nice to see you in my world. Here I share stories that I like to tell with a smile and mood. Make yourself comfortable — a little adventure, a little reflection and a little fun are ahead.`,
  },
  {
    title: 'Read and test yourself',
    subtitle: `In the application you will find my stories — all available immediately. Read at your own pace and immerse yourself in my world. There are also quizzes where you can test your attentiveness, logic and intelligence.`,
  },
  {
    title: 'Guess the letter',
    subtitle: `A word appears to you without the first letter. Below are three options — you need to choose the one that correctly completes the word. A simple rule, but sometimes you have to think faster than you think.`,
  },
];

const CHAR_DELAY_MS = 30;
const PAUSE_BEFORE_SUBTITLE_MS = 300;

const IMAGE_FADE_DURATION_MS = 500;

const JackIntroduceScrn = () => {
  const [nextJckIdx, setNextJckIdx] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const navigation = useNavigation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const { title: fullTitle, subtitle: fullSubtitle } = TEXTS[nextJckIdx];

  useEffect(() => {
    imageOpacity.setValue(0);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: IMAGE_FADE_DURATION_MS,
      useNativeDriver: true,
    }).start();
  }, [nextJckIdx, imageOpacity]);

  useEffect(() => {
    setVisibleLength(0);
    const titleLen = fullTitle.length;
    const totalLen = titleLen + fullSubtitle.length;
    let next = 0;

    const tick = () => {
      if (next <= titleLen) {
        setVisibleLength(next);
        next += 1;
        if (next <= titleLen) {
          timeoutRef.current = setTimeout(tick, CHAR_DELAY_MS);
        } else {
          timeoutRef.current = setTimeout(tick, PAUSE_BEFORE_SUBTITLE_MS);
        }
      } else if (next <= totalLen) {
        setVisibleLength(next);
        next += 1;
        if (next <= totalLen) {
          timeoutRef.current = setTimeout(tick, CHAR_DELAY_MS);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, CHAR_DELAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [nextJckIdx, fullTitle, fullSubtitle]);

  const handleNextJck = () => {
    if (nextJckIdx < 2) {
      setNextJckIdx(nextJckIdx + 1);
    } else {
      navigation.navigate('TabWays' as never);
    }
  };

  const visibleTitle = fullTitle.slice(0, visibleLength);
  const subtitleStart = fullTitle.length;
  const visibleSubtitle =
    visibleLength > subtitleStart
      ? fullSubtitle.slice(0, visibleLength - subtitleStart)
      : '';

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
          <Animated.View
            style={[styles.onbImageWrap, { opacity: imageOpacity }]}
          >
            {nextJckIdx === 0 ? (
              <Image
                source={require('../JackStoryAssets/images/jackstoryonb1.png')}
                style={{ top: 10 }}
              />
            ) : nextJckIdx === 1 ? (
              <>
                <Image
                  source={require('../JackStoryAssets/images/jackstoryonb2.2.png')}
                  style={{ top: 50 }}
                />
                <Image
                  source={require('../JackStoryAssets/images/jackstoryonb2.png')}
                  style={{ top: 10 }}
                />
              </>
            ) : (
              <Image
                source={require('../JackStoryAssets/images/jackstoryonb3.png')}
                style={{ marginBottom: 80 }}
              />
            )}
          </Animated.View>

          <View style={styles.textContainer}>
            <Text style={styles.jackStoryTtl}>
              {visibleTitle}
              {visibleLength > 0 && visibleLength <= fullTitle.length && (
                <Text style={styles.cursor}>_</Text>
              )}
            </Text>
            {visibleSubtitle ? (
              <Text style={styles.jackStorySubttl}>
                {visibleSubtitle}
                {visibleLength > fullTitle.length &&
                  visibleLength < fullTitle.length + fullSubtitle.length && (
                    <Text style={styles.cursor}>_</Text>
                  )}
              </Text>
            ) : null}
          </View>

          <PressableWithAnimation onPress={handleNextJck}>
            <LinearGradient
              colors={['#200653', '#460CB9']}
              style={styles.jackButtonWrap}
            >
              <Text style={styles.jackButtonText}>
                {nextJckIdx === 0
                  ? 'HELLO!'
                  : nextJckIdx === 1
                  ? 'GOOD'
                  : 'START'}
              </Text>
            </LinearGradient>
          </PressableWithAnimation>
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
    paddingBottom: 45,
    paddingTop: 20,
  },
  onbImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B2703',
    borderWidth: 1,
    width: '90%',
    borderRadius: 9,
    borderColor: '#fff',
    minHeight: 184,
  },
  jackStoryTtl: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStorySubttl: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginTop: 20,
    textAlign: 'center',
  },
  cursor: {
    color: '#fff',
    opacity: 0.9,
  },
  jackButtonWrap: {
    width: 200,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.7,
    borderColor: '#fff',
    borderRadius: 7,
  },
  jackButtonText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
