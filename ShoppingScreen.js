import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import AddressModal from './AddressModal';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const ShoppingScreen = ({ route,navigation }) => {
  //const { addedToCart } = route.params;
  const { addedToCart, cartCount } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('216 St Paul\'s Rd, London N1 2LL');

  const handleBuyNow = () => {
    navigation.navigate("Payment")
  };
  const handleIconClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    // You can perform additional actions when saving the address
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 30, marginBottom: 10 }}>
        <Image source={require('./assets/Location.png')} style={styles.location} />
        <Text style={styles.deliverytxt}>Delivery Address</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.addressRow}>
        <View style={styles.card1}>
          <View style={{flexDirection:'row',padding:6}}>
            <Text style={{color:'black',fontFamily:'Montserrat-Medium',fontSize:15}}>Address</Text>
          {/* <Image source={require('./assets/add_txt.png')} style={styles.addtxt} /> */}
          </View>
          <Text style={styles.addresstxt}>{address}</Text>
        </View>

        <TouchableOpacity onPress={handleIconClick} style={styles.card2}>
          <Image source={require('./assets/add.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <Text style={styles.deliverytxtt}>Shopping List ({cartCount} items)</Text>
      <View style={styles.productCard}>
      <Image  source={{ uri: addedToCart?.thumbnail }} style={styles.productImage}  />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{addedToCart?.title}</Text>
          <Text style={styles.productPrice}>Price: ${addedToCart?.price}</Text>
          <Text style={styles.productRating}>Rating: {addedToCart?.rating}</Text>
          <Text style={styles.productCategory}>Category: {addedToCart?.category}</Text>
        </View>
      </View>

       {/* Buy Now Button */}
    <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
      <Text style={styles.buyNowButtonText}>Procced to Payment</Text>
    </TouchableOpacity>
    <AddressModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor:"white"
  },
  deliverytxt: {
    color: 'black',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Montserrat-SemiBold',
  },
  deliverytxtt: {
    color: 'black',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Montserrat-SemiBold',
    marginTop:30,
    marginLeft:30,
    marginBottom:20
  },
  location: {
    tintColor: 'black',
    width: 20,
    height: 25,
    //marginTop: 2,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginVertical: 5,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  card1: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 10,
    marginLeft:20,
    marginRight:"3%"
    //marginHorizontal: 50,
  },
  card2: {
    //flex: 1,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 25,
    marginRight:"5%"
    //marginHorizontal: 1,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  addtxt:{
    width: 15,
    height: 20, 
    resizeMode: 'contain',
    marginLeft:"70%"
  },
  addresstxt:{
    color:'black',
    fontFamily: 'Montserrat-Regular',
  },
  productListHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    color: '#F83758',
  },
  productRating: {
    fontSize: 16,
    color: 'black',
  },
  productCategory: {
    fontSize: 16,
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    marginRight: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: 'center',
  },
  buyNowButton: {
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
  buyNowButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  
});

export default ShoppingScreen;
