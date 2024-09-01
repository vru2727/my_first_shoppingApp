import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleFeedbackChange = (text) => {
    setFeedback(text);
  };

  const getEmotionImage = () => {
    if (rating === 0) {
      return require('./assets/feedback.png'); 
    } else if (rating === 1) {
      return require('./assets/sad.png');
    } else if (rating >= 2 && rating <= 3) {
      return require('./assets/average.png');
    } else if (rating >= 4 && rating <= 5) {
      return require('./assets/superhappy.png');
    }
    return null;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      {!submitted ? (
        <View style={styles.content}>
          <Image source={getEmotionImage()} style={styles.emotionImage} />
          {/* Number Rating */}
          <View style={styles.ratingNumbersContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.ratingNumber,
                  rating === num && styles.selectedRating,
                ]}
                onPress={() => handleRatingChange(num)}
              >
                <Text style={styles.ratingNumberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Type your feedback here..."
            value={feedback}
            onChangeText={(text) => handleFeedbackChange(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
          <Text style={styles.feedbackMessage}>
            Dear Users,
            We are continuously striving to enhance our services to provide you with the best possible experience.
            Your feedback is incredibly valuable to us, as it helps us understand your needs and preferences better. 
            We would appreciate it if you could take a few moments to share your thoughts and opinions with us.
            Your feedback will assist us in making improvements and delivering even better services in the future. 
            We sincerely thank you for your time and input.
          </Text>
        </View>
      ) : (
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>Thank you for your feedback!</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F83758',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  content: {
    backgroundColor: 'pink',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    height:"90%"
  },
  emotionImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  ratingNumbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingNumber: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedRating: {
    backgroundColor: '#2E7D32', 
  },
  ratingNumberText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#F83758',
    fontSize: 18,
    fontWeight: 'bold',
  },
  thankYouContainer: {
    marginTop:"60%",
  },
  thankYouText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
  },
  feedbackMessage: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    flex:1
  },
});

export default FeedbackScreen;
