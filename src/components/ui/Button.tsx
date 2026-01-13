import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';
import {spacing, borderRadius} from '@theme/spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.95, {damping: 15, stiffness: 200});
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 200});
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {paddingVertical: spacing.sm, paddingHorizontal: spacing.md};
      case 'lg':
        return {paddingVertical: spacing.lg, paddingHorizontal: spacing.xl};
      default:
        return {paddingVertical: spacing.md, paddingHorizontal: spacing.lg};
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'sm':
        return typography.labelSmall;
      case 'lg':
        return typography.labelLarge;
      default:
        return typography.labelMedium;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'primary' ? colors.background.primary : colors.gradient.cyan}
          size="small"
        />
      );
    }

    const textColor =
      variant === 'primary'
        ? colors.background.primary
        : variant === 'danger'
        ? colors.status.error
        : variant === 'ghost'
        ? colors.gradient.cyan
        : colors.text.primary;

    return (
      <Text style={[getTextSize(), {color: textColor, fontWeight: '600'}, textStyle]}>
        {title}
      </Text>
    );
  };

  if (variant === 'primary') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          animatedStyle,
          style,
        ]}>
        <LinearGradient
          colors={
            disabled
              ? [colors.background.tertiary, colors.background.tertiary]
              : [colors.gradient.cyan, colors.gradient.purple]
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradient, getSizeStyles()]}>
          {renderContent()}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        getSizeStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}>
      {renderContent()}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.transparent.pink20,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
