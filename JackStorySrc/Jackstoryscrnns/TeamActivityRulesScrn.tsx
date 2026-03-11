import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const JACK_STORY_RULES_TEXT =
  'You are presented with a word with a missing first letter, and below it are three letter options. You need to choose the correct one to complete the word. The words change one after the other without any restrictions, and you can continue as long as you want. Stop when you decide - everything is simple and clear.';

const TeamActivityRulesScrn = () => {
  const navigation = useNavigation();

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
          <Text style={styles.jackStoryHeaderTitle}>ACTIVITY RULES</Text>
        </View>

        <View style={styles.jackStoryPanelWrap}>
          <View style={styles.jackStoryFrame}>
            <View style={styles.jackStoryContent}>
              <Text style={styles.jackStoryRulesText}>
                {JACK_STORY_RULES_TEXT}
              </Text>
            </View>
          </View>
        </View>

        <PressableWithAnimation
          onPress={() => navigation.navigate('TeamActivityGuessScrn' as never)}
          style={styles.jackStoryNextButtonWrap}
        >
          <LinearGradient
            colors={['#200653', '#460CB9']}
            style={styles.jackStoryNextButton}
          >
            <Text style={styles.jackStoryButtonText}>START</Text>
          </LinearGradient>
        </PressableWithAnimation>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityRulesScrn;

const styles = StyleSheet.create({
  jackStoryImageBackground: {
    flex: 1,
  },
  jackStoryScrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
  jackStoryPanelWrap: {
    paddingHorizontal: 8,
    marginBottom: 24,
    marginTop: 50,
  },
  jackStoryFrame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  jackStoryContent: {
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  jackStoryRulesTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  jackStoryRulesText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  jackStoryNextButtonWrap: {
    alignSelf: 'center',
  },
  jackStoryNextButton: {
    width: 221,
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
