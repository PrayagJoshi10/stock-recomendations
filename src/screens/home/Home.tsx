import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/headers/Header';
import WelcomeCard from '../../components/cards/WelcomeCard';
import StockList from '../../components/lists/StockList';
import {StockListResponse} from '../../utils/Types';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';

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
  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          console.log('notification pressed');
        }}
      />
      <WelcomeCard onPress={() => console.log('Invest Today')} />
      <StockList data={data} navigation={navigation} loading={loading} />
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
