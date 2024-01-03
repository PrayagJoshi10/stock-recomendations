import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.red_600} size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
