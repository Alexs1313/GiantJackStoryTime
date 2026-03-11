import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type Direction = 'up' | 'down' | 'left' | 'right';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: Direction;
};

/** Initial translate values: right/down use -offset, left/up use +offset (like motion BlurFade). */
function getInitialTranslate(
  direction: Direction,
  offset: number,
): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: offset };
    case 'down':
      return { x: 0, y: -offset };
    case 'left':
      return { x: offset, y: 0 };
    case 'right':
      return { x: -offset, y: 0 };
  }
}

export const BlurFadeView: React.FC<Props> = ({
  children,
  style,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  ...props
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const { x: fromX, y: fromY } = getInitialTranslate(direction, offset);

  useEffect(() => {
    translateX.setValue(fromX);
    translateY.setValue(fromY);
    opacity.setValue(0);

    const startDelay = 40 + delay * 1000;
    const animDuration = duration * 1000;

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: animDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [
    duration,
    delay,
    offset,
    direction,
    fromX,
    fromY,
    translateX,
    translateY,
    opacity,
  ]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateX }, { translateY }],
        },
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};
