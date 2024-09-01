import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const MainHomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 10;
  const [sortOption, setSortOption] = useState('');

  const handleSortClick = () => {
    setSortOption('alphabetical');
    fetchData(1, searchQuery, 'alphabetical');
  };

  const sortData = (data, option) => {
    if (option === 'alphabetical') {
      return data.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  };

  const handleGirlClick = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleAudioButtonClick = () => {
    console.log('Audio button clicked');
  };

  const sliderData = [
    {
      image: require('./assets/offer1.jpg'),
      text1: '60-70% OFF',
      text2: 'Latest Trends',
      buttonText: 'Shop Now',
    },
    {
      image: require('./assets/offer2.png'),
      text1: '30-40% OFF',
      text2: 'Exclusive Collections',
      buttonText: 'Shop Now',
    },
    {
      image: require('./assets/offer3.png'),
      text1: '50-80% OFF',
      text2: 'Cool Styles',
      buttonText: 'Shop Now',
    },
  ];

  const fetchData = async (pageNum, query = '', sortOption = '') => {
    try {
      const startIndex = (pageNum - 1) * perPage;
      const endIndex = startIndex + perPage;
      const url = 'https://dummyjson.com/products';
      const result = await fetch(url);
      const { products } = await result.json();

      if (products.length === 0) {
        setAllDataLoaded(true);
      } else {
        if (pageNum === 1) {
          setData([]);
        }
        let sortedProducts = sortData(products, sortOption);
        setData((prevData) => [...prevData, ...sortedProducts.slice(startIndex, endIndex)]);
      }
      setLoading(false);
      if (query) {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setData(filteredProducts);
        setAllDataLoaded(filteredProducts.length === 0);
        return;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleCardPress = (item) => {
    navigation.navigate('ProductDetails', { item });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setLoading(true);
    fetchData(1);
  };

  const handleCircleClick = (category) => {
    Toast.show({
      type: 'info',
      text1: `${category} displayed`,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleEndReached = () => {
    if (!loading && !allDataLoaded) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(page, searchQuery);
  }, [page, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={require('./assets/slpashlogo.png')} style={styles.image} />
          <Text style={styles.text}> Stylish </Text>
          <TouchableOpacity onPress={handleGirlClick}>
            <Image source={require('./assets/9439685.jpg')} style={styles.image2} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Image source={require('./assets/Search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#BBBBBB"
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            value={searchQuery}
          />
          <TouchableOpacity onPress={handleAudioButtonClick}>
            <Image source={require('./assets/Audio.png')} style={styles.audioIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.additionalRow}>
          <Text style={styles.additionalText}>All Featured</Text>

          {/* First Card View */}
          <TouchableOpacity style={styles.cardView} onPress={handleSortClick}>
              <Image source={require('./assets/sort.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Sort</Text>
            </TouchableOpacity>

          {/* Second Card View */}
          <View style={styles.cardView}>
            <Image
              source={require('./assets/filter.png')}
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Filter</Text>
          </View>
        </View>

        {/* Circles */}
        <View style={styles.circleImagesContainer}>
          <TouchableOpacity style={styles.circleImage} onPress={() => handleCircleClick('Beauty')}>
            <Image source={require('./assets/Beauty.png')} style={styles.circleImageIcon} />
            <Text style={styles.circleImageText}>Beauty</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleImage} onPress={() => handleCircleClick('Fashion')}>
            <Image source={require('./assets/Fashion.png')} style={styles.circleImageIcon} />
            <Text style={styles.circleImageText}>Fashion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleImage} onPress={() => handleCircleClick('Kids')}>
            <Image source={require('./assets/Kids.png')} style={styles.circleImageIcon} />
            <Text style={styles.circleImageText}>Kids</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleImage} onPress={() => handleCircleClick('Mens')}>
            <Image source={require('./assets/Mens.png')} style={styles.circleImageIcon} />
            <Text style={styles.circleImageText}>Mens</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleImage} onPress={() => handleCircleClick('Womens')}>
            <Image source={require('./assets/Womens.png')} style={styles.circleImageIcon} />
            <Text style={styles.circleImageText}>Womens</Text>
          </TouchableOpacity>
        </View>
        {/* Sales slider */}
        <FlatList
          data={sliderData}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          windowSize={3}
          renderItem={({ item }) => (
            <View style={[styles.sliderImageContainer]}>
              <Image source={item.image} style={styles.sliderImage} />
              <View style={styles.sliderTextContainer}>
                <Text style={styles.sliderText}>{item.text1}</Text>
                <Text style={styles.sliderText2}>{item.text2}</Text>
                <TouchableOpacity style={styles.sliderButton}>
                  <Text style={styles.sliderButtonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={{ backgroundColor: '#4392F9', borderRadius: 12, width: width - 40, marginTop: 16 }}>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, margin: 8, color: 'white' }}>Deal of the Day</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./assets/clock.png')} style={styles.clock} />
            <Text style={{ fontSize: 12, marginTop: 8, color: 'white' }}>22h 55m 20s remaining </Text>
            <TouchableOpacity style={styles.clocktxt}>
              <Text style={styles.sliderButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          nestedScrollEnabled={true}
          style={{ width: '100%' }}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              <Text style={styles.headerText}></Text>
            </View>
          }
          ListFooterComponent={
            <View>
              <Text style={styles.footerText}></Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              key={item.id.toString()}
              onPress={() => handleCardPress(item)}>
              <Image source={{ uri: item.thumbnail }} style={styles.image22} />
              <View style={styles.textContainer}>
                <Text style={styles.baseText}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>$ {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={handleEndReached}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"white"
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: '13.5%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  image2: {
    width: '34.5%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 60,
    marginLeft: "5%"
  },
  text: {
    fontSize: 18,
    color: '#4392F9',
    fontFamily: 'LibreCaslonText-Bold',
    lineHeight: 22,
    marginRight: 179,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1.3,
    borderColor: '#BBBBBB',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  audioIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  additionalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  additionalText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 22,
    marginRight: 69,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },
  cardIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  circleImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  circleImage: {
    alignItems: 'center',
  },
  circleImageIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  circleImageText: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  sliderImageContainer: {
    width: width - 40,
    height: width - 240,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 200,
    marginTop:16
  },
  sliderImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  sliderTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 10,
    borderRadius: 8,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
  },
  sliderText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold'
  },
  sliderText2: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  },
  sliderButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    borderColor: 'white'
  },
  sliderButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold'
  },
  clock: {
    width: 16,
    height: 16,
    margin: 8,
    tintColor: "white"
  },
  clocktxt: {
    borderWidth: 1,
    padding: 4,
    borderColor: 'white',
    marginLeft: 90,
    bottom: 20,
    borderRadius: 6
  },
  // image22: {
  //   width: 150,
  //   height: 120,
  //   borderRadius: 5,
  //   borderColor: '#F83758',
  //   borderWidth: 2,
  //   //marginRight: 20,
  //   resizeMode: "cover",
  //   marginHorizontal: 20
  // },
  viewcard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 360
  },
  card: {
    width: '49%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: '2%',
  },
  image22: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: '#F83758',
    fontWeight: 'bold',
  },
});

export default MainHomeScreen;
