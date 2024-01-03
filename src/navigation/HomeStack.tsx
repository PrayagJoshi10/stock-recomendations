import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './Routes';
import Home from '../screens/home/Home';
import StockDetails from '../screens/home/StockDetails';
import Notification from '../screens/home/Notification';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOMESTACK.HOME} component={Home} />
      <Stack.Screen
        name={ROUTES.HOMESTACK.STOCK_DETAILS}
        component={StockDetails}
      />
      <Stack.Screen
        name={ROUTES.HOMESTACK.NOTIFICATION}
        component={Notification}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
