import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './Routes';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import Splash from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
        <Stack.Screen name={ROUTES.MAINSTACK.SPLASH} component={Splash} />
        <Stack.Screen name={ROUTES.AUTHSTACK.STACK} component={AuthStack} />
        <Stack.Screen name={ROUTES.MAINSTACK.STACK} component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
