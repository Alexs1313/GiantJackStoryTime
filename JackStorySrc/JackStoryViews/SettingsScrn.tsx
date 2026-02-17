import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomSwitch from '../JackStoryComponents/CustomSwitch';
import { useStore } from '../JackStoryStorage/settingsContext';
import { resetProgress } from '../JackStoryStorage/progressStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScrn = () => {
  const navigation = useNavigation();

  const { backgroundMusic, setBackgroundMusic, vibration, setVibration } =
    useStore();

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
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </ImageBackground>

        <View style={styles.contentWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.settingsFrame}
            resizeMode="stretch"
          >
            <View style={styles.settingsContainer}>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>MUSIC</Text>
                <CustomSwitch
                  value={backgroundMusic}
                  onValueChange={musValue => toggleJackMusic(musValue)}
                />
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>VIBRATION</Text>
                <CustomSwitch
                  value={vibration}
                  onValueChange={vibValue => toggleJackVibration(vibValue)}
                />
              </View>
            </View>
          </ImageBackground>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleResetProgress}
            style={styles.resetButtonWrap}
          >
            <ImageBackground
              source={require('../JackStoryAssets/images/jackstoryreset.png')}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>RESET PROGRESS</Text>
            </ImageBackground>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    minHeight: 82,
    marginBottom: 80,
  },
  backBtn: {
    position: 'absolute',
    left: 26,
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
  contentWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  settingsFrame: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 360,
    marginBottom: 24,
    minHeight: 252,
  },
  settingsContainer: {
    padding: 28,
    paddingHorizontal: 42,
    gap: 35,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  resetButtonWrap: {
    alignSelf: 'center',
  },
  resetButton: {
    width: 314,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
