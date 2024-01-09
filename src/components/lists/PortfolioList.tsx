import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import {PortfolioCardTypes} from '../../utils/Types';
import {ROUTES} from '../../navigation/Routes';
import PortfolioCard from '../cards/PortfolioCard';

interface Props {
  data: PortfolioCardTypes[];
  navigation: any;
  onPress: () => void;
}

const PortfolioList = ({data, navigation, onPress}: Props) => {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <PortfolioCard
                item={item}
                index={index}
                onPress={() =>
                  navigation.navigate(
                    ROUTES.PORTFOLIOSTACK.PORTFOLIO_STOCK_DETAILS,
                    {
                      item: item,
                    },
                  )
                }
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View />}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerLabel}>Your Investments</Text>
              <TouchableOpacity
                style={styles.filterContainer}
                onPress={onPress}>
                <Text style={styles.filterLabel}>Filter</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={styles.noStocksContainer}>
          <Text style={styles.noStocksLabel}>No Stocks To Disoplay !</Text>
        </View>
      )}
    </View>
  );
};

export default PortfolioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: responsiveWidth(5.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_700,
  },
  noStocksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStocksLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_700,
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: Colors.gray_400,
    borderWidth: 0.5,
  },
  filterLabel: {
    color: Colors.gray_700,
    fontSize: 12,
    fontFamily: Fonts.urbanist_400,
  },
});
