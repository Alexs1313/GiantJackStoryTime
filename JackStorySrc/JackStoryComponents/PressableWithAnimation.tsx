import React, { useRef } from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

/**
 * Wraps content and animates translateY on press (down 2px when pressed, like CSS :active).
 */
export const PressableWithAnimation: React.FC<Props> = ({
  onPress,
  children,
  style,
  disabled = false,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(translateY, {
      toValue: 2,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      disabled={disabled}
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
