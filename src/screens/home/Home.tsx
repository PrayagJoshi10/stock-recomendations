import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Header from '../../components/headers/Header';
import WelcomeCard from '../../components/cards/WelcomeCard';
import StockList from '../../components/lists/StockList';
import {StockListResponse} from '../../utils/Types';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

interface props {
  navigation: any;
}
const Home = ({navigation}: props) => {
  const [data, setData] = useState<StockListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<StockListResponse[]> = await axios.get(
          `${API_URL}/stocks`,
        );

        setData(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '35%'], []);

  const handleClosePress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const handleOpenPress = () => bottomSheetRef.current?.expand();
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
          console.log(item);
          handleOpenPress();
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <View>
          <Text>Hello</Text>
        </View>
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
});
