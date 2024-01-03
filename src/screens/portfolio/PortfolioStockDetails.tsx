import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import ScreenHeader from '../../components/headers/ScreenHeader';
import Images from '../../utils/Images';
import {formatedDate} from '../../utils/Helper';
import Colors from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {StockInfo} from '../../utils/Types';
import Loader from '../../components/loaders/Loader';

interface Props {
  navigation: any;
  route: any;
}

const PortfolioStockDetails = ({route, navigation}: Props) => {
  const {Symbol, Date, Quantity} = route?.params?.item;

  const [data, setData] = useState<StockInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const istTimestamp = moment
          .utc(Date)
          .tz('Asia/Kolkata')
          .format('YYYY-MM-DD');
        const apiUrl = `https://stock-market-lo24myw5sq-el.a.run.app/data?ticker=${Symbol}&date=${istTimestamp}&qty=${Quantity}`;

        const response = await axios.get(apiUrl);

        setData(response?.data?.StockInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    setLoading(true);
  }, [Date, Quantity, Symbol]);

  return (
    <View style={styles.container}>
      <ScreenHeader navigation={navigation} title={'Details'} />
      <View style={styles.loaderContainer}>
        <View style={styles.topContainer}>
          <View style={styles.stockDetailsContainer}>
            <Image
              source={data?.Stock.Logo ? {uri: data?.Stock.Logo} : Images.apple}
              style={styles.stockIcon}
              resizeMode="contain"
            />
            <View style={styles.stockLabelContainer}>
              <Text style={styles.stockName}>{Symbol}</Text>
              <Text style={styles.stockDate}>{formatedDate(Date)}</Text>
            </View>
          </View>
          <View style={styles.stockPriceContainer}>
            <Text style={styles.percentageChange}>Qty: {Quantity}</Text>
          </View>
        </View>
        <View style={styles.targetDetailsContainer}>
          <Text style={styles.currentPriceLabel}>
            Current Price: ₹ {data?.Stock?.Values?.LTP || '--'}
          </Text>
          <LinearGradient
            colors={['#F2FBFF', '#dceff7', '#EDF7FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientContainer}>
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>Target Price 1</Text>
              <Text style={styles.targetLabel}>
                ₹ {data?.Stock?.Values?.Target1 || '--'}
              </Text>
            </View>
            <View style={styles.targetContainer}>
              <Text style={styles.stopLossLabel}>Stop Loss</Text>
              <Text style={styles.stopLossLabel}>
                ₹ {data?.Stock?.Values?.SL || '--'}
              </Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>Target Price 2</Text>
              <Text style={styles.targetLabel}>
                ₹ {data?.Stock?.Values?.Target2 || '--'}
              </Text>
            </View>
            <View style={styles.targetContainer}>
              <Text style={styles.stopLossLabel}>Stop Loss</Text>
              <Text style={styles.stopLossLabel}>
                ₹ {data?.Stock?.Values?.SL || '--'}
              </Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>Target Price 3</Text>
              <Text style={styles.targetLabel}>
                ₹ {data?.Stock?.Values?.Target3 || '--'}
              </Text>
            </View>
            <View style={styles.targetContainer}>
              <Text style={styles.stopLossLabel}>Stop Loss</Text>
              <Text style={styles.stopLossLabel}>
                ₹ {data?.Stock?.Values?.SL || '--'}
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.profitDetailContainer}>
          <Text style={styles.currentPriceLabel}>
            Total Profit: ₹ {data?.TotalProfit?.Profit || '--'}
          </Text>
          <Text style={styles.currentPriceLabel}>
            Trade Status: {data?.TotalProfit?.['Trade Status']}
          </Text>
        </View>
        {loading && <Loader />}
      </View>
    </View>
  );
};

export default PortfolioStockDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 20,
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
  stockPriceContainer: {},
  percentageChange: {
    color: Colors.green_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_500,
    textAlign: 'right',
  },
  targetDetailsContainer: {
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 40,
  },
  currentPriceLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
    marginBottom: 20,
  },
  gradientContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.blue,
    gap: 20,
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  stopLossLabel: {
    color: Colors.red_600,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray_400,
  },
  profitDetailContainer: {
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 20,
  },
});
