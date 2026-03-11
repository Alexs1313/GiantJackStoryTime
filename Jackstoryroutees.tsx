// stack naviigation

import TeamActivityResultsScrn from './JackStorySrc/Jackstoryscrnns/TeamActivityResultsScrn';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JackIntroduceScrn from './JackStorySrc/Jackstoryscrnns/JackIntroduceScrn';

import AboutScrn from './JackStorySrc/Jackstoryscrnns/AboutScrn';
import SettingsScrn from './JackStorySrc/Jackstoryscrnns/SettingsScrn';
import JackStoriesScrn from './JackStorySrc/Jackstoryscrnns/JackStoriesScrn';
import StoryDetailScrn from './JackStorySrc/Jackstoryscrnns/StoryDetailScrn';

// quiz screens
import QuizScrn from './JackStorySrc/Jackstoryscrnns/QuizScrn';
import QuizResultsScrn from './JackStorySrc/Jackstoryscrnns/QuizResultsScrn';

// team activity screens
import TeamActivityRulesScrn from './JackStorySrc/Jackstoryscrnns/TeamActivityRulesScrn';

import TeamActivityGuessScrn from './JackStorySrc/Jackstoryscrnns/TeamActivityGuessScrn';
import Jackwlcmloader from './JackStorySrc/Jackstoryscrnns/Jackwlcmloader';
import TabWays from './TabWays';

const NativeStack = createStackNavigator();

const Jackstoryroutees: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Jackwlcmloader" component={Jackwlcmloader} />
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

export default Jackstoryroutees;
