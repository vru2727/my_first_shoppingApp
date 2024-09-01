import React, { useState, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const data = [
  {
    id: '1',
    image: require('./assets/b3.png'),
    text1: 'Choose Products',
    text2:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
},
  {
    id: '2',
    image: require('./assets/b2.png'),
    text1: 'Make Payment',
    text2:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
},
  {
    id: '3',
    image: require('./assets/b1.png'),
    text1: 'Get Your Order',
    text2:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
},
];

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const handlePaginationPress = (index) => {
    setCurrentPage(index);
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const handleNextPress = () => {
    const nextPage = currentPage + 1;
    if (nextPage < data.length) {
      setCurrentPage(nextPage);
      flatListRef.current.scrollToIndex({ animated: true, index: nextPage });
    } else {
      navigation.navigate('WelcomeScreen');
    }
  };

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      <View style={styles.pagination}>
        {data.map((_, dotIndex) => (
          <TouchableOpacity
            key={dotIndex}
            onPress={() => handlePaginationPress(dotIndex)}
            style={[
              styles.dot,
              dotIndex === currentPage
                ? { ...styles.activeDot, width: 50, height: 10 }
                : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.paginationText}>{`${currentPage + 1}/${data.length}`}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const pageIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
          setCurrentPage(pageIndex);
        }}
        renderItem={({ item, index }) => (
          <View style={styles.slideContainer}>
            <View style={styles.contentContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text1}</Text>
              <Text style={styles.descriptionText}>{item.text2}</Text>

              {index === data.length - 1 && (
                <TouchableOpacity
                  style={styles.getStartedButton}
                  onPress={() => navigation.navigate('WelcomeScreen')}
                >
                  <Text style={styles.getStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slideContainer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    marginLeft: 33,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: 'black',
    fontFamily: 'Montserrat-ExtraBold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 1,
    backgroundColor: 'white',
    marginLeft: 160,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paginationText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginRight: 10,
    marginBottom: 750,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#17223B',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  getStartedButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F83758',
    borderRadius: 10,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default HomeScreen;
