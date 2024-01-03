import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Images from '../../utils/Images';
import Fonts from '../../utils/Fonts';

interface Props {
  navigation: any;
  title: string;
}

const ScreenHeader = ({navigation, title}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Image
          source={Images.back}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View />
    </View>
  );
};

export default ScreenHeader;

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
  button: {
    padding: 5,
  },
  backIcon: {
    height: responsiveHeight(2),
    minHeight: 16,
    width: responsiveHeight(2),
    minWidth: 16,
  },
  title: {
    color: Colors.gray_800,
    fontSize: 20,
    fontFamily: Fonts.urbanist_700,
  },
});
