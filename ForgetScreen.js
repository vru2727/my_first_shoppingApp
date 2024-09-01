import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useState } from 'react';

const ForgetScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleLogin = () => {
        console.log('Submit button pressed');
        navigation.navigate('SignScreen');
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.txtwlc}>Forget Password?</Text>
            <View>
                <View style={styles.inputContainer}>
                    <Image source={require('./assets/Mail.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor="gray"
                    />
                </View>

                <Text style={styles.signtxt}>
                  <Text style={{color:"#FF4B26"}}>* </Text>
                 We will send you a message to set or reset your new password
                </Text>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        //marginLeft:44
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
    signtxt: {
      fontSize:12,
        textAlign: 'left',
        color: '#676767',
        marginHorizontal: 52,
        fontFamily:'Montserrat-Regular'
    },
});

export default ForgetScreen;