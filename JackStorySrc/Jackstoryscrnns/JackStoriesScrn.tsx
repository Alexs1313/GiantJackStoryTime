// stories
import { loadProgress } from '../Jackstorystorr/progressStorage';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STORIES_LIST, type StoryItem } from '../Jackstorydta/storiesList';

import LinearGradient from 'react-native-linear-gradient';

export type { StoryItem };

const JackStoriesScrn = () => {
  const navigation = useNavigation();
  const [readStoryIds, setReadStoryIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(p => setReadStoryIds(p.readStoryIds));
    }, []),
  );

  const jackStoryReadMore = (story: StoryItem) => {
    navigation.navigate('StoryDetailScrn', {
      storyId: story.id,
      title: story.title,
      fullText: story.fullText,
    });
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
          <Text style={styles.jackStoryHeaderTitle}>JACK'S STORIES</Text>
        </View>

        <View style={styles.jackStoryCardsWrap}>
          {STORIES_LIST.map(story => (
            <View key={story.id} style={styles.jackStoryCardWrap}>
              <View style={styles.jackStoryCardFrame}>
                <View style={styles.jackStoryCardContent}>
                  <Text style={styles.jackStoryCardTitle}>{story.title}</Text>

                  <Text
                    style={styles.jackStoryCardDescription}
                    numberOfLines={4}
                  >
                    {story.description}
                  </Text>
                </View>
              </View>

              <PressableWithAnimation
                onPress={() => jackStoryReadMore(story)}
                style={styles.jackStoryReadMoreWrap}
              >
                <LinearGradient
                  colors={['#200653', '#460CB9']}
                  style={styles.jackStoryReadMoreButton}
                >
                  {readStoryIds.includes(story.id) ? (
                    <Image
                      source={require('../JackStoryAssets/images/read.png')}
                    />
                  ) : (
                    <Text style={styles.jackStoryReadMoreText}>READ MORE</Text>
                  )}
                </LinearGradient>
              </PressableWithAnimation>
            </View>
          ))}
        </View>
      </ScrollView>

      <LinearGradient
        colors={['#00220500', '#002205']}
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
        }}
      />
    </ImageBackground>
  );
};

export default JackStoriesScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
    paddingTop: 60,
    paddingHorizontal: 15,
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
  jackStoryCardsWrap: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  jackStoryCardWrap: {
    marginBottom: 2,
  },
  jackStoryCardFrame: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  jackStoryCardContent: {
    padding: 24,
    paddingHorizontal: 20,
  },
  jackStoryCardTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  jackStoryCardDescription: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    paddingHorizontal: 8,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  jackStoryReadMoreWrap: {
    alignSelf: 'center',
    top: -30,
    zIndex: 1,
  },
  jackStoryReadMoreButton: {
    width: 220,
    height: 52,
    borderRadius: 7,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryReadMoreText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryCheckmark: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
