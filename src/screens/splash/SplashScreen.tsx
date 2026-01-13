import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {duration: 600});
    logoScale.value = withSequence(
      withTiming(1.1, {duration: 400, easing: Easing.out(Easing.back(2))}),
      withTiming(1, {duration: 200}),
    );
    textOpacity.value = withDelay(400, withTiming(1, {duration: 400}));

    const timeout = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [logoScale, logoOpacity, textOpacity, onAnimationComplete]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: logoScale.value}],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.gradient}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <LinearGradient
            colors={[colors.gradient.cyan, colors.gradient.purple]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.logoGradient}>
            <Animated.Text style={styles.logoText}>S</Animated.Text>
          </LinearGradient>
        </Animated.View>
        <Animated.Text style={[styles.appName, textAnimatedStyle]}>
          Smile
        </Animated.Text>
        <Animated.Text style={[styles.tagline, textAnimatedStyle]}>
          Track your expenses with joy
        </Animated.Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...typography.displayLarge,
    color: colors.background.primary,
    fontWeight: '700',
  },
  appName: {
    ...typography.displaySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  tagline: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
