import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import StockDetailCard from '../cards/StockDetailCard';
import {StockListResponse} from '../../utils/Types';
import {ROUTES} from '../../navigation/Routes';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Loader from '../loaders/Loader';

interface Props {
  data: StockListResponse[];
  navigation: NavigationProp<ParamListBase>;
  loading: boolean;
  onLongPress: (item: any) => void;
  onRefresh: () => void;
}

const StockList = ({
  data,
  navigation,
  loading,
  onLongPress,
  onRefresh,
}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onListRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [onRefresh]);

  const renderItem = useCallback(
    ({item, index}: {item: StockListResponse; index: number}) => {
      return (
        <StockDetailCard
          item={item}
          index={index}
          onPress={() =>
            navigation.navigate(ROUTES.HOMESTACK.STOCK_DETAILS, {item})
          }
          onLongPress={() => onLongPress(item)}
        />
      );
    },
    [navigation, onLongPress],
  );

  const listHeaderComponent = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Today's Recommendations</Text>
      </View>
    ),
    [],
  );
  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View />}
          ListHeaderComponent={listHeaderComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onListRefresh} />
          }
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default StockList;

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
});
