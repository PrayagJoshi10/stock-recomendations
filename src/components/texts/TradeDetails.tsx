import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

interface Props {
  label: string | number | undefined;
  value: string | number | undefined;
  isAmount?: boolean;
}

const TradeDetails = ({label, value, isAmount = true}: Props) => {
  return (
    <View>
      <Text style={styles.currentPriceLabel}>
        {label}: {isAmount ? '₹' : ''} {value || '--'}
      </Text>
    </View>
  );
};

export default TradeDetails;

const styles = StyleSheet.create({
  currentPriceLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
});
