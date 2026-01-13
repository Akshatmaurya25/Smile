import React from 'react';
import {View, Text, StyleSheet, StatusBar, Pressable} from 'react-native';
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

export const LoginScreen: React.FC = () => {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: buttonScale.value}],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, {damping: 15, stiffness: 200});
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, {damping: 15, stiffness: 200});
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <LinearGradient
        colors={[colors.background.primary, colors.background.secondary]}
        style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.header}>
            <LinearGradient
              colors={[colors.gradient.cyan, colors.gradient.purple]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.logoGradient}>
              <Text style={styles.logoText}>S</Text>
            </LinearGradient>
            <Text style={styles.title}>Welcome to Smile</Text>
            <Text style={styles.subtitle}>
              Your personal expense tracker{'\n'}with a smile
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <AnimatedPressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleGoogleSignIn}
              style={[styles.googleButton, buttonAnimatedStyle]}>
              <LinearGradient
                colors={[colors.gradient.cyan, colors.gradient.purple]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </LinearGradient>
            </AnimatedPressable>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </View>
        </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 100,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.displaySmall,
    color: colors.background.primary,
    fontWeight: '700',
  },
  title: {
    ...typography.headingLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  googleButton: {
    width: '100%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  googleIcon: {
    ...typography.headingMedium,
    color: colors.background.primary,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  buttonText: {
    ...typography.labelLarge,
    color: colors.background.primary,
    fontWeight: '600',
  },
  termsText: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
