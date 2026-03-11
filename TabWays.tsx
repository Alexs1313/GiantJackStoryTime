// bottom tab navigation

import DashScrn from './JackStorySrc/Jackstoryscrnns/DashScrn';
import JackStoriesScrn from './JackStorySrc/Jackstoryscrnns/JackStoriesScrn';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

import AboutScrn from './JackStorySrc/Jackstoryscrnns/AboutScrn';
import SettingsScrn from './JackStorySrc/Jackstoryscrnns/SettingsScrn';

import QuizCategoriesScrn from './JackStorySrc/Jackstoryscrnns/QuizCategoriesScrn';
import TeamActivityRulesScrn from './JackStorySrc/Jackstoryscrnns/TeamActivityRulesScrn';
import { PressableWithAnimation } from './JackStorySrc/JackStoryComponents/PressableWithAnimation';

const Tab = createBottomTabNavigator();

const TabWays = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.bottomTabBar],
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.45)',
        tabBarButton: props => (
          <PressableWithAnimation
            onPress={() => props.onPress?.(undefined as any)}
            style={props.style}
          >
            {props.children}
          </PressableWithAnimation>
        ),
      }}
    >
      <Tab.Screen
        name="DashScrn"
        component={DashScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab1.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="JackStoriesScrn"
        component={JackStoriesScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab2.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TeamActivityRulesScrn"
        component={TeamActivityRulesScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab3.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QuizCategoriesScrn"
        component={QuizCategoriesScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab4.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScrn"
        component={SettingsScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab5.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AboutScrn"
        component={AboutScrn}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('./JackStorySrc/JackStoryAssets/images/tab6.png')}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabBar: {
    marginHorizontal: 16,
    elevation: 0,
    paddingTop: 26,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 34,
    paddingHorizontal: 12,
    backgroundColor: '#4B2703',
    borderRadius: 9,
    height: 90,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderTopWidth: 1,
  },
});

export default TabWays;
