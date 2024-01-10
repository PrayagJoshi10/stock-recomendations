import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Header from '../../components/headers/Header';
import WelcomeCard from '../../components/cards/WelcomeCard';
import StockList from '../../components/lists/StockList';
import {PortfolioCardTypes, StockListResponse} from '../../utils/Types';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';
import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image} from 'moti';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import {TextInput} from 'react-native-gesture-handler';
import {getJsonData, setData} from '../../utils/Helper';
import {useFocusEffect} from '@react-navigation/native';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};
interface props {
  navigation: any;
}
const Home = ({navigation}: props) => {
  const [data, setDataa] = useState<StockListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<StockListResponse[]> = await axios.get(
          `${API_URL}/stocks`,
        );

        setDataa(response?.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          bottomSheetRef.current?.snapToIndex(1);
        },
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          bottomSheetRef.current?.snapToIndex(0);
        },
      );

      // Cleanup event listeners when the component unmounts
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []),
  );

  const handleClosePress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const handleOpenPress = () => {
    setQuantity('');
    setError('');
    bottomSheetRef.current?.snapToIndex(0);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const onBuy = async () => {
    if (!quantity) {
      setError('Quantity is required!');
      return;
    }

    try {
      const portfolioList = await getJsonData('portfolio-items');
      const existingItem = portfolioList.find(
        (item: PortfolioCardTypes) =>
          item.Symbol === selectedItem.Symbol &&
          item.Date === selectedItem.Date,
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
        Symbol: selectedItem.Symbol,
        Date: selectedItem.Date,
        Quantity: quantity,
        Price: selectedItem.High,
        Logo: selectedItem.logo,
      });
      await setData('portfolio-items', portfolioList);
      setQuantity('');
      Alert.alert('Success', 'Added to portfolio succesfully.', [
        {text: 'OK', onPress: () => handleClosePress()},
      ]);
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

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          console.log('notification pressed');
        }}
      />
      <WelcomeCard onPress={() => console.log('Invest Today')} />
      <StockList
        data={data}
        navigation={navigation}
        loading={loading}
        onLongPress={item => {
          setSelectedItem(item);
          handleOpenPress();
          ReactNativeHapticFeedback.trigger('impactMedium', options);
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <KeyboardAvoidingView
          style={styles.bottomSheetContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.feedback}>
              <View style={styles.stockDetailsContainer}>
                <Image
                  source={{
                    uri: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532947.png',
                  }}
                  style={styles.image}
                />
                <Text style={styles.title}>IRB.NS</Text>
                <Text style={styles.title}>1000</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Quantity"
                  placeholderTextColor={Colors.green_600}
                  value={quantity}
                  onChangeText={text => {
                    handleTextChange(text, setQuantity);
                  }}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.error}>{error}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onBuy}>
                  <Text style={styles.buttonLabel}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5.3),
  },
  feedback: {
    flex: 1,
  },
  stockDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
  },
  title: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: Colors.green_500,
    marginTop: 20,
    backgroundColor: 'rgba(23, 206, 146, 0.09)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  error: {
    marginTop: 10,
    color: Colors.red_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
    width: '100%',
    textAlign: 'center',
  },
});
