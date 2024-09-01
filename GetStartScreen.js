import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

const GetStartScreen = ({ navigation }) => {
  const handleLogin = () => {
    console.log('Get Started button pressed');
    navigation.navigate('MainHomeScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background_i.png')}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <Text style={styles.text}>You want Authentic, here you go!</Text>
        <Text style={styles.text2}>Find it here, buy it now!</Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255,245, 0.1)',
  },
  text: {
    color: 'white',
    fontSize: 34,
    marginHorizontal: 33,
    textAlign: 'center',
    marginBottom: 14,
    fontFamily: 'Montserrat-SemiBold',
    zIndex: 1,
  },
  text2: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 44,
    fontFamily: 'Montserrat-Regular',
    zIndex: 1,
  },
  loginButton: {
    backgroundColor: '#F83758',
    borderRadius: 10,
    padding: 15.5,
    alignItems: 'center',
    width: 317,
    marginBottom: 40,
    alignSelf: 'center',
    marginTop: 38,
    zIndex: 1,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default GetStartScreen;
