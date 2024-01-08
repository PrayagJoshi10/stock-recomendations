import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import InvestmentDetails from '../texts/InvestmentDetails';
import Fonts from '../../utils/Fonts';

interface Props {
  BuyPrice: string | number;
  CurrentPrice: string | number | undefined;
  TotalInvenstment: string | number;
  CurrentInvestment: string | number;
  Current_PnL: string | number;
}

const InvestmentDetailsCard = ({
  BuyPrice,
  CurrentPrice,
  TotalInvenstment,
  CurrentInvestment,
  Current_PnL,
}: Props) => {
  return (
    <View style={styles.container}>
      <InvestmentDetails label="Buy Price" value={BuyPrice} />
      <InvestmentDetails label="Current Price" value={CurrentPrice} />
      <InvestmentDetails label="Total Invenstment" value={TotalInvenstment} />
      <InvestmentDetails label="Current Investment" value={CurrentInvestment} />
      <InvestmentDetails label="Current P/L" value={Current_PnL} />
      <Text style={styles.note}>*All Values in Rupees (₹)</Text>
    </View>
  );
};

export default InvestmentDetailsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 0.5,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 8,
  },
  note: {
    fontSize: 12,
    color: Colors.gray_400,
    fontFamily: Fonts.urbanist_500,
  },
});
