import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext<{
  backgroundMusic: boolean;
  setBackgroundMusic: (value: boolean) => void;
  vibration: boolean;
  setVibration: (value: boolean) => void;
}>({
  backgroundMusic: false,
  setBackgroundMusic: () => {},
  vibration: false,
  setVibration: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [vibration, setVibration] = useState(false);

  const contextValues = {
    backgroundMusic,
    setBackgroundMusic,
    vibration,
    setVibration,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
