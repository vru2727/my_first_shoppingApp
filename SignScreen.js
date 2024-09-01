import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Linking, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const SignScreen = () => {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVideoModal, setShowVideoModal] = useState(false);

    useEffect(() => {
        if (showVideoModal) {
            const timeoutId = setTimeout(() => {
                setShowVideoModal(false);
                navigation.navigate('GetStartScreen');
            }, 6000);

            return () => clearTimeout(timeoutId);
        }
    }, [showVideoModal, navigation]);

    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(usernameOrEmail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Password and Confirm Password should match');
            return;
        }

        if (!/^\d+$/.test(password)) {
            Alert.alert('Validation Error', 'Password should contain only numeric characters');
            return;
        }

        console.log('Create Account button pressed');
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        navigation.navigate('GetStartScreen');
    };

    const openSocialMedia = (url) => Linking.openURL(url);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.txtwlc}>Create an account</Text>
            <View>
                {renderInput('Username or Email', usernameOrEmail, (text) => setUsernameOrEmail(text), require('./assets/User.png'))}
                {renderInput('Password', password, (text) => setPassword(text), require('./assets/password.png'), true)}
                {renderInput('Confirm Password', confirmPassword, (text) => setConfirmPassword(text), require('./assets/password.png'), true)}

                <Text style={styles.signtxt}>
                    By clicking the
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.regiText}> Register </Text>
                    </TouchableOpacity>
                    button, you agree to the public offer
                </Text>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Create Account</Text>
                </TouchableOpacity>

                <Text style={styles.orConnectWith}>- OR Continue with -</Text>

                <View style={styles.socialIconsContainer}>
                    {renderSocialIcon(require('./assets/facebook_icon.png'), () => openSocialMedia('https://www.facebook.com/'))}
                    {renderSocialIcon(require('./assets/google_icon.png'), () => openSocialMedia('https://www.google.com/'))}
                    {renderSocialIcon(require('./assets/instagram_icon.png'), () => openSocialMedia('https://www.instagram.com/'))}
                </View>

                <Text style={styles.signUpText}>
                    I Already Have an Account
                    <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('WelcomeScreen')}>
                        <Text style={styles.logintxt}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <Modal transparent={true} animationType="slide" visible={showVideoModal} onRequestClose={closeVideoModal}>
                <View style={styles.videoModal}>
                    <Video source={require('./assets/ThankYou.mp4')} style={styles.video} controls={false} />
                </View>
            </Modal>
        </View>
    );

    function renderInput(placeholder, value, onChangeText, iconSource, isPassword = false) {
        return (
            <View style={styles.inputContainer}>
                <Image source={iconSource} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword ? !passwordVisible : false}
                    keyboardType={isPassword ? 'numeric' : 'default'}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Image
                            source={passwordVisible ? require('./assets/eye.png') : require('./assets/hide_eye.png')}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    function renderSocialIcon(iconSource, onPress) {
        return (
            <TouchableOpacity style={styles.socialIcon} onPress={onPress}>
                <Image source={iconSource} style={styles.socialIconImage} />
            </TouchableOpacity>
        );
    }
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"white"
    },
    txtwlc: {
        //fontWeight: 'bold',
        fontSize: 36,
        lineHeight: 43,
        color: 'black',
        marginTop: 63,
        marginHorizontal: 50,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 36,
        fontFamily:'Montserrat-Bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#A8A8A9',
        borderRadius: 20,
        padding: 15,
        width: 317,
        alignSelf: 'center'
    },
    inputIcon: {
        marginRight: 10,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        fontFamily:'Montserrat-Medium'
    },
    eyeIcon: {
        width: 20,
        height: 20,
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
    },
    loginButtonText: {
        color: 'white',
        //fontWeight: 'bold',
        fontSize: 20,
        fontFamily:'Montserrat-SemiBold'
    },
    orConnectWith: {
        color: '#575757',
        fontSize: 12,
        marginBottom: 20,
        marginTop: 40,
        textAlign: 'center',
        fontFamily:'Montserrat-Medium'
    },
    socialIconsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    socialIcon: {
        borderWidth: 1,
        borderColor: '#F83758',
        borderRadius: 50,
        padding: 10,
        width: 55,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 28,
    },
    socialIconImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    signtxt: {
        textAlign: 'left',
        color: '#676767',
        marginHorizontal: 50,
        fontFamily:'Montserrat-Regular'
    },
    signUpLink: {
        marginTop: 28,
        alignItems: 'center',
    },
    signUpText: {
        color: '#575757',
        fontSize: 14,
        alignSelf: 'center',
        fontFamily:'Montserrat-Regular'
    },
    logintxt: {
        color: '#F83758',
        fontSize: 14,
        //fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily:'Montserrat-SemiBold'
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'black',
        marginTop: 50
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    regiText:{
        color:'#FF4B26',
        fontSize:12,
        fontFamily:'Montserrat-Regular'
    }
});

export default SignScreen;
