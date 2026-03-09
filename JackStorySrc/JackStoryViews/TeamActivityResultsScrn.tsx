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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

type ResultsParams = {
  players: string[];
  scores: { correct: number; incorrect: number }[];
};

const TeamActivityResultsScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ResultsParams>, string>>();
  const { players = [], scores = [] } = (route.params as ResultsParams) ?? {};

  const correctCount = scores[0]?.correct ?? 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `You are well done! Your result: ${correctCount} words.\n\nGiant Jack: Story Time!`,
        title: 'Team Activity Results',
      });
    } catch (_) {}
  };

  const handleTryAgain = () => {
    navigation.navigate('TeamActivityGuessScrn' as never);
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
            onPress={() =>
              navigation.navigate('TabWays', {
                screen: 'TeamActivityRulesScrn',
              } as never)
            }
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>RESULTS</Text>
        </View>

        <View style={styles.panelWrap}>
          <View style={styles.frame}>
            <View style={styles.content}>
              <Text style={styles.title}>YOU ARE WELL DONE!</Text>
              <Text style={styles.subtitle}>Your result:</Text>
              <View style={styles.resultRow}>
                <Text style={styles.resultNumber}>{correctCount}</Text>
                <Text style={styles.resultLabel}> words</Text>
              </View>
              <Image
                source={require('../JackStoryAssets/images/resjacck.png')}
                style={styles.characterImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonsRow}>
          <PressableWithAnimation
            onPress={handleShare}
            style={styles.shareButtonWrap}
          >
            <LinearGradient
              colors={['#C724B1', '#E91E8C']}
              style={styles.shareButton}
            >
              <Text style={styles.buttonText}>SHARE</Text>
            </LinearGradient>
          </PressableWithAnimation>
          <PressableWithAnimation
            onPress={handleTryAgain}
            style={styles.tryAgainButtonWrap}
          >
            <LinearGradient
              colors={['#200653', '#460CB9']}
              style={styles.tryAgainButton}
            >
              <Text style={styles.buttonText}>TRY AGAIN</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityResultsScrn;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerFrame: {
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
    marginBottom: 28,
  },
  frame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  resultNumber: {
    fontSize: 28,
    color: '#FFB74D',
    fontFamily: 'kefa-bold',
  },
  resultLabel: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-regular',
  },
  characterImage: {
    width: 160,
    height: 180,
  },
  buttonsRow: {
    alignItems: 'center',
    gap: 16,
  },
  shareButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  shareButton: {
    width: 167,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: -30,
  },
  tryAgainButtonWrap: {
    alignSelf: 'center',
    top: -30,
  },
  tryAgainButton: {
    width: 231,
    height: 55,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
