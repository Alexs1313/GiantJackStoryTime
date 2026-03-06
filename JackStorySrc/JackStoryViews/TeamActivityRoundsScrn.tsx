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
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const ROUND_OPTIONS = [5, 10, 15] as const;

const TeamActivityRoundsScrn = () => {
  const navigation = useNavigation();
  const [selectedRounds, setSelectedRounds] = useState<number>(5);

  const handleNext = () => {
    navigation.navigate(
      'TeamActivityPlayersScrn' as never,
      {
        rounds: selectedRounds,
      } as never,
    );
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
          <Text style={styles.headerTitle}>NUMBER OF ROUNDS</Text>
        </ImageBackground>

        <View style={styles.optionsWrap}>
          {ROUND_OPTIONS.map(num => (
            <TouchableOpacity
              key={num}
              activeOpacity={0.9}
              onPress={() => setSelectedRounds(num)}
              style={styles.optionButtonWrap}
            >
              <ImageBackground
                source={require('../JackStoryAssets/images/jackstorretry.png')}
                style={[
                  styles.optionButton,
                  selectedRounds === num && styles.optionButtonSelected,
                ]}
              >
                <Text style={styles.optionText}>{num}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <PressableWithAnimation onPress={handleNext} style={styles.nextButtonWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </ImageBackground>
        </PressableWithAnimation>
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityRoundsScrn;

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
  optionsWrap: {
    alignItems: 'center',
    gap: 20,
    marginBottom: 32,
    marginTop: 40,
  },
  optionButtonWrap: {
    alignSelf: 'center',
  },
  optionButton: {
    width: 140,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  optionButtonSelected: {
    opacity: 1,
    borderWidth: 3,
    borderColor: '#c9a227',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  nextButtonWrap: {
    alignSelf: 'center',
    marginTop: 40,
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
