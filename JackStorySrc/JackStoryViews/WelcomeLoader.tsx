import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

const DELAY_MS = 500000000;

const campfireLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .campfire-loader {
    position: relative;
    width: 6em;
    height: 6em;
  }

  .fire-container {
    position: absolute;
    bottom: 2.5em;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .flame {
    position: absolute;
    background: linear-gradient(180deg, #ff6b00 0%, #ffd700 70%);
    border-radius: 50%;
    animation: flicker 0.8s ease-in-out infinite alternate;
  }

  .flame-main {
    width: 1.8em;
    height: 2.5em;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
  }

  .flame-left,
  .flame-right {
    width: 1.2em;
    height: 1.8em;
    top: 0.5em;
  }

  .flame-left {
    left: -1.2em;
    clip-path: polygon(70% 0, 100% 100%, 0 100%);
    animation-delay: 0.2s;
  }

  .flame-right {
    right: -1.2em;
    clip-path: polygon(30% 0, 100% 100%, 0 100%);
    animation-delay: 0.4s;
  }

  .logs {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.8em;
  }

  .log {
    width: 1.5em;
    height: 0.5em;
    background: linear-gradient(45deg, #6b4226, #8b4513);
    border-radius: 0.2em;
    transform: rotate(-15deg);
  }

  .log:last-child {
    transform: rotate(15deg);
  }

  .embers {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .ember {
    position: absolute;
    width: 0.3em;
    height: 0.3em;
    background: #ff4500;
    border-radius: 50%;
    animation: float 1.5s ease-in infinite;
    bottom: 2.8em;
    left: 50%;
  }

  .ember:nth-child(1) { animation-delay: 0s; }
  .ember:nth-child(2) { animation-delay: 0.3s; }
  .ember:nth-child(3) { animation-delay: 0.6s; }

  .sparkles {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 215, 0, 0.2) 0%,
      transparent 60%
    );
    animation: glow 1.5s ease-in-out infinite;
  }

  @keyframes flicker {
    0% {
      transform: scaleY(1) skew(2deg);
      opacity: 0.9;
    }
    100% {
      transform: scaleY(1.2) skew(-3deg);
      opacity: 1;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-3em) scale(0.2);
      opacity: 0;
    }
  }

  @keyframes glow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
</style>
</head>

<body>
  <div class="campfire-loader">
    <div class="fire-container">
      <div class="flame flame-main"></div>
      <div class="flame flame-left"></div>
      <div class="flame flame-right"></div>
    </div>
    <div class="logs">
      <div class="log"></div>
      <div class="log"></div>
    </div>
    <div class="embers">
      <div class="ember"></div>
      <div class="ember"></div>
      <div class="ember"></div>
    </div>
    <div class="sparkles"></div>
  </div>
</body>
</html>
`;

const WelcomeLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('JackIntroduceScrn' as never);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../JackStoryAssets/images/jackstorybg_image.png')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../JackStoryAssets/images/loaderlogo.png')}
          style={styles.icon}
        />

        <View style={styles.webviewDock}>
          <WebView
            originWhitelist={['*']}
            source={{ html: campfireLoaderHTML }}
            style={{ backgroundColor: 'transparent', width: 160, height: 150 }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default WelcomeLoader;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  icon: {
    width: 233,
    height: 233,
    alignSelf: 'center',
    marginTop: 80,
  },
  webviewDock: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
});
