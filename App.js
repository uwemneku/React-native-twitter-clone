import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FAB from './src/components/FAB';
import BottomTabNavigator from './src/Navigation.js/BottomTabNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(29, 161, 242)',
    card: 'rgb(225, 232, 237)',
  },
};


export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      <NavigationContainer theme={MyTheme} >
          <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
