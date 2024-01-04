import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../utils/Fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {}

const LoginSignup = (props: Props) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleTextChange = (text: string, setText: (text: string) => void) => {
    setError('');
    setText(text);
    return;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <StatusBar backgroundColor={'#EC9FE9'} /> */}
        <LinearGradient
          colors={['#EC9FE9', '#DC96ED', '#AFA9F4', '#6EBDDF', '#FFFFFF']}
          style={styles.gradierntContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.gray_400}
              onChangeText={text => {
                handleTextChange(text, setEmail);
              }}
              value={email}
              // keyboardType="numeric"
            />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  gradierntContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.urbanist_800,
  },
  input: {
    // height: 40,
    width: responsiveWidth(70),
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(7),
    paddingVertical: 15,
    fontSize: 16,
    color: Colors.gray_700,
    borderRadius: 28,
  },
});
