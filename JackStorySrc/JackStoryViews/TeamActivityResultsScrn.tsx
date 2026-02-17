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

const PLAYER_COLORS = [
  '#FFC3C3',
  '#FBC698',
  '#FBEC98',
  '#D9FB98',
  '#98FBE8',
  '#e0c3fc',
];

type ResultsParams = {
  players: string[];
  scores: { correct: number; incorrect: number }[];
};

const TeamActivityResultsScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, ResultsParams>, string>>();
  const { players = [], scores = [] } = (route.params as ResultsParams) ?? {};

  const handleShare = async () => {
    try {
      const scoreLines = players
        .map((name, i) => {
          const s = scores[i] ?? { correct: 0, incorrect: 0 };
          return `${name}: ✓${s.correct} ×${s.incorrect}`;
        })
        .join('\n');
      await Share.share({
        message: `Team Activity Results:\n${scoreLines}\n\nGiant Jack: Story Time!`,
        title: 'Team Activity Results',
      });
    } catch (_) {}
  };

  const handleRestart = () => {
    navigation.navigate('TeamActivityRulesScrn' as never);
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
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.replace('DashScrn' as never)}
            activeOpacity={0.9}
          >
            <Image
              source={require('../JackStoryAssets/images/jackstoryhm.png')}
            />
          </TouchableOpacity>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorysmhead.png')}
            style={styles.headerBanner}
            resizeMode="stretch"
          >
            <Text style={styles.headerTitle}>RESULTS</Text>
          </ImageBackground>
        </View>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.frame}
            resizeMode="stretch"
          >
            <View style={styles.content}>
              {players.map((name, idx) => {
                const s = scores[idx] ?? { correct: 0, incorrect: 0 };
                return (
                  <View key={idx} style={styles.scoreRow}>
                    <View
                      style={[
                        styles.playerChip,
                        {
                          backgroundColor:
                            PLAYER_COLORS[idx % PLAYER_COLORS.length],
                        },
                      ]}
                    >
                      <Text style={styles.playerName}>{name}</Text>
                    </View>
                    <View style={styles.scoresWrap}>
                      <Image
                        source={require('../JackStoryAssets/images/jacksresok.png')}
                      />
                      <Text style={styles.scoreItem}>{s.correct}</Text>
                      <Image
                        source={require('../JackStoryAssets/images/jackresnook.png')}
                      />
                      <Text style={styles.scoreItem}>{s.incorrect}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ImageBackground>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleShare}
            style={styles.shareButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstoryshr.png')}
              style={styles.shareButton}
            >
              <Text style={styles.buttonText}>SHARE</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleRestart}
            style={styles.restartButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
              style={styles.restartButton}
            >
              <Text style={styles.buttonText}>RESTART</Text>
            </ImageBackground>
          </TouchableOpacity>
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
    paddingHorizontal: 15,
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  homeButton: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  headerBanner: {
    width: 170,
    minHeight: 74,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  panelWrap: {
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  frame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    minHeight: 456,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 44,
    paddingBottom: 40,
    marginTop: 40,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  playerChip: {
    minWidth: 80,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  playerName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  scoresWrap: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  scoreItem: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  buttonsRow: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'center',
    bottom: 66,
  },
  shareButtonWrap: {
    marginBottom: 12,
  },
  shareButton: {
    width: 140,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonWrap: {
    marginBottom: 12,
  },
  restartButton: {
    width: 200,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
