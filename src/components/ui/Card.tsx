import React from 'react';
import {View, StyleSheet, ViewStyle, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '@theme/colors';
import {spacing, borderRadius} from '@theme/spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CardVariant = 'default' | 'elevated' | 'gradient-border';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  contentStyle,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, {damping: 15, stiffness: 200});
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 200});
  };

  const cardContent = (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  if (variant === 'gradient-border') {
    const CardWrapper = onPress ? AnimatedPressable : Animated.View;
    return (
      <CardWrapper
        style={[styles.gradientBorderContainer, animatedStyle, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <LinearGradient
          colors={[colors.gradient.cyan, colors.gradient.purple]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}>
          <View style={styles.gradientInner}>{cardContent}</View>
        </LinearGradient>
      </CardWrapper>
    );
  }

  if (onPress) {
    return (
      <AnimatedPressable
        style={[
          styles.card,
          variant === 'elevated' && styles.elevated,
          animatedStyle,
          style,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        {cardContent}
      </AnimatedPressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        style,
      ]}>
      {cardContent}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: colors.background.tertiary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    padding: spacing.md,
  },
  gradientBorderContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  gradientBorder: {
    padding: 2,
    borderRadius: borderRadius.lg,
  },
  gradientInner: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg - 2,
    overflow: 'hidden',
  },
});
