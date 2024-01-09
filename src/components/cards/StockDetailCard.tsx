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
import {StockListResponse} from '../../utils/Types';
import {MotiView} from 'moti';

interface Props {
  item: StockListResponse;
  index: number;
  onPress: () => void;
  onLongPress: () => void;
}

const StockDetailCard = ({item, index, onPress, onLongPress}: Props) => {
  const {Symbol, Date, High, PercentageChange, logo} = item;
  return (
    <MotiView
      from={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{
        delay: 1000 + index * 100,
      }}>
      <View style={styles.container}>
        <View style={styles.shadow}>
          <LinearGradient
            colors={['#F2FBFF', '#dceff7', '#EDF7FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientContainer}>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonContainer}>
              <View style={styles.stockDetailsContainer}>
                <Image
                  source={logo ? {uri: logo} : Images.apple}
                  style={styles.stockIcon}
                  resizeMode="contain"
                />
                <View style={styles.stockLabelContainer}>
                  <Text style={styles.stockName}>{Symbol}</Text>
                  <Text style={styles.stockDate}>{formatedDate(Date)}</Text>
                </View>
              </View>
              <View style={styles.stockPriceContainer}>
                <Text style={styles.percentageChange}>
                  +{PercentageChange}%
                </Text>
                <Text style={styles.priceChange}>{High}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </MotiView>
  );
};

export default StockDetailCard;

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
  buttonContainer: {
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
    gap: 5,
  },
  percentageChange: {
    color: Colors.green_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
    textAlign: 'right',
  },
  priceChange: {
    color: Colors.gray_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
    textAlign: 'right',
  },
});
