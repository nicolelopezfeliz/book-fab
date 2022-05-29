import React, { FC } from "react";
import { StyleSheet, Text, Button, Dimensions, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import {  useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { getCurrentLogedInUser } from "../services/firebaseServices";
import MissingAuthScreen from "./MissingAuthScreen";

interface IProfileScreen {
  navigation: NativeStackNavigationProp<any, any>;
};

interface IProtectedItems {
    children: React.ReactNode;
    navigation: NativeStackNavigationProp<any, any>,
}

const ProtectedItems: React.FC<IProtectedItems> = ({ children, navigation }) => {
  const authStatus = useSelector((state: RootState) => state.localData.loggingInUser);

  if (authStatus === null) return <MissingAuthScreen navigation={navigation}/>;
  return <>{children || null}</>;
};

const ProfileScreen: FC<IProfileScreen> = ({ navigation }) => {


  return (
    <ProtectedItems navigation={navigation}>
      <ScrollView style={styles.container}>
        <Text>Profile Screen</Text>
        <Button
          title="Press Me!"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        />
      </ScrollView>
    </ProtectedItems>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "green",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
