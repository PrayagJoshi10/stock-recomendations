import React from 'react';
import {ROUTES} from './Routes';
import HomeStack from './HomeStack';
import PortfoiliStack from './PortfoiliStack';
import AccountStack from './AccountStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Images from '../utils/Images';
import TabIcon from '../components/tabBar/TabIcon';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
}

const HomeIcon: React.FC<TabBarIconProps> = ({focused}) => {
  return <TabIcon source={Images.home} focused={focused} />;
};
const ProfileIcon: React.FC<TabBarIconProps> = ({focused}) => {
  return <TabIcon source={Images.portfolio} focused={focused} />;
};
const AccountIcon: React.FC<TabBarIconProps> = ({focused}) => {
  return <TabIcon source={Images.account} focused={focused} />;
};

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 50},
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Fonts.urbanist_600,
          marginBottom: 3,
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.gray_700,
      }}>
      <Tab.Screen
        name={ROUTES.HOMESTACK.STACK}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name={ROUTES.PORTFOLIOSTACK.STACK}
        component={PortfoiliStack}
        options={{
          title: 'Portfolio',
          tabBarIcon: ProfileIcon,
        }}
      />
      <Tab.Screen
        name={ROUTES.ACCOUNTSTCAK.STACK}
        component={AccountStack}
        options={{
          title: 'Account',
          tabBarIcon: AccountIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
