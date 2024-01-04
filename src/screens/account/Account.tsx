import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROUTES} from '../../navigation/Routes';

interface Props {
  navigation: any;
}

const Account = ({navigation}: Props) => {
  const onLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace(ROUTES.AUTHSTACK.STACK);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutLabel}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: '50%',
    height: 50,
    backgroundColor: Colors.red_100,
    borderColor: Colors.red_600,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutLabel: {
    color: Colors.red_600,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
});
