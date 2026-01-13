import React from 'react';
import {Text as RNText, TextStyle, StyleSheet} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';

type TextVariant =
  | 'displayLarge'
  | 'displaySmall'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'caption';

type TextColor = 'primary' | 'secondary' | 'muted' | 'success' | 'error' | 'warning';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  gradient?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
  style?: TextStyle;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'bodyMedium',
  color = 'primary',
  gradient = false,
  gradientColors = colors.gradients.primary,
  style,
  numberOfLines,
}) => {
  const getColorValue = (): string => {
    switch (color) {
      case 'secondary':
        return colors.text.secondary;
      case 'muted':
        return colors.text.muted;
      case 'success':
        return colors.status.success;
      case 'error':
        return colors.status.error;
      case 'warning':
        return colors.status.warning;
      default:
        return colors.text.primary;
    }
  };

  const textStyle = [typography[variant], {color: getColorValue()}, style];

  if (gradient) {
    return (
      <MaskedView
        maskElement={
          <RNText style={textStyle} numberOfLines={numberOfLines}>
            {children}
          </RNText>
        }>
        <LinearGradient
          colors={gradientColors as unknown as string[]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <RNText style={[textStyle, styles.transparent]} numberOfLines={numberOfLines}>
            {children}
          </RNText>
        </LinearGradient>
      </MaskedView>
    );
  }

  return (
    <RNText style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  transparent: {
    opacity: 0,
  },
});
