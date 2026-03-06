import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackList } from '../JackStoryRoutes/StackWays';
import { PressableWithAnimation } from '../JackStoryComponents/PressableWithAnimation';

const MAX_PLAYERS = 5;
const PLAYER_COLORS = [
  '#FFC3C3',
  '#FBC698',
  '#FBEC98',
  '#D9FB98',
  '#98FBE8',
  '#e0c3fc',
];

const TeamActivityPlayersScrn = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackList, 'TeamActivityPlayersScrn'>>();
  const rounds = route.params?.rounds ?? 5;

  const [players, setPlayers] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addPlayer = () => {
    const name = input.trim();
    if (!name || players.length >= MAX_PLAYERS) return;
    setPlayers([...players, name]);
    setInput('');
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    if (players.length < 2) return;
    navigation.navigate(
      'TeamActivityRoundScrn' as never,
      {
        rounds,
        players,
        roundIndex: 0,
        playerIndex: 0,
        scores: players.map(() => ({ correct: 0, incorrect: 0 })),
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
          <Text style={styles.headerTitle}>ADD PARTICIPANT</Text>
        </ImageBackground>

        <View style={styles.panelWrap}>
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstoryfrm.png')}
            style={styles.frame}
            resizeMode="stretch"
          >
            <View style={styles.content}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Participant name"
                  placeholderTextColor="#000"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={addPlayer}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={addPlayer}
                  disabled={!input.trim() || players.length >= MAX_PLAYERS}
                  style={styles.addButton}
                >
                  <Image
                    source={require('../JackStoryAssets/images/jackstoradd.png')}
                  />
                </TouchableOpacity>
              </View>
              {players.map((name, idx) => (
                <View key={idx} style={styles.playerRow}>
                  <View
                    style={[
                      styles.playerChip,
                      {
                        backgroundColor:
                          PLAYER_COLORS[idx % PLAYER_COLORS.length],
                      },
                    ]}
                  >
                    <Text style={styles.playerName}>{name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removePlayer(idx)}
                    style={styles.deleteBtn}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../JackStoryAssets/images/jackstorrdel.png')}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ImageBackground>
        </View>

        <PressableWithAnimation
          onPress={handleStart}
          disabled={players.length < 2}
          style={styles.startButtonWrap}
        >
          <ImageBackground
            source={require('../JackStoryAssets/images/jackstorybuttonlarg.png')}
            style={[
              styles.startButton,
              players.length < 2 && styles.startButtonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>START</Text>
          </ImageBackground>
        </PressableWithAnimation>
        <Image
          source={require('../JackStoryAssets/images/jackstormaxtxt.png')}
          style={{ alignSelf: 'center' }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default TeamActivityPlayersScrn;

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
    minHeight: 546,
  },
  content: {
    paddingTop: 100,
    paddingHorizontal: 45,
    paddingBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'kefa-bold',
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  playerChip: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  playerName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  deleteBtn: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  deleteText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'kefa-bold',
  },
  startButtonWrap: {
    alignSelf: 'center',
    marginBottom: 8,
    bottom: 65,
  },
  startButton: {
    width: 236,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'kefa-bold',
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'kefa-regular',
    textAlign: 'center',
  },
});
