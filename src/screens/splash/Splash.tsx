import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../utils/Colors';
import {getData} from '../../utils/Helper';
import {ROUTES} from '../../navigation/Routes';
import Fonts from '../../utils/Fonts';

interface splashProps {
  navigation: any;
}
const Splash = ({navigation}: splashProps) => {
  const [isProccessing, setisProccessing] = useState<boolean>(true);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const isLoggedInValue = await getData('isLoggedIn');

      if (!isProccessing) {
        if (isLoggedInValue) {
          navigation.replace(ROUTES.MAINSTACK.STACK);
        } else {
          navigation.replace(ROUTES.AUTHSTACK.STACK);
        }
      }
    };

    setTimeout(() => {
      setisProccessing(false);
    }, 1000);

    checkIsLoggedIn();
  }, [isProccessing, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.splashTest}>S t o c k</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTest: {
    color: Colors.gray_700,
    fontSize: 32,
    fontFamily: Fonts.urbanist_800,
  },
});
