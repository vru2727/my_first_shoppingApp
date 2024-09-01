import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image, Modal, Button, Alert } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation(); // Add this line

  const [modalVisible, setModalVisible] = useState(false);

  const handleGooglePayClick = () => {
    Linking.openURL('https://pay.google.com');
  };

  const handleVisaClick = () => {
    Linking.openURL('https://www.visa.com/');
  };

  const handlePayPalClick = () => {
    Linking.openURL('https://www.paypal.com/');
  };

  const handleContinueClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleVideoEnd = () => {
    setModalVisible(false);
    navigation.navigate("Payment");
  };
  return (
    <View style={{ backgroundColor:"white",flex:1}}>
      <Text style={styles.txt}>Payment</Text>
      <View style={styles.line} />
      <View style={styles.section}>
        <Text style={styles.sectionText}>Order</Text>
        <Text style={styles.sectionNumber}>#12345</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Shipping</Text>
        <Text style={styles.sectionNumber}>$5.00</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Total</Text>
        <Text style={styles.sectionNumber}>$25.00</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.paymentMethods}>
        <TouchableOpacity onPress={handleGooglePayClick} style={styles.paymentMethod}>
          <Image source={require('./assets/googlepay.png')} style={styles.paymentMethodIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleVisaClick} style={styles.paymentMethod}>
          <Image source={require('./assets/visa.png')} style={styles.paymentMethodIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePayPalClick} style={styles.paymentMethod}>
          <Image source={require('./assets/paypal.png')} style={styles.paymentMethodIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleContinueClick}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
        <Video
            source={require('./assets/payment_Done.mp4')}
            style={styles.videoPlayer}
            resizeMode="cover"
            repeat={false}
            onEnd={handleVideoEnd} 
          />
        </View>
      </Modal>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 22,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  sectionText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  sectionNumber: {
    fontSize: 18,
    color: 'black',
  },
  paymentMethodIcon: {
    width: 100,
    height: 50,
    resizeMode:"contain",
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginHorizontal: 30,
    marginVertical: 5,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    padding: 22,
  },
  paymentMethod: {
    alignItems: 'center',
  },
  continueButtonContainer: {
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor:'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: 300,
    height: 200,
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
