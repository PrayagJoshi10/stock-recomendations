import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../../utils/Images';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

interface Props {
  onPress: () => void;
}

const Header = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      {/* <Image source={Images.logo} style={styles.logo} resizeMode="contain" /> */}
      <Text style={styles.logo}>S t o c k</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image
          source={Images.notification}
          style={styles.notification}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(5.6),
    minHeight: 46,
    width: '100%',
    paddingHorizontal: responsiveWidth(5.3),
  },
  logo: {
    color: Colors.gray_700,
    fontSize: 24,
    fontFamily: Fonts.urbanist_700,
  },
  button: {
    padding: 10,
  },
  notification: {
    height: responsiveHeight(1.9),
    width: responsiveWidth(3.7),
    minHeight: 16,
    minWidth: 14,
    tintColor: Colors.gray_700,
  },
});
