import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from './Routes';
import Portfolio from '../screens/portfolio/Portfolio';
import PortfolioStockDetails from '../screens/portfolio/PortfolioStockDetails';

const Stack = createNativeStackNavigator();

const PortfoiliStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.PORTFOLIOSTACK.PORTFOLIO}
        component={Portfolio}
      />
      <Stack.Screen
        name={ROUTES.PORTFOLIOSTACK.PORTFOLIO_STOCK_DETAILS}
        component={PortfolioStockDetails}
      />
    </Stack.Navigator>
  );
};

export default PortfoiliStack;
