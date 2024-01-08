import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {formatedDate} from '../../utils/Helper';
import {PortfolioCardTypes} from '../../utils/Types';

interface Props {
  item: PortfolioCardTypes;
  onPress: () => void;
}

const PortfolioCard = ({item, onPress}: Props) => {
  const {Symbol, Date, Quantity, Logo} = item;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.shadow}>
        <LinearGradient
          colors={['#F2FBFF', '#dceff7', '#EDF7FF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientContainer}>
          <View style={styles.contetContainer}>
            <View style={styles.stockDetailsContainer}>
              <Image
                source={Logo ? {uri: Logo} : Images.apple}
                style={styles.stockIcon}
                resizeMode="contain"
              />
              <View style={styles.stockLabelContainer}>
                <Text style={styles.stockName}>{Symbol}</Text>
                <Text style={styles.stockDate}>{formatedDate(Date)}</Text>
              </View>
            </View>
            <View style={styles.stockPriceContainer}>
              <Text style={styles.label}>Qty: </Text>
              <Text style={styles.priceChange}>{Quantity}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default PortfolioCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(5.3),
    marginBottom: 10,
    borderRadius: 8,
  },
  shadow: {
    backgroundColor: Colors.white,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#00A9F1',
    elevation: 1,
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  gradientContainer: {
    backgroundColor: Colors.shadow_blue,
    paddingTop: 14,
    paddingBottom: 20,
    paddingLeft: 14,
    paddingRight: 20,
  },
  contetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIcon: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    marginRight: 10,
  },
  stockLabelContainer: {
    gap: 5,
  },
  stockName: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  stockDate: {
    color: Colors.gray_400,
    fontSize: 12,
    fontFamily: Fonts.urbanist_500,
  },
  stockPriceContainer: {
    flexDirection: 'row',
  },
  percentageChange: {
    color: Colors.green_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
    textAlign: 'right',
  },
  label: {
    color: Colors.gray_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
  },
  priceChange: {
    color: Colors.gray_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
    textAlign: 'right',
  },
});
