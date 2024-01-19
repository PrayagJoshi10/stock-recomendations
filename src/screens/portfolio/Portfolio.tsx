import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PortfolioList from '../../components/lists/PortfolioList';
import Colors from '../../utils/Colors';
// import {useFocusEffect} from '@react-navigation/native';
import ScreenHeader from '../../components/headers/ScreenHeader';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {formatedDate, setData} from '../../utils/Helper';
import Fonts from '../../utils/Fonts';
import Loader from '../../components/loaders/Loader';
import {API_URL, TOKEN} from '@env';
import moment from 'moment-timezone';
import axios from 'axios';
interface Props {
  navigation: any;
}

const Portfolio = ({navigation}: Props) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [filteredPortfolioData, setFilteredPortfolioData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState<any>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '35%'], []);

  const handleClosePress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getJsonData();
  //   }, []),
  // );

  useEffect(() => {
    getJsonData();
  }, []);

  useEffect(() => {
    const uniqueDates = Array.from(
      new Set(portfolioData.map((item: any) => item.Date)),
    );
    setDates(uniqueDates);
  }, [portfolioData]);

  const getJsonData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('portfolio-items');
      let values = jsonValue != null ? JSON.parse(jsonValue) : [];
      if (values.length > 0) {
        for (let index = 0; index < values.length; index++) {
          const istTimestamp = moment
            .utc(values[index].Date)
            .tz('Asia/Kolkata')
            .format('YYYY-MM-DD');
          const apiUrl = `${API_URL}/data?ticker=${values[index].Symbol}&date=${istTimestamp}&qty=${values[index].Quantity}`;

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          values = values.map((item: any) => {
            if (item.Id === values[index].Id) {
              // Modify the properties of the item as needed
              item.Level = response?.data?.StockInfo?.Stock?.Levels;
            }
            return item;
          });
        }

        await setData('portfolio-items', values);
      }
      values.reverse();
      setPortfolioData(values);
      setFilteredPortfolioData(values);
      setLoading(false);
      return values;
    } catch (e) {
      // error reading value
      console.log('Error: ', e);
      setLoading(false);
    }
  };
  const filterData = () => {
    const data = portfolioData.filter(
      (item: any) => item.Date === selectedDate,
    );
    setFilteredPortfolioData(data);
    handleClosePress();
  };

  const onDetele = async (item: any) => {
    const jsonValue = await AsyncStorage.getItem('portfolio-items');
    let values = jsonValue != null ? JSON.parse(jsonValue) : [];

    const newValues = values.filter((data: any) => data.Id !== item.Id);
    newValues.reverse();
    setPortfolioData(newValues);
    setFilteredPortfolioData(newValues);
    await setData('portfolio-items', newValues);
  };

  const clearFilter = () => {
    setSelectedDate('');
    setFilteredPortfolioData(portfolioData);
    handleClosePress();
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

  return (
    <View style={styles.container}>
      <ScreenHeader title="Portfolio" navigation={navigation} />
      {!loading && (
        <PortfolioList
          data={filteredPortfolioData}
          navigation={navigation}
          onPress={() => {
            handleOpenPress();
          }}
          onLongPress={item => {
            Alert.alert(
              'Delete',
              'Are you sure you want to delete this stock?',
              [
                {
                  style: 'destructive',
                  text: 'Delete',
                  onPress: () => {
                    onDetele(item);
                  },
                },
                {
                  style: 'cancel',
                  text: 'Cancel',
                  onPress: () => {
                    return;
                  },
                },
              ],
            );
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.dateTitle}>Date</Text>

          <View style={styles.listContainer}>
            <FlatList
              data={dates}
              showsVerticalScrollIndicator={false}
              horizontal
              renderItem={item => (
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
                    selectedDate === item.item ? styles.selected : {},
                  ]}
                  onPress={() => setSelectedDate(item.item)}>
                  <Text
                    style={[
                      styles.date,
                      selectedDate === item.item ? styles.selectedDate : {},
                    ]}>
                    {formatedDate(item.item)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.applyButton} onPress={clearFilter}>
              <Text style={styles.applyButtonLabel}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={filterData}
              disabled={selectedDate ? false : true}>
              <Text style={styles.applyButtonLabel}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      {loading && <Loader />}
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTitle: {
    color: Colors.gray_700,
    fontSize: 18,
    fontFamily: Fonts.urbanist_600,
  },
  listContainer: {
    height: 40,
    width: 250,
    marginVertical: 20,
  },
  dateContainer: {
    padding: 5,
    borderColor: Colors.gray_500,
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    width: 100,
  },
  selected: {
    borderColor: Colors.green_700,
    borderWidth: 1,
  },
  date: {
    color: Colors.gray_500,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  selectedDate: {
    color: Colors.green_700,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
  },
  applyButton: {
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
  applyButtonLabel: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
});
