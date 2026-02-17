import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackWays from './JackStorySrc/JackStoryRoutes/StackWays';
import { SettingsContextProvider } from './JackStorySrc/JackStoryStorage/settingsContext';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SettingsContextProvider>
        <StackWays />
      </SettingsContextProvider>
    </NavigationContainer>
  );
};

export default App;
