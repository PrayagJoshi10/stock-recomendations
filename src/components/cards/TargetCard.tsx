import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

interface Props {
  targetLabel?: string;
  target?: number | undefined;
  stopLoss?: number | undefined;
  seperator?: boolean;
  isAchieved: boolean | undefined;
}

const TargetCard = ({
  targetLabel,
  target,
  stopLoss,
  seperator = false,
  isAchieved,
}: Props) => {
  return (
    <View style={styles.container}>
      {!stopLoss && (
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>{targetLabel}</Text>
          {isAchieved && (
            <View style={styles.achievedContainer}>
              <Text style={styles.achievedLabel}>Achieved</Text>
            </View>
          )}
          <Text style={styles.targetLabel}>₹ {target || '--'}</Text>
        </View>
      )}
      {!isAchieved && stopLoss && (
        <View style={styles.targetContainer}>
          <Text style={styles.stopLossLabel}>Stop Loss</Text>
          <Text style={styles.stopLossLabel}>₹ {stopLoss || '--'}</Text>
        </View>
      )}
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
  achievedContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.green_500,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: Colors.green_700,
    // borderWidth: 0.5,
  },
  achievedLabel: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
});
