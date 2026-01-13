import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';
import {spacing, borderRadius} from '@theme/spacing';
import {DEFAULT_CATEGORIES} from '@app-types/category';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save expense:', {amount, description, selectedCategory});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>Add Expense</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={colors.text.muted}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {DEFAULT_CATEGORIES.map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name && styles.categorySelected,
                ]}
                onPress={() => setSelectedCategory(category.name)}>
                <View
                  style={[
                    styles.categoryIcon,
                    {backgroundColor: category.color + '20'},
                  ]}>
                  <Text style={[styles.categoryEmoji, {color: category.color}]}>
                    {category.icon === 'restaurant'
                      ? '🍔'
                      : category.icon === 'car'
                      ? '🚗'
                      : category.icon === 'shopping-bag'
                      ? '🛍️'
                      : category.icon === 'film'
                      ? '🎬'
                      : category.icon === 'file-text'
                      ? '📄'
                      : category.icon === 'heart'
                      ? '❤️'
                      : category.icon === 'book'
                      ? '📚'
                      : '📦'}
                  </Text>
                </View>
                <Text
                  style={styles.categoryName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {category.name.split(' ')[0]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="What was this expense for?"
            placeholderTextColor={colors.text.muted}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <Pressable style={styles.dateButton}>
            <Text style={styles.dateText}>Today</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AnimatedPressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSave}
          style={[styles.saveButton, buttonAnimatedStyle]}>
          <LinearGradient
            colors={[colors.gradient.cyan, colors.gradient.purple]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.saveButtonGradient}>
            <Text style={styles.saveButtonText}>Save Expense</Text>
          </LinearGradient>
        </AnimatedPressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  cancelButton: {
    ...typography.labelLarge,
    color: colors.text.secondary,
  },
  title: {
    ...typography.headingSmall,
    color: colors.text.primary,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  currencySymbol: {
    ...typography.displayLarge,
    color: colors.gradient.cyan,
    marginRight: spacing.xs,
  },
  amountInput: {
    ...typography.displayLarge,
    color: colors.text.primary,
    minWidth: 150,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.labelMedium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  categoryItem: {
    width: '25%',
    padding: spacing.xs,
    alignItems: 'center',
  },
  categorySelected: {
    backgroundColor: colors.transparent.white10,
    borderRadius: borderRadius.md,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  descriptionInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.bodyLarge,
    color: colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  dateText: {
    ...typography.bodyLarge,
    color: colors.text.primary,
  },
  chevron: {
    ...typography.headingMedium,
    color: colors.text.muted,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.secondary,
  },
  saveButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.labelLarge,
    color: colors.background.primary,
    fontWeight: '600',
  },
});
