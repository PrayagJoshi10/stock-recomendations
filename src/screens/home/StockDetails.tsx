import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../../components/headers/ScreenHeader';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import {
  calculateTotalInvestment,
  formatedDate,
  getData,
  setData,
} from '../../utils/Helper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../utils/Fonts';
import {PortfolioCardTypes} from '../../utils/Types';
import StockPricesCard from '../../components/cards/StockPricesCard';

interface Props {
  navigation: any;
  route: any;
}

const StockDetails = ({route, navigation}: Props) => {
  const {
    Symbol,
    Date: BuyDate,
    PercentageChange,
    High,
    Low,
    Close,
    Open,
    logo,
  } = route?.params?.item;

  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isKeyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    // Cleanup event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onBuy = async () => {
    if (!quantity && !price) {
      setError('Price & Quantity are required!');
      return;
    }
    if (!quantity) {
      setError('Quantity is required!');
      return;
    }
    if (!price) {
      setError('Quantity is required!');
      return;
    }

    try {
      const portfolioList = await getData('portfolio-items');
      const existingItem = portfolioList.find(
        (item: PortfolioCardTypes) =>
          item.Symbol === Symbol && item.Date === BuyDate,
      );

      if (existingItem) {
        Alert.alert(
          'Item already exists !',
          'This stock has already been added for the day. You can edit the stock from Portfolio',
        );
        return;
      }
      await portfolioList.push({
        Id: new Date(),
        Symbol: Symbol,
        Date: BuyDate,
        Quantity: quantity,
        Price: price,
        Logo: logo,
      });
      await setData('portfolio-items', portfolioList);
      setQuantity('');
      setPrice('');
      Alert.alert('Success', 'Added to portfolio succesfully.');
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  const handleTextChange = (text: string, setText: (text: string) => void) => {
    setError('');
    const numericInput = text.replace(/[^0-9.]/g, '');
    setText(numericInput);
    return;
  };

  const onHighPress = () => {
    setPrice(JSON.stringify(High));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader navigation={navigation} title={'Stock Details'} />
      <View style={styles.topContainer}>
        <View style={styles.stockDetailsContainer}>
          <Image
            source={logo ? {uri: logo} : Images.apple}
            style={styles.stockIcon}
            resizeMode="contain"
          />
          <View style={styles.stockLabelContainer}>
            <Text style={styles.stockName}>{Symbol}</Text>
            <Text style={styles.stockDate}>{formatedDate(BuyDate)}</Text>
          </View>
        </View>
        <View style={styles.stockPriceContainer}>
          <Text style={styles.percentageChange}>+{PercentageChange}%</Text>
        </View>
      </View>
      <View style={styles.stockPricesContainer}>
        <View style={styles.currentPriceContainer}>
          <Text style={styles.curentPrice}>Current Price : ₹ {Close}</Text>
        </View>
        <StockPricesCard Open={Open} Close={Close} High={High} Low={Low} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          placeholderTextColor={Colors.gray_400}
          onChangeText={text => {
            handleTextChange(text, setQuantity);
          }}
          value={quantity}
          keyboardType="numeric"
        />
        <View style={styles.priceInputContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Enter buy price"
            placeholderTextColor={Colors.gray_400}
            onChangeText={text => {
              handleTextChange(text, setPrice);
            }}
            value={price}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.priceButton} onPress={onHighPress}>
            <View style={styles.priceButtonContainer}>
              <Text style={styles.priceButtonLabel}>High</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.currentPriceContainer}>
          <Text style={styles.curentPrice}>
            Total Investment: {calculateTotalInvestment(price, quantity)}
          </Text>
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onBuy}>
            <Text style={styles.buttonLabel}>Add to Portfolio</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isKeyboardOpen && (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setKeyboardOpen(false);
          }}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default StockDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
  inputContainer: {
    paddingHorizontal: responsiveWidth(5.3),
    marginTop: 35,
  },
  // label: {
  //   color: Colors.gray_700,
  //   fontSize: 16,
  //   fontFamily: Fonts.urbanist_600,
  // },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: Colors.gray_400,
    borderBottomWidth: 0.5,
    color: Colors.gray_700,
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  priceInput: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: Colors.gray_400,
    borderBottomWidth: 0.5,
    color: Colors.gray_700,
    flex: 1,
  },
  priceButton: {
    marginLeft: 20,
  },
  priceButtonContainer: {
    borderColor: Colors.blue,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  priceButtonLabel: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  buttonContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  error: {
    marginTop: 10,
    color: Colors.red_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  button: {
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 8,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#00A9F1',
    elevation: 1,
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
