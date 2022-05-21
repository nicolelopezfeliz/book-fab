import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import TabIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackScreens, TabsScreens } from "../helpers/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { primaryColor } from "../utils/Colors";

export const RootStack = createNativeStackNavigator<StackScreens>();
const Tabs = createBottomTabNavigator<TabsScreens>();

const navOptions = {
  headerStyle: {
    backgroundColor: "white",
    height: 85,
    elevation: 0,
    shadowColor: "transparent",
  },
  headerBackTitle: "Back",
  headerTintColor: primaryColor,
  gestureEnabled: false,
  headerHideShadow: true,
  headerMode: "float",
  headerTitle: () => <Text>Book Fab</Text>,
};

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const Navigation = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen name="TabsNavigator" component={TabsNavigator} />
  </RootStack.Navigator>
);

const Welcome = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
  </RootStack.Navigator>
);

const Loading = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
  </RootStack.Navigator>
);

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name == "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "SearchScreen") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name == "FavoritesScreen") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name == "ProfileScreen") {
            iconName = focused ? "user" : "user-o";
            return <Icon name={iconName} size={24} color={primaryColor} />;
          }
          return <TabIcon name={iconName} size={24} color={primaryColor} />;
        },
      })}
    >
      <Tabs.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(false);

  AsyncStorage.getItem("@viewedOnboarding").then((value) => {
    console.log('VALUEE: ', value);
    
});

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      console.log('Value: ', value);
      

      if(value !== null) {
        setViewOnboarding(true);
        console.log('Value !== null');
        
      };
    } catch (error) {
      console.log('Error @checkOnboarding: ', error);
    } finally {
      console.log('Kmr vi hit?');
      
      setLoading(false);
    };
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    console.log('Lyssnar på VIEWONBOARDING: ', viewOnboarding);
    
  }, [viewOnboarding]);

  return (
    <NavigationContainer ref={navigationRef}>

          {loading ? (
            <Loading />
          ) : viewOnboarding ? (
            <Navigation />
          ) : (
            <Welcome />
          )}

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});


