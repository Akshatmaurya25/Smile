import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';
import {spacing, borderRadius} from '@theme/spacing';
import type {RootStackParamList, MainTabParamList} from '@app-types/navigation';

import {
  SplashScreen,
  LoginScreen,
  HomeScreen,
  ExpenseHistoryScreen,
  AddExpenseScreen,
  ProfileScreen,
  SettingsScreen,
} from '@screens/index';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({focused, icon, label}) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
      {label}
    </Text>
  </View>
);

interface FABProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({onPress}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, {damping: 15, stiffness: 200});
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 200});
  };

  return (
    <AnimatedPressable
      style={[styles.fab, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <LinearGradient
        colors={[colors.gradient.cyan, colors.gradient.purple]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.fabGradient}>
        <Text style={styles.fabIcon}>+</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
};

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={ExpenseHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="📋" label="History" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="👤" label="Profile" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon="⚙️" label="Settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface MainWithFABProps {
  navigation: any;
}

const MainWithFAB: React.FC<MainWithFABProps> = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <MainTabs />
      <FloatingActionButton onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

export const Navigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate checking auth state
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For now, skip to main app for testing UI
      // In production, this would check Firebase auth state
      setIsAuthenticated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen onAnimationComplete={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.background.primary},
        }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainWithFAB} />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  tabBar: {
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.secondary,
    height: 80,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  tabLabelActive: {
    color: colors.gradient.cyan,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: colors.gradient.cyan,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 32,
    color: colors.background.primary,
    fontWeight: '300',
    marginTop: -2,
  },
});
