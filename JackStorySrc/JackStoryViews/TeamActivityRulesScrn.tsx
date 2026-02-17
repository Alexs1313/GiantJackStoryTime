import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const RULES_TEXT =
  'Add participants, choose the number of rounds and start the activity. Each person is given a letter in turn, and within a limited time they must name any word that begins with it. If the word is named in time, it is counted, if not, the turn passes to the next participant. After the rounds are completed, a summary is displayed with the number of words named by each person.';

const TeamActivityRulesScrn = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
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
          <Text style={styles.headerTitle}>TEAM ACTIVITY</Text>
        </ImageBackground>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.frame}
            resizeMode="stretch"
          >
            <View style={styles.content}>
              <Text style={styles.rulesTitle}>RULES</Text>
              <Text style={styles.rulesText}>{RULES_TEXT}</Text>
            </View>
          </ImageBackground>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('TeamActivityRoundsScrn' as never)}
          style={styles.nextButtonWrap}
        >
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityRulesScrn;

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
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 82,
    marginBottom: 20,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  backBtn: {
    marginRight: 12,
    position: 'absolute',
    left: 24,
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
  panelWrap: {
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  frame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
  },
  content: {
    paddingTop: 45,
    paddingHorizontal: 35,
    paddingBottom: 50,
  },
  rulesTitle: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  rulesText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  nextButtonWrap: {
    alignSelf: 'center',
  },
  nextButton: {
    width: 236,
    height: 75,
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
