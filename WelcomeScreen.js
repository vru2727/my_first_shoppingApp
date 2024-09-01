import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordKeyboardType, setPasswordKeyboardType] = useState('default');

  // const handleLogin = () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(usernameOrEmail)) {
  //     Alert.alert('Validation Error', 'Please enter a valid email address');
  //     return;
  //   }

  //   if (/^\d+$/.test(password)) navigation.navigate('MainHomeScreen');
  // };
  const handleLogin = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(usernameOrEmail)) {
        Alert.alert('Validation Error', 'Please enter a valid email address');
        return;
      }
  
      if (!password.trim()) {
        Alert.alert('Validation Error', 'Please enter a password');
        return;
      }
  
      // Authenticate with Firebase
      const userCredential = await auth().signInWithEmailAndPassword(usernameOrEmail, password);
  
      // If successful, navigate to the MainHomeScreen
      if (userCredential) {
        navigation.navigate('MainHomeScreen');
      }
    } catch (error) {
      // Handle authentication errors
      Alert.alert('Authentication Error', error.message);
    }
  };
  
  const handlePasswordFocus = () => setPasswordKeyboardType('numeric');
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const forget = () => navigation.navigate('ForgetScreen');
  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.txtwlc}>Welcome Back !!</Text>
      <View>
        {renderInput('Username or Email', usernameOrEmail, (text) => setUsernameOrEmail(text), require('./assets/User.png'))}
        {renderInput('Password', password, (text) => setPassword(text), require('./assets/password.png'), true)}
        <TouchableOpacity style={styles.forgetbtn} onPress={forget}>
          <Text style={styles.ForgetText}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orConnectWith}>- OR Continue with -</Text>
        {renderSocialIcons()}
        <Text style={styles.signUpTxt}>
          Create an Account 
          <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('SignScreen')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );

  function renderInput(placeholder, value, onChangeText, iconSource, isPassword = false) {
    return (
      <View style={styles.inputContainer}>
        <Image source={iconSource} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? !passwordVisible : false}
          keyboardType={isPassword ? passwordKeyboardType : 'default'}
          onFocus={isPassword ? handlePasswordFocus : undefined}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image source={passwordVisible ? require('./assets/eye.png') : require('./assets/hide_eye.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderSocialIcons() {
    const socialIcons = [
      { icon: require('./assets/facebook_icon.png'), link: 'https://www.facebook.com/' },
      { icon: require('./assets/google_icon.png'), link: 'https://www.google.com/' },
      { icon: require('./assets/instagram_icon.png'), link: 'https://www.instagram.com/' },
    ];

    return (
      <View style={styles.socialIconsContainer}>
        {socialIcons.map((social, index) => (
          <TouchableOpacity key={index} style={styles.socialIcon} onPress={() => openLink(social.link)}>
            <Image source={social.icon} style={styles.socialIconImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
};

const openLink = (url) => {
  Linking.openURL(url);
};

const styles = {
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white"
  },
  txtwlc: {
    //fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 43,
    color: 'black',
    marginTop: 63,
    marginHorizontal: 50,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 36,
    fontFamily:'Montserrat-Bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: 20,
    padding: 15,
    width: 317,
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black', 
    fontFamily:'Montserrat-Medium'
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  forgetbtn: {
    marginBottom: 52,
    alignItems: 'flex-end',
  },
  ForgetText: {
    color: '#F83758',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#F83758',
    borderRadius: 10,
    padding: 15.5,
    alignItems: 'center',
    width: 317,
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    //fontWeight: 'bold',
    fontSize: 20,
    fontFamily:'Montserrat-SemiBold'
  },
  orConnectWith: {
    color: '#575757',
    fontSize: 12,
    marginBottom: 20,
    marginTop: 75,
    textAlign: 'center',
    fontFamily:'Montserrat-Medium'
  },
  socialIconsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  socialIcon: {
    borderWidth: 1,
    borderColor: '#F83758',
    borderRadius: 50,
    padding: 10,
    width: 55,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 28,
  },
  socialIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  signUpLink: {
    //marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#F83758',
    fontSize: 14,
    //fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily:'Montserrat-SemiBold'
  },
  signUpTxt: {
    color: '#575757',
    fontSize: 14,
    textAlign:'center',
    fontFamily:'Montserrat-Regular'
  },
};

export default WelcomeScreen;
