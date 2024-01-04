import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import ScreenHeader from '../../components/headers/ScreenHeader';
import Images from '../../utils/Images';
import {formatedDate, getData, setData} from '../../utils/Helper';
import Colors from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {StockInfo} from '../../utils/Types';
import Loader from '../../components/loaders/Loader';
import EditPortfolioStockModal from '../../components/modals/EditPortfolioStockModal';

interface Props {
  navigation: any;
  route: any;
}

const PortfolioStockDetails = ({route, navigation}: Props) => {
  const {Symbol, Date, Quantity, Id, Price} = route?.params?.item;

  const [data, setDataa] = useState<StockInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [quantityy, setQuantity] = useState<string>(Quantity);
  const [pricee, setPrice] = useState<string>(Quantity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const istTimestamp = moment
          .utc(Date)
          .tz('Asia/Kolkata')
          .format('YYYY-MM-DD');
        const apiUrl = `https://stock-market-lo24myw5sq-el.a.run.app/data?ticker=${Symbol}&date=${istTimestamp}&qty=${quantityy}`;

        const response = await axios.get(apiUrl);

        setDataa(response?.data?.StockInfo);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    quantityy && fetchData();
    setLoading(true);
  }, [Date, Quantity, Symbol, quantityy]);

  const onEdit = async (price: string, quantity: string) => {
    const portfolioList = await getData('portfolio-items');

    const newPortfolioList = portfolioList.map((item: any) => {
      if (item.Id === Id) {
        // Modify the properties of the item as needed
        item.Price = price ? price : Price; // Example modification
        item.Quantity = quantity ? quantity : Quantity; // Another example modification
      }
      return item;
    });
    await setData('portfolio-items', newPortfolioList);
    quantity && setQuantity(quantity);
    price && setPrice(price);
    setModalVisible(false);
  };

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
            <Text style={styles.percentageChange}>Total Qty: {quantityy}</Text>
          </View>
        </View>
        <View style={styles.targetDetailsContainer}>
          <View style={styles.editContainer}>
            <View style={styles.priceDetailsContainer}>
              <Text style={styles.currentPriceLabel}>
                Buy Price: ₹ {pricee || '--'}
              </Text>
              <Text style={styles.currentPriceLabel}>
                Current Price: ₹ {data?.Stock?.Values?.LTP || '--'}
              </Text>
              <Text style={styles.currentPriceLabel}>
                Total Investment: ₹ {Number(quantityy) * Number(pricee) || '--'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setModalVisible(true)}>
              <View style={styles.editButtonContainer}>
                <Text style={styles.editButtonLabel}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
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
            Trade Status: {data?.Entry?.['Trade Status']}
          </Text>
        </View>
        {loading && <Loader />}
        <EditPortfolioStockModal
          modalVisible={modalVisible}
          onPress={(price: string, quantity: string) => {
            onEdit(price, quantity);
          }}
        />
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
  priceDetailsContainer: {
    gap: 5,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editButton: {},
  editButtonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.green_100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.green_700,
    borderWidth: 0.5,
  },
  editButtonLabel: {
    color: Colors.green_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  currentPriceLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
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
