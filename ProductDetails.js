import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Carousel from 'react-native-snap-carousel';

const ProductDetails = ({ route, navigation }) => {
  const { item} = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  
    const addToCart = () => {
      navigation.navigate('ShoppingScreen', { addedToCart: item, cartCount: cartCount + 1 });
      setCartCount(cartCount + 1);
    };
  
    const buyNow = () => {
      alert('Buy Now clicked!');
    };
  
    const renderImageItem = ({ item: image }) => (
      <Image source={{ uri: image }} style={styles.imageRow} />
    );
  
    return (
      <ImageBackground
      source={require('./assets/background_2.jpg')}
      style={styles.imageBackground}>
      <ScrollView>
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.title}</Text>
          <Carousel
            data={item.images}
            renderItem={renderImageItem}
            sliderWidth={400}
            itemWidth={300}
            loop={true}
            autoplay={true}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
  
          <Text style={styles.priceitem}>${item.price}</Text>
          <Text style={styles.detailHeading}>Description</Text>
          <Text style={styles.detailText}>{item.description}</Text>
          <Text style={styles.infoHeading}>Discount Percentage</Text>
          <Text style={styles.infoText}>{item.discountPercentage}</Text>
          <Text style={styles.infoHeading}>Rating</Text>
          <Text style={styles.infoText}>{item.rating}</Text>
          <Text style={styles.infoHeading}>Stock</Text>
          <Text style={styles.infoText}>{item.stock}</Text>
          <Text style={styles.infoHeading}>Brand</Text>
          <Text style={styles.infoText}>{item.brand}</Text>
          <Text style={styles.infoHeading}>Category</Text>
          <Text style={styles.infoText}>{item.category}</Text>
  
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: '#F83758',
                borderWidth: 1,
                marginRight: 20,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
                marginLeft: 20,
              }}
              onPress={addToCart}>
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F83758',
                borderRadius: 5,
                padding: 10,
                marginRight: 20,
              }}
              onPress={buyNow}>
              <Text style={[styles.buttonText, { color: 'white' }]}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color:'#F83758'
    },
    priceitem: {
      textAlign: 'left',
      fontFamily: 'lucida grande',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 29,
      marginLeft: 20,
      marginTop: 20,
    },
    imageRow: {
      width: 300,
      height: 300,
      borderRadius: 4,
      margin: 5,
      borderColor: '#F83758',
      borderWidth: 3,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 20,
      alignSelf: 'center',
    },
    itemText: {
      fontSize: 30,
      marginLeft: 20,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginTop: 11,
      color:'white',
      textAlign:'center',
      marginBottom:22,
      marginTop:22
    },
    detailHeading: {
      fontSize: 19,
      marginTop: 10,
      color: '#F83758',
      textAlign: 'left',
      marginLeft: 20,
    },
    detailText: {
      fontSize: 19,
      color: 'white',
      textAlign: 'left',
      marginLeft: 20,
      marginRight: 10,
    },
    infoHeading: {
      fontSize: 19,
      marginTop: 25,
      color: '#F83758',
      textAlign: 'left',
      marginLeft: 20,
    },
    infoText: {
      fontSize: 17,
      color: 'white',
      textAlign: 'left',
      marginLeft: 20,
    },
    price: {
      textAlign: 'left',
      fontFamily: 'lucida grande',
      color: '#f8a7ab',
      fontWeight: 'bold',
      fontSize: 20,
    },
    viewcard: {
      flex: 1,
      backgroundColor: 'white',
    },
    textContainer: {
      flex: 1, 
    }, 
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)', 
        flex: 1,
      },
      addedItemsList: {
        marginTop: 20,
        padding: 10,
      },
  });
  
export default ProductDetails

