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
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const RULES_TEXT =
  'You are presented with a word with a missing first letter, and below it are three letter options. You need to choose the correct one to complete the word. The words change one after the other without any restrictions, and you can continue as long as you want. Stop when you decide - everything is simple and clear.';

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
        <View style={styles.headerFrame}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image source={require('../JackStoryAssets/images/backarr.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ACTIVITY RULES</Text>
        </View>

        <View style={styles.panelWrap}>
          <View style={styles.frame}>
            <View style={styles.content}>
              <Text style={styles.rulesText}>{RULES_TEXT}</Text>
            </View>
          </View>
        </View>

        <PressableWithAnimation
          onPress={() => navigation.navigate('TeamActivityGuessScrn' as never)}
          style={styles.nextButtonWrap}
        >
          <LinearGradient
            colors={['#200653', '#460CB9']}
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>START</Text>
          </LinearGradient>
        </PressableWithAnimation>
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
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  panelWrap: {
    paddingHorizontal: 8,
    marginBottom: 24,
    marginTop: 50,
  },
  frame: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  content: {
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  rulesTitle: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  rulesText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  nextButtonWrap: {
    alignSelf: 'center',
  },
  nextButton: {
    width: 221,
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
