import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../Jackstorystorr/settingsContext';

import Sound from 'react-native-sound';

const DashScrn = () => {
  const { backgroundMusic, setBackgroundMusic, setVibration } = useStore();
  const { height, width } = useWindowDimensions();
  const [musicIndexJackStory, setMusicIndexJackStory] = useState<number>(0);
  const [soundJackStory, setSoundJackStory] = useState<Sound | null>(null);
  const isLandscape = height < width;

  const tracksJackStory = [
    'drift_sound-happy-comic-dancing-theme-377563.mp3',
    'drift_sound-happy-comic-dancing-theme-377563.mp3',
  ];

  useFocusEffect(
    useCallback(() => {
      loadSettingsJackStory();
    }, []),
  );

  const loadSettingsJackStory = async () => {
    try {
      const rawVibrationJackStory = await AsyncStorage.getItem(
        'toggleVibrationValue',
      );
      const rawSoundJackStory = await AsyncStorage.getItem('toggleMusicValue');

      const parsedVibrationJackStory = rawVibrationJackStory
        ? JSON.parse(rawVibrationJackStory)
        : null;

      const parsedSoundJackStory = rawSoundJackStory
        ? JSON.parse(rawSoundJackStory)
        : null;

      if (typeof parsedVibrationJackStory === 'boolean') {
        setVibration(parsedVibrationJackStory);
      }

      if (typeof parsedSoundJackStory === 'boolean') {
        setBackgroundMusic(parsedSoundJackStory);
      }
    } catch (error) {
      console.log('Error get settings', error);
    }
  };

  useEffect(() => {
    playMusicJackStory(musicIndexJackStory);

    return () => {
      if (soundJackStory) {
        soundJackStory.stop(() => {
          soundJackStory.release();
        });
      }
    };
  }, [musicIndexJackStory]);

  const playMusicJackStory = (indexJackStory: number) => {
    if (soundJackStory) {
      soundJackStory.stop(() => {
        soundJackStory.release();
      });
    }

    const trackPathJackStory = tracksJackStory[indexJackStory];

    const newSoundJackStory = new Sound(
      trackPathJackStory,
      Sound.MAIN_BUNDLE,
      errorJackStory => {
        if (errorJackStory) {
          console.log('Error', errorJackStory);
          return;
        }

        newSoundJackStory.play(successJackStory => {
          if (successJackStory) {
            setMusicIndexJackStory(
              prevIndexJackStory =>
                (prevIndexJackStory + 1) % tracksJackStory.length,
            );
          } else {
            console.log('Error', errorJackStory);
          }
        });

        setSoundJackStory(newSoundJackStory);
      },
    );
  };

  useEffect(() => {
    const syncVolumeFromStorageJackStory = async () => {
      try {
        const rawSoundJackStory = await AsyncStorage.getItem(
          'toggleMusicValue',
        );
        const parsedSoundJackStory = rawSoundJackStory
          ? JSON.parse(rawSoundJackStory)
          : null;

        if (typeof parsedSoundJackStory === 'boolean') {
          setBackgroundMusic(parsedSoundJackStory);

          if (soundJackStory) {
            soundJackStory.setVolume(parsedSoundJackStory ? 1 : 0);
          }
        }
      } catch (errorJackStory) {
        console.error('Error =>', errorJackStory);
      }
    };

    syncVolumeFromStorageJackStory();
  }, [soundJackStory]);

  useEffect(() => {
    if (soundJackStory) {
      soundJackStory.setVolume(backgroundMusic ? 1 : 0);
    }
  }, [backgroundMusic, soundJackStory]);

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorrmaingb.png')}
      style={styles.imageBackground}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.jckMainWrap, { paddingTop: height * 0.1 }]}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.jackStoryTtl}>
              Welcome to Jack Giant Story Time!
            </Text>
            <Text style={styles.jackStorySubttl}>
              For your convenience, the bottom menu contains everything
              important for quick navigation through the application!
            </Text>
          </View>

          <Image
            source={require('../JackStoryAssets/images/homekjck.png')}
            style={{
              position: 'absolute',
              bottom: isLandscape ? 0 : 80,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DashScrn;

const styles = StyleSheet.create({
  jckMainWrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 45,
  },
  imageBackground: {
    flex: 1,
  },
  welcomeContainer: {
    width: '100%',
    backgroundColor: '#4B2703',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  welcomeTextWrap: {
    flex: 1,
  },
  bookButtonWrap: {
    marginTop: 22,
    marginBottom: 12,
  },
  menuContainer: {
    width: '100%',
    backgroundColor: '#4B2703',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 20,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  jackStoryTtl: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStorySubttl: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'kefa-regular',
    marginTop: 20,
    textAlign: 'center',
  },
  jackButtonWrap: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  jackButtonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
});
