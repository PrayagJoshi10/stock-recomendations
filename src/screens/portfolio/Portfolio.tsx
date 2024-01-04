import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PortfolioList from '../../components/lists/PortfolioList';
import Colors from '../../utils/Colors';
import {useFocusEffect} from '@react-navigation/native';
import ScreenHeader from '../../components/headers/ScreenHeader';

interface Props {
  navigation: any;
}

const Portfolio = ({navigation}: Props) => {
  const [portfolioData, setPortfolioData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getJsonData();
    }, []),
  );

  const getJsonData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('portfolio-items');
      setPortfolioData(jsonValue != null ? JSON.parse(jsonValue) : []);

      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.log('Error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Portfolio" navigation={navigation} />
      <PortfolioList data={portfolioData} navigation={navigation} />
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
