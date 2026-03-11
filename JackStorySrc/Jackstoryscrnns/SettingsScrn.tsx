import CustomSwitch from '../JackStoryComponents/CustomSwitch';
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

import { useStore } from '../Jackstorystorr/settingsContext';

import { resetProgress } from '../Jackstorystorr/progressStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const SettingsScrn = () => {
  const { backgroundMusic, setBackgroundMusic, vibration, setVibration } =
    useStore();

  const { height } = useWindowDimensions();

  const handleJackStoryResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetProgress();
          },
        },
      ],
    );
  };

  const toggleJackStoryVibration = async (jackStoryVibValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleVibrationValue',
        JSON.stringify(jackStoryVibValue),
      );
      setVibration(jackStoryVibValue);
    } catch (jackStoryError) {
      console.log('vibr err', jackStoryError);
    }
  };

  const toggleJackStoryMusic = async (jackStoryMusValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleMusicValue',
        JSON.stringify(jackStoryMusValue),
      );
      setBackgroundMusic(jackStoryMusValue);
    } catch (jackStoryError) {
      console.log('mus err', jackStoryError);
    }
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
          <Text style={styles.jackStoryHeaderTitle}>SETTINGS</Text>
        </View>

        <View style={styles.jackStoryContentWrap}>
          <View
            style={[
              styles.jackStorySettingsFrame,
              {
                marginTop:
                  Platform.OS === 'ios' ? height * 0.09 : height * 0.01,
              },
            ]}
          >
            <View style={styles.jackStorySettingsContainer}>
              {Platform.OS === 'ios' && (
                <View style={styles.jackStorySettingRow}>
                  <Text style={styles.jackStorySettingLabel}>MUSIC</Text>
                  <CustomSwitch
                    value={backgroundMusic}
                    onValueChange={jackStoryMusValue =>
                      toggleJackStoryMusic(jackStoryMusValue)
                    }
                  />
                </View>
              )}

              <View style={styles.jackStorySettingRow}>
                <Text style={styles.jackStorySettingLabel}>VIBRATION</Text>
                <CustomSwitch
                  value={vibration}
                  onValueChange={jackStoryVibValue =>
                    toggleJackStoryVibration(jackStoryVibValue)
                  }
                />
              </View>
            </View>
          </View>

          <PressableWithAnimation onPress={handleJackStoryResetProgress}>
            <LinearGradient
              colors={['#4E0000', '#B40000']}
              style={styles.jackStoryResetButton}
            >
              <Text style={styles.jackStoryResetButtonText}>
                RESET PROGRESS
              </Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SettingsScrn;

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
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStoryContentWrap: {
    flex: 1,
    alignItems: 'center',
  },
  jackStorySettingsFrame: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  jackStorySettingsContainer: {
    padding: 28,
    paddingHorizontal: 28,
    gap: 28,
    minHeight: Platform.OS === 'ios' ? 165 : 90,
    justifyContent: 'center',
  },
  jackStorySettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jackStorySettingLabel: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  jackStoryResetButtonWrap: {
    alignSelf: 'center',
  },
  jackStoryResetButton: {
    width: 300,
    marginTop: 20,
    minHeight: 56,
    borderRadius: 7,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jackStoryResetButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
