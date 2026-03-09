import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Vibration,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomSwitch from '../JackStoryComponents/CustomSwitch';
import { useStore } from '../JackStoryStorage/settingsContext';
import { resetProgress } from '../JackStoryStorage/progressStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const SettingsScrn = () => {
  const navigation = useNavigation();

  const { backgroundMusic, setBackgroundMusic, vibration, setVibration } =
    useStore();

  const { height } = useWindowDimensions();

  const handleResetProgress = () => {
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

  const toggleJackVibration = async (vibValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleVibrationValue',
        JSON.stringify(vibValue),
      );
      setVibration(vibValue);
    } catch (error) {
      console.log('vibr err', error);
    }
  };

  const toggleJackMusic = async (musValue: boolean) => {
    try {
      await AsyncStorage.setItem('toggleMusicValue', JSON.stringify(musValue));
      setBackgroundMusic(musValue);
    } catch (error) {
      console.log('mus err', error);
    }
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
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </View>

        <View style={styles.contentWrap}>
          <View
            style={[
              styles.settingsFrame,
              {
                marginTop:
                  Platform.OS === 'ios' ? height * 0.09 : height * 0.01,
              },
            ]}
          >
            <View style={[styles.settingsContainer]}>
              {Platform.OS === 'ios' && (
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>MUSIC</Text>
                  <CustomSwitch
                    value={backgroundMusic}
                    onValueChange={musValue => toggleJackMusic(musValue)}
                  />
                </View>
              )}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>VIBRATION</Text>
                <CustomSwitch
                  value={vibration}
                  onValueChange={vibValue => toggleJackVibration(vibValue)}
                />
              </View>
            </View>
          </View>

          <PressableWithAnimation onPress={handleResetProgress}>
            <LinearGradient
              colors={['#4E0000', '#B40000']}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>RESET PROGRESS</Text>
            </LinearGradient>
          </PressableWithAnimation>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SettingsScrn;

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
  contentWrap: {
    flex: 1,
    alignItems: 'center',
  },
  settingsFrame: {
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
  settingsContainer: {
    padding: 28,
    paddingHorizontal: 28,
    gap: 28,
    minHeight: Platform.OS === 'ios' ? 165 : 90,
    justifyContent: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
  },
  resetButtonWrap: {
    alignSelf: 'center',
  },
  resetButton: {
    width: 300,
    marginTop: 20,
    minHeight: 56,
    borderRadius: 7,
    borderWidth: 0.7,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
