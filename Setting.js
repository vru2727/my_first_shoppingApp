import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text ,Switch} from 'react-native';

const Setting = ({ navigation }) => {
  const profile = () => {
    navigation.navigate("ProfileScreen");
  };

  const aboutUs = () => {
    navigation.navigate("AboutUsScreen");
  };

  const [isDarkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
    // You can implement logic to apply the theme here
  };

  const feedback = () => {
    navigation.navigate("FeedbackScreen");
  };

  return (
    <View style={{backgroundColor:"white",flex:1}}>
      <Text style={styles.mainset}>Settings</Text>

      {/* Edit Profile */}
      <TouchableOpacity onPress={profile}>
        <View style={styles.item}>
          <Text style={styles.items}>Edit Profile</Text>
          <Text style={{ color: 'black', marginRight: 20, textAlign: 'right' }}>▶</Text>
        </View>
      </TouchableOpacity>

      {/* About Us */}
      <TouchableOpacity onPress={aboutUs}>
        <View style={styles.item}>
          <Text style={styles.items}>About Us</Text>
          <Text style={{ color: 'black', marginRight: 20, textAlign: 'right' }}>▶</Text>
        </View>
      </TouchableOpacity>

      {/* Theme */}
      <View style={styles.item}>
        <Text style={styles.items}>Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>

      {/* Feedback */}
      <TouchableOpacity onPress={feedback}>
        <View style={styles.item}>
          <Text style={styles.items}>Feedback</Text>
          <Text style={{ color: 'black', marginRight: 20, textAlign: 'right' }}>▶</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    color: 'black',
  },
  mainset: {
    color: "black",
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
    margin: 30,
    
  },
  items: {
    color: "black",
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    margin: 20
  }
});
