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
    }, 1600);

    checkIsLoggedIn();
  }, [isProccessing, navigation]);

  return (
    <View style={styles.container}>
      <MotiText
        style={styles.splashTest}
        from={{opacity: 0, scale: 1, translateY: 152}}
        animate={{
          opacity: 1,
          scale: [1.5, 1],
          translateY: [0, 152],
          translateX: [0, -73],
        }}
        transition={{type: 'timing', duration: 700}}>
        S
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={{opacity: 0, scale: 1, translateY: 77}}
        animate={{
          opacity: 1,
          scale: [1.5, 1],
          translateY: [0, 77],
          translateX: [0, -37],
        }}
        transition={{type: 'timing', duration: 700}}>
        t
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={{opacity: 0, scale: 1}}
        animate={{opacity: 1, scale: [1.5, 1]}}
        transition={{type: 'timing', duration: 700}}>
        o
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={{opacity: 0, scale: 1, translateY: -76}}
        animate={{
          opacity: 1,
          scale: [1.5, 1],
          translateY: [0, -76],
          translateX: [0, 41],
        }}
        transition={{type: 'timing', duration: 700}}>
        c
      </MotiText>
      <MotiText
        style={styles.splashTest}
        from={{opacity: 0, scale: 1, translateY: -151}}
        animate={{
          opacity: 1,
          scale: [1.5, 1],
          translateY: [0, -151],
          translateX: [0, 71],
        }}
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
    // flexDirection: 'row',
    gap: 15,
  },
  splashTest: {
    color: Colors.gray_700,
    fontSize: responsiveFontSize(6),
    fontFamily: Fonts.urbanist_800,
  },
});
