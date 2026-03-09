import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STORIES_LIST, type StoryItem } from '../JackStoryData/storiesList';
import { StackList } from '../JackStoryRoutes/StackWays';
import type { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { loadProgress } from '../JackStoryStorage/progressStorage';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

export type { StoryItem };

const JackStoriesScrn = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackList, 'JackStoriesScrn'>>();
  const [readStoryIds, setReadStoryIds] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(p => setReadStoryIds(p.readStoryIds));
    }, []),
  );

  const onReadMore = (story: StoryItem) => {
    navigation.navigate('StoryDetailScrn', {
      storyId: story.id,
      title: story.title,
      fullText: story.fullText,
    });
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
          <Text style={styles.headerTitle}>JACK'S STORIES</Text>
        </View>

        <View style={styles.cardsWrap}>
          {STORIES_LIST.map(story => (
            <View key={story.id} style={styles.cardWrap}>
              <View style={styles.cardFrame}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{story.title}</Text>
                  <Text style={styles.cardDescription} numberOfLines={4}>
                    {story.description}
                  </Text>
                </View>
              </View>
              <PressableWithAnimation
                onPress={() => onReadMore(story)}
                style={styles.readMoreWrap}
              >
                <LinearGradient
                  colors={['#200653', '#460CB9']}
                  style={styles.readMoreButton}
                >
                  {readStoryIds.includes(story.id) ? (
                    <Image
                      source={require('../JackStoryAssets/images/read.png')}
                    />
                  ) : (
                    <Text style={styles.readMoreText}>READ MORE</Text>
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
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
    paddingTop: 60,
    paddingHorizontal: 15,
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
  cardsWrap: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  cardWrap: {
    marginBottom: 2,
  },
  cardFrame: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 24,
    paddingHorizontal: 20,
  },
  cardTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    paddingHorizontal: 8,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  readMoreWrap: {
    alignSelf: 'center',
    top: -30,
    zIndex: 1,
  },
  readMoreButton: {
    width: 220,
    height: 52,
    borderRadius: 7,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readMoreText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  checkmark: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
