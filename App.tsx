/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { config } from '@gluestack-ui/config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import SplashScreen from './src/screen/SplashScreen';
import MainScreen from './src/screen/MainScreen';
import DetailContactScreen from './src/screen/DetailContactScreen';
import { store } from './src/state/store';
import AddContactScreen from './src/screen/AddContactScreen';
import { RootStackParamList } from './src/types/navigationTypes';
import UpdateContactScreen from './src/screen/UpdateContactScreen';
import { CColor } from './src/theme/CColor';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashScreen}/>
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='DetailContact' component={DetailContactScreen} options={{headerShown: true, title: "Detil Kontak"}}/>
            <Stack.Screen name='AddContact' component={AddContactScreen} options={{headerShown: true, title: "Tambah Kontak"}}/>
            <Stack.Screen name='UpdateContact' component={UpdateContactScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
