import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import RootStack from './src/navigation/RootStack';
import Colors from './src/utils/Colors';

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={Colors.blue} />
      <RootStack />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
