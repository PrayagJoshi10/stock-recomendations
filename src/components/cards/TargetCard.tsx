import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

interface Props {
  target: number | undefined;
  stopLoss: number | undefined;
  seperator?: boolean;
}

const TargetCard = ({target, stopLoss, seperator = false}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.targetContainer}>
        <Text style={styles.targetLabel}>Target Price 1</Text>
        <Text style={styles.targetLabel}>₹ {target || '--'}</Text>
      </View>
      <View style={styles.targetContainer}>
        <Text style={styles.stopLossLabel}>Stop Loss</Text>
        <Text style={styles.stopLossLabel}>₹ {stopLoss || '--'}</Text>
      </View>
      {seperator && <View style={styles.seperator} />}
    </View>
  );
};

export default TargetCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetLabel: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  stopLossLabel: {
    color: Colors.red_600,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray_400,
  },
});
