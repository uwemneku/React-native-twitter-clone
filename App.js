import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerNavigation from './src/Navigation.js/DrawerNavigation';
import { PortalHost, PortalProvider } from '@gorhom/portal';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(29, 161, 242)',
    card: 'rgb(225, 232, 237)',
    text: 'rgb(101, 119, 134)',
  },
};


export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      <PortalProvider>
        <NavigationContainer theme={MyTheme} >
            <DrawerNavigation />
        </NavigationContainer>
      </PortalProvider>
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
