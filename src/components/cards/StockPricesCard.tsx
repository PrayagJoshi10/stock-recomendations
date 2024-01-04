import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';

interface Props {
  Open: number | string | undefined;
  Close: number | string | undefined;
  High: number | string | undefined;
  Low: number | string | undefined;
}

const StockPricesCard = ({Open, Close, High, Low}: Props) => {
  return (
    <View style={styles.openCloseContainer}>
      <View style={styles.pricesContainer}>
        <View style={styles.priceLabelContainer}>
          <Text style={styles.priceLabel}>Open: </Text>
          <Text style={styles.openPrice}>₹ {Open || '--'}</Text>
        </View>
        <View style={styles.priceLabelContainer}>
          <Text style={styles.priceLabel}>Close: </Text>
          <Text style={styles.closePrice}>₹ {Close || '--'}</Text>
        </View>
      </View>
      <View style={styles.pricesContainer}>
        <View style={styles.priceLabelContainer}>
          <Text style={styles.priceLabel}>High: </Text>
          <Text style={styles.highPrice}>₹ {High || '--'}</Text>
        </View>
        <View style={styles.priceLabelContainer}>
          <Text style={styles.priceLabel}>Low: </Text>
          <Text style={styles.lowPrice}>₹ {Low || '--'}</Text>
        </View>
      </View>
    </View>
  );
};

export default StockPricesCard;

const styles = StyleSheet.create({
  stockPricesContainer: {},
  currentPriceContainer: {
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 25,
  },
  curentPrice: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_700,
  },
  openCloseContainer: {
    // borderColor: Colors.blue,
    // borderWidth: 0.5,
    padding: 25,
    marginTop: 25,
    marginHorizontal: responsiveWidth(5.3),
    borderRadius: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#00A9F1',
    elevation: 1,
    shadowOpacity: 0.7,
    shadowRadius: 1,
  },
  pricesContainer: {
    gap: 30,
  },
  priceLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
  },
  priceLabel: {
    color: Colors.gray_400,
    fontSize: 12,
    fontFamily: Fonts.urbanist_500,
    marginRight: 5,
  },
  openPrice: {
    color: Colors.gray_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_700,
  },
  closePrice: {
    color: Colors.blue_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_700,
  },
  highPrice: {
    color: Colors.green_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_700,
  },
  lowPrice: {
    color: Colors.red_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_700,
  },
});
