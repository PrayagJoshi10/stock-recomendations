import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './Routes';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {getData} from '../utils/Helper';
import Splash from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<string>('');
  const [isProccessing, setisProccessing] = useState<boolean>(true);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const isLoggedInValue = await getData('isLoggedIn');

      if (isLoggedInValue) {
        setIsLoggedIn(isLoggedInValue);
      }
      setisProccessing(false);
    };
    checkIsLoggedIn();
  }, [isLoggedIn]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
        {!isLoggedIn && !isProccessing && (
          <Stack.Screen name={ROUTES.AUTHSTACK.STACK} component={AuthStack} />
        )}
        {!isProccessing && (
          <Stack.Screen name={ROUTES.MAINSTACK.STACK} component={MainStack} />
        )}
        {isProccessing && (
          <Stack.Screen name={ROUTES.MAINSTACK.SPLASH} component={Splash} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
