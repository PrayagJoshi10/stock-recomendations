import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../utils/Fonts';
import Images from '../../utils/Images';
import {MotiImage, MotiText} from 'moti';

interface Props {
  onPress: () => void;
}

const WelcomeCard = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A82FF', '#00A9F1']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradierntContainer}>
        <View style={styles.cardDetails}>
          <MotiText
            from={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 300}}
            style={styles.title}>
            Welcome John👋
          </MotiText>
          <MotiText
            from={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 300}}
            style={styles.info}>
            Make your first investment Today
          </MotiText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.butttonLabel}>Invest Today</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <MotiImage
        from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: 300}}
        source={Images.user}
        style={styles.userImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: responsiveWidth(5.3),
  },
  gradierntContainer: {
    width: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  cardDetails: {},
  title: {
    color: Colors.white,
    fontFamily: Fonts.urbanist_700,
    fontSize: 16,
  },
  info: {
    color: Colors.white,
    fontFamily: Fonts.urbanist_500,
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  butttonLabel: {
    color: Colors.blue,
    fontFamily: Fonts.urbanist_500,
    fontSize: 12,
  },
  userImage: {
    height: responsiveHeight(16.2),
    width: responsiveWidth(25.8),
    position: 'absolute',
    right: 30,
    bottom: 0,
  },
});
