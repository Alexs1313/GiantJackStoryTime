import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeLoader from '../JackStoryViews/WelcomeLoader';
import JackIntroduceScrn from '../JackStoryViews/JackIntroduceScrn';
import DashScrn from '../JackStoryViews/DashScrn';
import AboutScrn from '../JackStoryViews/AboutScrn';
import SettingsScrn from '../JackStoryViews/SettingsScrn';
import JackStoriesScrn from '../JackStoryViews/JackStoriesScrn';
import StoryDetailScrn from '../JackStoryViews/StoryDetailScrn';
import QuizScrn from '../JackStoryViews/QuizScrn';
import QuizResultsScrn from '../JackStoryViews/QuizResultsScrn';
import TeamActivityRulesScrn from '../JackStoryViews/TeamActivityRulesScrn';
import TeamActivityRoundsScrn from '../JackStoryViews/TeamActivityRoundsScrn';
import TeamActivityPlayersScrn from '../JackStoryViews/TeamActivityPlayersScrn';
import TeamActivityRoundScrn from '../JackStoryViews/TeamActivityRoundScrn';
import TeamActivityGuessScrn from '../JackStoryViews/TeamActivityGuessScrn';
import TeamActivityResultsScrn from '../JackStoryViews/TeamActivityResultsScrn';
import TabWays from '../../TabWays';

export type StackList = {
  WelcomeLoader: undefined;
  JackIntroduceScrn: undefined;
  TabWays: undefined;
  AboutScrn: undefined;
  SettingsScrn: undefined;
  JackStoriesScrn: undefined;
  StoryDetailScrn: {
    storyId: string;
    title: string;
    fullText: string;
  };
  QuizScrn: { storyId: string };
  QuizResultsScrn: {
    storyId: string;
    storyTitle: string;
    score: number;
    total: number;
  };
  TeamActivityRulesScrn: undefined;
  TeamActivityRoundsScrn: undefined;
  TeamActivityPlayersScrn: { rounds: number };
  TeamActivityRoundScrn: {
    rounds: number;
    players: string[];
    roundIndex: number;
    playerIndex: number;
    scores: { correct: number; incorrect: number }[];
  };
  TeamActivityGuessScrn: undefined;
  TeamActivityResultsScrn: {
    players: string[];
    scores: { correct: number; incorrect: number }[];
  };
};

const NativeStack = createStackNavigator<StackList>();

const StackWays: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="WelcomeLoader" component={WelcomeLoader} />
      <NativeStack.Screen
        name="JackIntroduceScrn"
        component={JackIntroduceScrn}
      />
      <NativeStack.Screen name="TabWays" component={TabWays} />
      <NativeStack.Screen name="AboutScrn" component={AboutScrn} />
      <NativeStack.Screen name="SettingsScrn" component={SettingsScrn} />
      <NativeStack.Screen name="JackStoriesScrn" component={JackStoriesScrn} />
      <NativeStack.Screen name="StoryDetailScrn" component={StoryDetailScrn} />
      <NativeStack.Screen name="QuizScrn" component={QuizScrn} />
      <NativeStack.Screen name="QuizResultsScrn" component={QuizResultsScrn} />
      <NativeStack.Screen
        name="TeamActivityRulesScrn"
        component={TeamActivityRulesScrn}
      />
      <NativeStack.Screen
        name="TeamActivityRoundsScrn"
        component={TeamActivityRoundsScrn}
      />
      <NativeStack.Screen
        name="TeamActivityPlayersScrn"
        component={TeamActivityPlayersScrn}
      />
      <NativeStack.Screen
        name="TeamActivityRoundScrn"
        component={TeamActivityRoundScrn}
      />
      <NativeStack.Screen
        name="TeamActivityGuessScrn"
        component={TeamActivityGuessScrn}
      />
      <NativeStack.Screen
        name="TeamActivityResultsScrn"
        component={TeamActivityResultsScrn}
      />
    </NativeStack.Navigator>
  );
};

export default StackWays;
