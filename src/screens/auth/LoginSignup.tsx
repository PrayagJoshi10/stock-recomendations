import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import {setData} from '../../utils/Helper';
import {AnimatePresence, MotiText, MotiView, useDynamicAnimation} from 'moti';

interface Props {
  navigation: any;
}
interface AnimatedTextProps {
  label1: string;
  label2: string;
  isVisible: boolean;
  style?: any;
}

interface AnimatedInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  isVisible?: boolean;
  transition?: any;
  exitTransition?: any;
}

const LoginSignup = ({navigation}: Props) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLogIn, setIsLogIn] = useState<boolean>(true);

  const loginState = useDynamicAnimation(() => {
    // optional function that returns your initial style
    return {
      height: 150,
    };
  });

  const changeMode = () => {
    setIsLogIn(!isLogIn);
    isLogIn
      ? loginState.animateTo({
          height: [{value: 210, type: 'timing'}],
        })
      : loginState.animateTo({
          height: [{value: 150, type: 'timing'}],
        });
  };
  const handleTextChange = (text: string, setText: (text: string) => void) => {
    setError('');
    setText(text);
    return;
  };

  const onLogin = async () => {
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
      try {
        await setData('isLoggedIn', 'true');
        navigation.replace(ROUTES.MAINSTACK.STACK);
      } catch (err) {}
    } else {
      setError('Incorrect Email or Password !');
    }
  };
  // useEffect(() => {
  //   titleAnimationState.transitionTo('show');
  // }, [titleAnimationState]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-100}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <StatusBar backgroundColor={'#EC9FE9'} /> */}
        <LinearGradient
          colors={['#6A82FF', '#00A9F1', '#FFFFFF']}
          style={styles.gradierntContainer}>
          <View key={'loginContainer'} style={styles.loginContainer}>
            <AnimatedText label1="Login" label2="SignUp" isVisible={isLogIn} />

            <MotiView
              state={loginState}
              style={styles.transitionContainer}
              transition={{duration: 1000}}>
              <MotiView
                style={styles.inputContainer}
                from={{opacity: 0, translateY: -50}}
                animate={{opacity: 1, translateY: 0}}
                transition={{type: 'timing', delay: 100}}>
                <TextInput
                  style={[styles.input, styles.shadow]}
                  placeholder="Email"
                  placeholderTextColor={Colors.gray_400}
                  onChangeText={text => {
                    handleTextChange(text, setEmail);
                  }}
                  // secureTextEntry={true}
                  value={email}
                />
              </MotiView>
              <MotiView
                style={styles.inputContainer}
                from={{opacity: 0, translateY: -50}}
                animate={{opacity: 1, translateY: 0}}
                transition={{type: 'timing', delay: 200}}>
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
              </MotiView>
              <AnimatePresence>
                {!isLogIn && (
                  <MotiView
                    style={styles.inputContainer}
                    from={{opacity: 0, translateY: -50}}
                    animate={{opacity: 1, translateY: 0}}
                    exit={{opacity: 0}}
                    transition={{type: 'timing', duration: 1000}}>
                    <TextInput
                      style={[styles.input, styles.shadow]}
                      placeholder="Name"
                      placeholderTextColor={Colors.gray_400}
                      onChangeText={text => {
                        handleTextChange(text, setName);
                      }}
                      value={name}
                    />
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>

            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity
              style={[styles.loginButtonContainer, styles.shadow]}
              onPress={onLogin}>
              <AnimatedText
                label1="Login"
                label2="SignUp"
                isVisible={isLogIn}
                style={styles.loginButtonLabel}
              />
            </TouchableOpacity>
          </View>
          <Pressable
            key={'bottomContainer'}
            style={styles.bottomContainer}
            onPress={() => {
              changeMode();
            }}>
            <AnimatePresence exitBeforeEnter>
              {isLogIn ? (
                <MotiText
                  key={'label1'}
                  style={[styles.bottomText]}
                  from={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}>
                  Dont have an account?{' '}
                  <Text key={'signUpLabel'} style={{color: Colors.blue}}>
                    Sign UP!
                  </Text>
                </MotiText>
              ) : (
                <MotiText
                  key={'label2'}
                  style={[styles.bottomText]}
                  from={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}>
                  Already have an account?{' '}
                  <Text key={'loginLabel'} style={{color: Colors.blue}}>
                    Login!
                  </Text>
                </MotiText>
              )}
            </AnimatePresence>
          </Pressable>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginSignup;

const AnimatedText = ({
  label1,
  label2,
  isVisible,
  style,
}: AnimatedTextProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible ? (
        <MotiText
          key={'label1'}
          style={[styles.title, style]}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
          {label1}
        </MotiText>
      ) : (
        <MotiText
          key={'label2'}
          style={[styles.title, style]}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
          {label2}
        </MotiText>
      )}
    </AnimatePresence>
  );
};

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
  transitionContainer: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
    paddingTop: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.urbanist_800,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
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
    backgroundColor: '#3b488f',
    borderRadius: 24,
  },
  loginButtonLabel: {fontSize: 16, fontFamily: Fonts.urbanist_500},
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
