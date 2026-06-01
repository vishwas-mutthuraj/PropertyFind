import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius } from '../theme';

interface SkeletonBoxProps {
  width?: number | `${number}%`;
  height: number;
  style?: ViewStyle;
}

export const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width, height, style }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.8] });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width: width ?? '100%', height },
        { opacity },
        style,
      ]}
    />
  );
};

export const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    <SkeletonBox height={162} style={{ borderRadius: 0 }} />
    <View style={styles.body}>
      <SkeletonBox height={11} width="70%" style={{ borderRadius: 6, marginBottom: 7 }} />
      <SkeletonBox height={11} width="55%" style={{ borderRadius: 6, marginBottom: 7 }} />
      <SkeletonBox height={11} width="45%" style={{ borderRadius: 6, marginTop: 12, marginBottom: 12 }} />
      <View style={styles.btnRow}>
        <SkeletonBox height={34} style={{ flex: 1, borderRadius: 9 }} />
        <SkeletonBox height={34} style={{ flex: 1, borderRadius: 9 }} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.surface3,
    borderRadius: Radius.sm,
  },
  card: {
    backgroundColor: Colors.surface2,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  body: {
    padding: 14,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
});
