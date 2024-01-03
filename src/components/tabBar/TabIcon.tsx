import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

interface Props {
  focused: boolean;
  source: any;
}

const TabIcon = ({focused, source}: Props) => {
  return (
    <Image
      source={source}
      style={[
        styles.icon,
        {tintColor: focused ? Colors.blue : Colors.gray_700},
      ]}
    />
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
