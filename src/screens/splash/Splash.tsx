import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Loader from '../../components/loaders/Loader';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
