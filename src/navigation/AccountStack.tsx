import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './Routes';
import Account from '../screens/account/Account';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.ACCOUNTSTCAK.ACCOUNT} component={Account} />
    </Stack.Navigator>
  );
};

export default AccountStack;
