import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(require('./assets/9439685.jpg'));
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const storedImageUri = await AsyncStorage.getItem('profileImageUri');
      setProfileImage(storedImageUri ? { uri: storedImageUri } : require('./assets/9439685.jpg'));
      setDeleteIconVisible(!!storedImageUri);
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const saveProfileImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImageUri', uri);
      setDeleteIconVisible(true);
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const deleteProfileImage = async () => {
    try {
      await AsyncStorage.removeItem('profileImageUri');
      setProfileImage(require('./assets/9439685.jpg'));
      setDeleteIconVisible(false);
    } catch (error) {
      console.error('Error deleting profile image:', error);
    }
  };

  const handlePenIconPress = async () => {
    try {
      const image = await ImagePicker.openPicker({ width: 300, height: 300, cropping: true });
      setProfileImage({ uri: image.path });
      setDeleteIconVisible(true);
      saveProfileImage(image.path);
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const handleImagePress = () => {
    setDeleteIconVisible(!deleteIconVisible);
  };

  const handleDeleteIconPress = () => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete the image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: deleteProfileImage, style: 'destructive' },
      ],
      { cancelable: false }
    );
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changepass = () => {
    navigation.navigate('ForgetScreen');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Validate email
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Validate password
    if (!isValidPassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be numeric and at least 6 characters long'
      );
      return;
    }

    // Rest of your login logic
    console.log('Data is Saved');
    navigation.navigate('MainHomeScreen');
    Toast.show({
      type: 'success',
      text1: 'Profile Saved',
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password must be numeric and at least 6 characters long
    const passwordRegex = /^[0-9]{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {profileImage && (
          <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
            <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
            {deleteIconVisible && (
              <TouchableOpacity
                style={styles.deleteIconContainer}
                onPress={handleDeleteIconPress}
              >
                <Image
                  source={require('./assets/delete.png')}
                  style={styles.deleteIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.penIconContainer} onPress={handlePenIconPress}>
        <Image source={require('./assets/pen.png')} style={styles.penIcon} resizeMode="contain" />
      </TouchableOpacity>

      <ScrollView style={{ alignSelf: 'flex-start', marginTop: 150, flex: 1, width: '100%' }}>
        {/* Personal Details */}
        <Text style={styles.txtprofile}>Personal Details</Text>
        <Text style={styles.additionalText}>Email address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email Address here"
          placeholderTextColor="gray"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.additionalText}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Password here"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={changepass}>
        <Text style={styles.pass}>Change Password</Text>
        </TouchableOpacity>
       

        {/*Business Address Details */}
        <Text style={styles.txtprofile}>Business Address Details</Text>
        <Text style={styles.additionalText}>Pincode</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Pincode here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Address here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>City</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter City here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>State</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter State here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>Country</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Country here"
          placeholderTextColor="gray"
        />

        {/* Bank Account Details */}
        <Text style={styles.txtprofile}>Bank Account Details</Text>
        <Text style={styles.additionalText}>Bank Account Number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Bank Account Number here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>Account Holder's Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Account Holder's Name here"
          placeholderTextColor="gray"
        />
        <Text style={styles.additionalText}>IFSC Code</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter IFSC Code here"
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  imageContainer: {
    position: 'absolute',
    top: 31,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  penIconContainer: {
    position: 'absolute',
    bottom: "81%",
    right:"33%",
    padding: 10,
    backgroundColor: '#4392F9',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  penIcon: {
    width: 14,
    height: 14,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 0,
    right: 100,
    padding: 10,
    backgroundColor: '#4392F9',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  deleteIcon: {
    width: 14,
    height: 14,
    tintColor: 'white',
  },
  txtprofile: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 24,
    //marginBottom: 350,
    marginTop: 28,
  },
  additionalText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 11,
  },

  textInput: {
    width: "88%",
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 24,
    //marginRight: 24,
    padding: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
    color:'black'
  },
  pass: {
    color: '#F83758',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 14,
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline'
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

export default ProfileScreen;
