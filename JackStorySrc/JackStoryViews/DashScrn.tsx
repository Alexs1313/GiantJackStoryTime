import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../JackStoryStorage/settingsContext';
import Sound from 'react-native-sound';

const DashScrn = () => {
  const navigation = useNavigation();
  const { backgroundMusic, setBackgroundMusic, setVibration } = useStore();

  const [musicIndexJackStory, setMusicIndexJackStory] = useState<number>(0);
  const [soundJackStory, setSoundJackStory] = useState<Sound | null>(null);

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
      >
        <View style={styles.jckMainWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryhomefr.png')}
            style={styles.jackFrameIntroContainer}
            resizeMode="stretch"
          >
            <View style={styles.textContainerIntro}>
              <Image
                source={require('../JackStoryAssets/images/jackstoryicon.png')}
              />

              <View style={{ width: '90%' }}>
                <Text style={styles.jackStoryTtl}>
                  Welcome to Giant Jack: Story Time!
                </Text>
                <Text style={styles.jackStorySubttl}>
                  {new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>
          </ImageBackground>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginTop: 22, marginBottom: 12 }}
            onPress={() => navigation.navigate('JackStoriesScrn' as never)}
          >
            <Image
              source={require('../JackStoryAssets/images/jackstorybook.png')}
            />
          </TouchableOpacity>

          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.jackFrameContainer}
            resizeMode="stretch"
          >
            <View style={styles.textContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('TeamActivityRulesScrn' as never)
                }
              >
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
                  style={styles.jackButtonWrap}
                >
                  <Text style={styles.jackButtonText}>TEAM ACTIVITY</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('SettingsScrn' as never)}
              >
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
                  style={styles.jackButtonWrap}
                >
                  <Text style={styles.jackButtonText}>SETTINGS</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('AboutScrn' as never)}
              >
                <ImageBackground
                  source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
                  style={styles.jackButtonWrap}
                >
                  <Text style={styles.jackButtonText}>ABOUT</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageBackground: {
    flex: 1,
  },
  jackFrameIntroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 307,
    minHeight: 160,
  },
  jackFrameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 370,
    minHeight: 360,
  },
  textContainerIntro: {
    padding: 30,
    paddingLeft: 90,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  textContainer: {
    padding: 50,

    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  jackStoryTtl: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  jackStorySubttl: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'kefa-regular',
    marginTop: 10,
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
