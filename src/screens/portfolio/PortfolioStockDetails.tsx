import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import ScreenHeader from '../../components/headers/ScreenHeader';
import Images from '../../utils/Images';
import {
  calculateCurrentInvestment,
  calculateCurrentProfit,
  calculateTotalInvestment,
  formatedDate,
  getData,
  setData,
} from '../../utils/Helper';
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
import TargetCard from '../../components/cards/TargetCard';
import TradeDetails from '../../components/texts/TradeDetails';
import StockPricesCard from '../../components/cards/StockPricesCard';

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
  const [pricee, setPrice] = useState<string>(Price);

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
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.topContainer}>
            <View style={styles.stockDetailsContainer}>
              <Image
                source={
                  data?.Stock.Logo ? {uri: data?.Stock.Logo} : Images.apple
                }
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
                Total Qty: {quantityy}
              </Text>
            </View>
          </View>
          <StockPricesCard
            Open={data?.Stock?.Values?.Open}
            Close={data?.Stock?.Values?.Close}
            High={data?.Stock?.Values?.High}
            Low={data?.Stock?.Values?.Low}
          />
          <View style={styles.targetDetailsContainer}>
            <View style={styles.editContainer}>
              <View style={styles.priceDetailsContainer}>
                <TradeDetails label={'Buy Price'} value={pricee} />
                <TradeDetails
                  label={'Current Price'}
                  value={data?.Stock?.Values?.LTP}
                />
                <TradeDetails
                  label={'Total Investment'}
                  value={calculateTotalInvestment(pricee, quantityy)}
                />
                <TradeDetails
                  label={'Current Investment'}
                  value={calculateCurrentInvestment(
                    data?.Stock?.Values?.LTP,
                    quantityy,
                  )}
                />
                <TradeDetails
                  label={'Current P/L'}
                  value={calculateCurrentProfit(
                    pricee,
                    data?.Stock?.Values?.LTP,
                    quantityy,
                  )}
                />
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
              <TargetCard
                targetLabel="Target Price 1"
                target={data?.Stock?.Values?.Target1}
                stopLoss={data?.Stock?.Values?.SL}
                seperator={true}
                isAchieved={data?.TGT1 ? true : false}
              />
              <TargetCard
                targetLabel="Target Price 2"
                target={data?.Stock?.Values?.Target2}
                stopLoss={data?.Stock?.Values?.SL}
                seperator={true}
                isAchieved={data?.TGT2 ? true : false}
              />
              <TargetCard
                targetLabel="Target Price 3"
                target={data?.Stock?.Values?.Target3}
                stopLoss={data?.Stock?.Values?.SL}
                isAchieved={data?.TGT3 ? true : false}
              />
            </LinearGradient>
          </View>
          <View style={styles.profitDetailContainer}>
            <TradeDetails
              label={'Total Profit'}
              value={data?.TotalProfit?.Profit}
            />
            <TradeDetails
              label={'Trade Status'}
              value={data?.Entry?.['Trade Status']}
              isAmount={false}
            />
          </View>
          {loading && <Loader />}
          <EditPortfolioStockModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onPress={(price: string, quantity: string) => {
              onEdit(price, quantity);
            }}
          />
          <View style={styles.footer} />
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
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
  gradientContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.blue,
    gap: 20,
  },
  profitDetailContainer: {
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 20,
    gap: 10,
  },
  footer: {
    height: 40,
  },
});
