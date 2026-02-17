import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 24;
const THUMB_SIZE = 20;
const THUMB_OFF = 2;
const THUMB_TRAVEL = 30;

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
};

const CustomSwitch: React.FC<Props> = ({ value, onValueChange, style }) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, anim]);

  const thumbTranslateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_OFF, THUMB_TRAVEL],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onValueChange(!value)}
      style={[styles.wrapper, style]}
    >
      <View style={[styles.track, value && styles.trackOn]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  wrapper: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#323232',
    backgroundColor: '#fff',
    shadowColor: '#323232',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: '#2d8cf0',
  },
  thumb: {
    position: 'absolute',
    left: 0,
    top: -3.5,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#323232',
    backgroundColor: '#fff',
    shadowColor: '#323232',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
});
