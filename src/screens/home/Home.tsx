import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/headers/Header';
import WelcomeCard from '../../components/cards/WelcomeCard';
import StockList from '../../components/lists/StockList';
import {StockListResponse} from '../../utils/Types';
import axios, {AxiosResponse} from 'axios';

interface props {
  navigation: any;
}
const Home = ({navigation}: props) => {
  const [data, setData] = useState<StockListResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://stock-market-lo24myw5sq-el.a.run.app/stocks';

        const response: AxiosResponse<StockListResponse[]> = await axios.get(
          apiUrl,
        );

        setData(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <StockList data={data} navigation={navigation} />
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
