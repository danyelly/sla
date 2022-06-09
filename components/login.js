import React, { useState, useEffect } from 'react'
import {ImageBackground,
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'
import './config'

export default function App({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState('')

    //https://firebase.google.com/docs/auth/web/password-auth
    const loginFirebase = () => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                global.config.userId = user.uid;
                navigation.navigate('initial', { idUser: user.uid })
                // console.log(user)
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code
                let errorMessage = error.message
            });
    }

    
    useEffect(() => { }, []);

    return (   

        <ImageBackground source={require('../assets/netflix.jpg')}  style={styles.image} resizeMode="cover">

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
 
            <View style={styles.login}>
                <Text style={styles.title}>Sing In</Text>
                <TextInput style={styles.textInput1}
                    placeholder='Email'
                    type='text'
                    onChangeText={(text) => setEmail('dany@gmail.com')}
                    value={email}
                />
                <TextInput style={styles.textInput1}
                    placeholder='Password'
                    secureTextEntry={true}
                    type='password'
                    onChangeText={(text) => setPassword('loki123')}
                    value={password}
                />
                {/*############ ERROR #######################*/}
                {errorLogin === true
                    ?
                    <View style={styles.error}>
                        <MaterialCommunityIcons
                            name='alert-circle'
                            size={20}
                            color='#f00'
                        /><Text style={styles.warning}>Please enter a valid email or password</Text>
                    </View>
                    :
                    <View />
                }
                {/*############ FIM ERROR ##################*/}

                {email === "" || password === ""
                    ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.textLoginOff}>Login</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonLogin}
                        onPress={loginFirebase}
                    >
                        <Text style={styles.textLoginOn}>Login</Text>
                    </TouchableOpacity>
                }
                
                    <TouchableOpacity
                        style={styles.linkSubscribe}
                        onPress={()=>navigation.navigate('newUser')}
                    >
                        <Text style={styles.registration}>
                New User? Sign Up
                </Text>
                    </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInput: {
        color: '#f00',
        fontSize: 20,
    },
    textInput1: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#333333',
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
        width: '90%',
        height: 40,
        color:'#f7ede2'
    },
    login: {
        alignItems: 'center',
        width: '80%',
        height: '70%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 15,
        justifyContent: 'center',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    error: {
        flexDirection: 'row',
        width: '80%',
        
    },
    warning: {
        flexDirection: 'row',
        paddingLeft: 5,
        color:'#ff7b00'
    },
    buttonLogin: {
        width: 90,
        height: 45,
        backgroundColor: '#e50914',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        color: 'white',
    },
    textLoginOff: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    textLoginOn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    registration: {
        marginTop: 20,
        //fontWeight: 'italic',
        fontSize: 12,
        color:'#f7ede2',

    },
    linkSubscribe: {
        color: '#f8f9fa',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
});
