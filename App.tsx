// App.js
import React from 'react';
import {
  Image, Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToastProvider from 'react-native-toast-message';

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import SignScreen from './SignScreen';
import ForgetScreen from './ForgetScreen';
import GetStartScreen from './GetStartScreen';
import MainHomeScreen from './MainHomeScreen';
import ProfileScreen from './ProfileScreen';
import SaveScreen from './SaveScreen';
import ShoppingScreen from './ShoppingScreen';
import Payment from './Payment';
import Setting from './Setting';
import ProductDetails from './ProductDetails';
import AboutUsScreen from './AboutUsScreen';
import FeedbackScreen from './FeedbackScreen';
import ThemeScreen from './ThemeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// MainStack contains the screens without the bottom tabs
const MainStack = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgetScreen" component={ForgetScreen} options={{ headerShown: false }} />
    <Stack.Screen name="GetStartScreen" component={GetStartScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="MainHomeScreen"
      component={MainHomeScreenWithTabs} // Using the wrapper component with tabs
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: true, title: 'Profile', headerTitleAlign: 'center' }}
    />
    <Stack.Screen name="SaveScreen" component={SaveScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
    <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
    <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ThemeScreen" component={ThemeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);


const MainHomeScreenWithTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard:true,
      tabBarStyle: { height: 60, backgroundColor: '#F83758',borderTopStartRadius:20,borderTopEndRadius:20 },
    }}
    
  >
    <Tab.Screen
      name="MainHomeScreen"
      component={MainHomeScreen}
      options={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: 'white', marginBottom: 4 }}>Home</Text>
        ),
        tabBarIcon: () => (
          <Image source={require('./assets/home.png')} style={{ tintColor: 'white', width: 24, height: 24 }} />
        ),
       
      }}
    />
    <Tab.Screen
      name="ShoppingScreen"
      component={ShoppingScreen}
      options={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: 'white', marginBottom: 4 }}>Shopping</Text>
        ),
        tabBarIcon: () => (
          <Image source={require('./assets/shopping.png')} style={{ tintColor: 'white', width: 24, height: 24 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Payment"
      component={Payment}
      options={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: 'white', marginBottom: 4 }}>Payment</Text>
        ),
        tabBarIcon: () => (
          <Image source={require('./assets/payment.png')} style={{ tintColor: 'white', width: 24, height: 24 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Setting}
      options={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: 'white', marginBottom: 4 }}>Setting</Text>
        ),
        tabBarIcon: () => (
          <Image source={require('./assets/setting.png')} style={{ tintColor: 'white', width: 24, height: 24 }} />
        ),
      }}
    />
  </Tab.Navigator>
);


function App() {
  return (
    <NavigationContainer>
      <MainStack />
      {/* Wrap the entire app with ToastProvider */}
      <ToastProvider />
    </NavigationContainer>
  );
}

export default App;
