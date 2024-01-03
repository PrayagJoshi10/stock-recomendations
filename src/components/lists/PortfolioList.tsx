import {FlatList, StyleSheet, Text, View} from 'react-native';
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
}

const PortfolioList = ({data, navigation}: Props) => {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <PortfolioCard
                item={item}
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
});
