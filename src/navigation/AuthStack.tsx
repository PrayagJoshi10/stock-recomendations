import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginSignup from '../screens/auth/LoginSignup';
import {ROUTES} from './Routes';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.AUTHSTACK.LOGIN_SIGNUP}
        component={LoginSignup}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
