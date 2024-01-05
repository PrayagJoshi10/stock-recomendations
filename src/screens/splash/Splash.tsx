import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../utils/Colors';
import {getData} from '../../utils/Helper';
import {ROUTES} from '../../navigation/Routes';
import Fonts from '../../utils/Fonts';
import {MotiText} from 'moti';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

interface splashProps {
  navigation: any;
}
const Splash = ({navigation}: splashProps) => {
  const [isProccessing, setisProccessing] = useState<boolean>(true);
  const fromTopToBottom = {opacity: 0, translateY: -100};
  const animateTopToBotton = {opacity: 1, translateY: 0};
  const fromBottomToTop = {opacity: 0, translateY: 100};
  const animateBottomToTop = {opacity: 1, translateY: 0};

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
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <MotiText
        style={styles.splashTest}
        from={fromTopToBottom}
        animate={animateTopToBotton}
        transition={{type: 'timing', duration: 700}}>
        S
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={fromBottomToTop}
        animate={animateBottomToTop}
        transition={{type: 'timing', duration: 700}}>
        t
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={fromTopToBottom}
        animate={animateTopToBotton}
        transition={{type: 'timing', duration: 700}}>
        o
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={fromBottomToTop}
        animate={animateBottomToTop}
        transition={{type: 'timing', duration: 700}}>
        c
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={fromTopToBottom}
        animate={animateTopToBotton}
        transition={{type: 'timing', duration: 700}}>
        k
      </MotiText>
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
    flexDirection: 'row',
    gap: 15,
  },
  splashTest: {
    color: Colors.gray_700,
    fontSize: responsiveFontSize(6),
    fontFamily: Fonts.urbanist_800,
  },
});
