import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

interface Props {
  label: string;
  value: string | number | undefined;
}

const InvestmentDetails = ({label, value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default InvestmentDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: Colors.gray_500,
    fontSize: 14,
    fontFamily: Fonts.urbanist_500,
  },
  value: {
    color: Colors.gray_700,
    fontSize: 14,
    fontFamily: Fonts.urbanist_700,
  },
});
