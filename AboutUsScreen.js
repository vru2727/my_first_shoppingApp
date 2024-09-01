import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('./assets/VRUSHALI.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>About Us</Text>
      <View style={styles.content}>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to My App!</Text>
        <Text style={styles.text}>
          Greetings, I'm Shah Vrushali Dipakbhai, an aspiring Frontend Developer.
          My journey includes a pivotal three-month stint as a ReactNative Developer at Groovy Web, where I refined my skills and gained practical experience. Committed to continuous learning, I spend my free time developing a feature-rich app, showcasing my passion for technology and dedication to personal and professional growth. This project is not just a reflection of my skills but also a testament to my proactive mindset in tackling challenges and contributing to the dynamic field of software development.
        </Text>
        <Text style={styles.text}>
          Our mission is to create innovative solutions and make your life easier. We value your feedback and are constantly working to improve our app. Thank you for choosing us!
        </Text>
      </View>
      {/* Contact Details */}
      <View style={styles.contactContainer}>
            <Text style={styles.contactHeading}>Contact Details</Text>
            <Text style={styles.contactText}>Email: shahvrushali279@gmail.com</Text>
            <Text style={styles.contactText}>Phone: 9327691448</Text>
            <Text style={styles.contactText}>Address: Bhivandi terrece near ,Pij(Nadiad)</Text>
          </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F83758', 
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  content: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', 
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555', 
  },
  contactContainer: {
    marginTop: 20,
  },
  contactHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555', 
  },
});
