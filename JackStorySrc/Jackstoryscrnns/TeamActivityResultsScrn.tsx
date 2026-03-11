import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

type ResultsParams = {
  players: string[];
  scores: { correct: number; incorrect: number }[];
};

const TeamActivityResultsScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ResultsParams>, string>>();
  const { scores: jackStoryScores = [] } =
    (route.params as ResultsParams) ?? {};

  const jackStoryCorrectCount = jackStoryScores[0]?.correct ?? 0;

  const handleJackStoryShare = async () => {
    try {
      await Share.share({
        message: `You are well done! Your result: ${jackStoryCorrectCount} words.\n\nGiant Jack: Story Time!`,
        title: 'Team Activity Results',
      });
    } catch (_) {}
  };

  const handleJackStoryTryAgain = () => {
    navigation.navigate('TeamActivityGuessScrn' as never);
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
            onPress={() =>
              navigation.navigate('TabWays', {
                screen: 'TeamActivityRulesScrn',
              } as never)
            }
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>

          <Text style={styles.jackStoryHeaderTitle}>RESULTS</Text>
        </View>

        <View style={styles.jackStoryPanelWrap}>
          <View style={styles.jackStoryFrame}>
            <View style={styles.jackStoryContent}>
              <Text style={styles.jackStoryTitle}>YOU ARE WELL DONE!</Text>
              <Text style={styles.jackStorySubtitle}>Your result:</Text>

              <View style={styles.jackStoryResultRow}>
                <Text style={styles.jackStoryResultNumber}>
                  {jackStoryCorrectCount}
                </Text>
                <Text style={styles.jackStoryResultLabel}> words</Text>
              </View>

              <Image
                source={require('../JackStoryAssets/images/resjacck.png')}
                style={styles.jackStoryCharacterImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.jackStoryButtonsRow}>
          <Pressable
            onPress={handleJackStoryShare}
            style={styles.jackStoryShareButtonWrap}
          >
            <LinearGradient
              colors={['#C724B1', '#E91E8C']}
              style={styles.jackStoryShareButton}
            >
              <Text style={styles.jackStoryButtonText}>SHARE</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={handleJackStoryTryAgain}
            style={styles.jackStoryTryAgainButtonWrap}
          >
            <LinearGradient
              colors={['#200653', '#460CB9']}
              style={styles.jackStoryTryAgainButton}
            >
              <Text style={styles.jackStoryButtonText}>TRY AGAIN</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityResultsScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  jackStoryHeaderFrame: {
    width: '88%',
    alignSelf: 'center',
    minHeight: 66,
    marginBottom: 34,
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
    marginBottom: 28,
  },
  jackStoryFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  jackStoryContent: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  jackStoryTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  jackStorySubtitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  jackStoryResultRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  jackStoryResultNumber: {
    fontSize: 28,
    color: '#FFB74D',
    fontFamily: 'kefa-bold',
  },
  jackStoryResultLabel: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-regular',
  },
  jackStoryCharacterImage: {
    width: 160,
    height: 180,
  },
  jackStoryButtonsRow: {
    alignItems: 'center',
    gap: 16,
  },
  jackStoryShareButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  jackStoryShareButton: {
    width: 167,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: -30,
  },
  jackStoryTryAgainButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  jackStoryTryAgainButton: {
    width: 231,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
