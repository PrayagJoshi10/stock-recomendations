import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import RootStack from './src/navigation/RootStack';
import Colors from './src/utils/Colors';

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={Colors.blue} />
      <GestureHandlerRootView style={styles.safeAreaContainer}>
        <RootStack />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});
