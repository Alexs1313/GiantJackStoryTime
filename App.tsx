import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SettingsContextProvider } from './JackStorySrc/Jackstorystorr/settingsContext';
import Jackstoryroutees from './Jackstoryroutees';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SettingsContextProvider>
        <Jackstoryroutees />
      </SettingsContextProvider>
    </NavigationContainer>
  );
};

export default App;
