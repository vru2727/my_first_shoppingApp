import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 6000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.splashDesign}>
        <Image
          style={styles.logo}
          source={require('./assets/slpashlogo.png')}
        />
        <Text style={styles.txt}>
          Stylish
        </Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  splashDesign: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
    padding: 20, 
  },
  logo: {
    width: windowWidth * 0.5, 
    height: windowWidth * 0.4,
    marginRight: windowWidth * 0.03,
  },
  txt: {
    color: '#F83758',
    //fontWeight: 'bold',
    lineHeight: 50,
    fontSize:40,
    textShadowColor: 'black',
    textShadowOffset: { width: 1.6, height: 1 },
    textShadowRadius: 2,
    fontFamily:'LibreCaslonText-Bold'
  },
});

export default SplashScreen;
