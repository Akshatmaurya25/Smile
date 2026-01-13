import React from 'react';
import {View, Text, StyleSheet, Pressable, Switch, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';
import {spacing, borderRadius} from '@theme/spacing';

interface SettingItemProps {
  label: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  label,
  value,
  hasSwitch,
  switchValue,
  onSwitchChange,
  onPress,
}) => (
  <Pressable
    style={styles.settingItem}
    onPress={onPress}
    disabled={hasSwitch}>
    <Text style={styles.settingLabel}>{label}</Text>
    {hasSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{
          false: colors.background.tertiary,
          true: colors.gradient.cyan,
        }}
        thumbColor={colors.text.primary}
      />
    ) : (
      <View style={styles.settingValue}>
        <Text style={styles.settingValueText}>{value}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    )}
  </Pressable>
);

export const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem label="Currency" value="USD ($)" onPress={() => {}} />
            <SettingItem
              label="Notifications"
              hasSwitch
              switchValue={notifications}
              onSwitchChange={setNotifications}
            />
            <SettingItem
              label="Week Starts On"
              value="Monday"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.sectionContent}>
            <SettingItem label="Export Data" value="" onPress={() => {}} />
            <SettingItem label="Clear All Data" value="" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <SettingItem label="Version" value="1.0.0" />
            <SettingItem label="Privacy Policy" value="" onPress={() => {}} />
            <SettingItem label="Terms of Service" value="" onPress={() => {}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.headingLarge,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.labelSmall,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.secondary,
  },
  settingLabel: {
    ...typography.bodyLarge,
    color: colors.text.primary,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  chevron: {
    ...typography.headingMedium,
    color: colors.text.muted,
  },
});
