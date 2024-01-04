import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../utils/Fonts';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {ROUTES} from '../../navigation/Routes';

interface Props {
  navigation: any;
}

const LoginSignup = ({navigation}: Props) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleTextChange = (text: string, setText: (text: string) => void) => {
    setError('');
    setText(text);
    return;
  };

  const onLogin = () => {
    if (!email && !password) {
      setError('Emai and Password are Required !');
      return;
    }
    if (!email) {
      setError('Email is Required !');
      return;
    }
    if (!password) {
      setError('Password is Required !');
      return;
    }
    if (email === 'admin' && password === 'admin') {
      navigation.replace(ROUTES.MAINSTACK.STACK);
    } else {
      setError('Incorrect Email or Password !');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-100}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <StatusBar backgroundColor={'#EC9FE9'} /> */}
        <LinearGradient
          colors={['#EC9FE9', '#DC96ED', '#AFA9F4', '#6EBDDF', '#FFFFFF']}
          style={styles.gradierntContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={[styles.input, styles.shadow]}
              placeholder="Email"
              placeholderTextColor={Colors.gray_400}
              onChangeText={text => {
                handleTextChange(text, setEmail);
              }}
              keyboardType="email-address"
              value={email}
            />
            <TextInput
              style={[styles.input, styles.shadow]}
              placeholder="Password"
              placeholderTextColor={Colors.gray_400}
              onChangeText={text => {
                handleTextChange(text, setPassword);
              }}
              secureTextEntry={true}
              value={password}
            />
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity
              style={[styles.loginButtonContainer, styles.shadow]}
              onPress={onLogin}>
              <Text style={styles.loginButtonLabel}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bottomContainer}>
            <Text style={styles.bottomText}>
              Dont have an account?{' '}
              <Text style={{color: Colors.blue}}>Sign UP!</Text>
            </Text>
          </TouchableOpacity>
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
    marginTop: 100,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.urbanist_800,
  },
  input: {
    width: '80%',
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(7),
    paddingVertical: 15,
    fontSize: 16,
    color: Colors.gray_700,
    borderRadius: 28,
  },
  error: {
    marginTop: 10,
    color: Colors.red_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  loginButton: {
    padding: 5,
    width: '80%',
    backgroundColor: Colors.white,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 10,
    backgroundColor: Colors.purple_700,
    borderRadius: 24,
  },
  loginButtonLabel: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.urbanist_600,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  bottomText: {
    color: Colors.gray_700,
    fontFamily: Fonts.urbanist_500,
    fontSize: 16,
  },
});
