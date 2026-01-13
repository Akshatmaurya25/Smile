import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';
import {spacing, borderRadius} from '@theme/spacing';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>User</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <LinearGradient
            colors={[colors.background.tertiary, colors.background.secondary]}
            style={styles.cardGradient}>
            <Text style={styles.cardLabel}>Total Spent This Month</Text>
            <Text style={styles.cardAmount}>$0.00</Text>
            <View style={styles.cardStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Expenses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>$0.00</Text>
                <Text style={styles.statLabel}>Daily Avg</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={[colors.gradient.cyan, colors.gradient.purple]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cardBorder}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>Pie Chart Coming Soon</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>Line Chart Coming Soon</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to add your first expense
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  greeting: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
  },
  username: {
    ...typography.headingLarge,
    color: colors.text.primary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gradient.cyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.labelLarge,
    color: colors.background.primary,
    fontWeight: '600',
  },
  summaryCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: spacing.lg,
  },
  cardBorder: {
    height: 3,
  },
  cardLabel: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  cardAmount: {
    ...typography.displaySmall,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.headingSmall,
    color: colors.gradient.cyan,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border.primary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.headingSmall,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  seeAll: {
    ...typography.labelMedium,
    color: colors.gradient.cyan,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderStyle: 'dashed',
  },
  placeholderText: {
    ...typography.bodyMedium,
    color: colors.text.muted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.bodySmall,
    color: colors.text.muted,
    textAlign: 'center',
  },
});
