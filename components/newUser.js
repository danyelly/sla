import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'
import image from "../assets/FundoFlix.jpg"

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function NewUser({ navigation }) {
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [birth, setBirth] = useState('')
    const [photo, setPhoto] = useState('')
    const [photoName, setPhotoName] = useState('')
    const [password, setPassword] = useState('')
    const [preview, setPreview] = useState("http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png")

    const [errorRegister, setErrorRegister] = useState('')
    const register = () => {
        if (photo == null)
            return;

        storage.ref(`/image/$photoName}`).put(photo).on("state_changed", alert("success"), alert);

        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                db.collection("usuarios").add({
                    nome: name,
                    imagem: photoName,
                    cpf: cpf,
                    nascimento: birth,
                    fone: phone,
                    email: email
                })

                navigation.navigate('initial', { idUser: user.uid })
            })
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code
                let errorMessage = error.message
            });
    }

    useEffect(() => {
        setPreview("http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png")
    }, []);

    useEffect(() => {
        if (!photo) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(photo)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)

    }, [photo])

    return (

        <ImageBackground source={{ uri: "https://1.bp.blogspot.com/-GjKJGwrzoJc/YPgn-T_sUsI/AAAAAAAAasg/dlyt5q9lnyET10yhD9jcEdzZiuWGjZAjQCLcBGAsYHQ/s1170/netflix-servico-distribuicao-jogos-mobile.jpg" }} style={styles.image} resizeMode="cover">

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.register}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.fotoFoto}>
                        <img src={preview} style={{ height: 120, width: 120, borderRadius: 80, border: 'none' }} />
                    </View>
                    <View style={styles.file}>
                        <input
                            type='file'
                            placeholder="Upload"
                            style={{ width: 200 }}
                            onChange={(e) => { (setPhoto(e.target.files[0]), setPhotoName(e.target.files[0].name)) }}
                        />
                    </View>

                    <TextInput style={styles.textInput1}
                        placeholder='Name'
                        type='text'
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <TextInput style={styles.textInput1}
                        placeholder='Email'
                        type='text'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput style={styles.textInput1}
                        placeholder='CPF'
                        type='text'
                        onChangeText={(text) => setCPF(text)}
                        value={cpf}
                    />
                    <TextInput style={styles.textInput1}
                        placeholder='Phone'
                        type='text'
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                    />
                    <TextInput style={styles.textInput1}
                        placeholder='Birthday'
                        type='text'
                        onChangeText={(text) => setBirth(text)}
                        value={birth}
                    />
                    <TextInput style={styles.textInput1}
                        placeholder='Password'
                        secureTextEntry={true}
                        type='password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    {/*############ ERROR #######################*/}
                    {errorRegister === true
                        ?
                        <View style={styles.error}>
                            <MaterialCommunityIcons
                                name='alert-circle'
                                size={20}
                                color='#f00'
                            /><Text style={styles.warning}>Invalid email or password...</Text>
                        </View>
                        :
                        <View />
                    }
                    {/*############ FIM ERROR ##################*/}

                    {email === "" || password === ""
                        ?
                        <TouchableOpacity
                            disabled={true}
                            style={styles.buttonRegister}
                        >
                            <Text style={styles.textRegisterOff}>Register</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.buttonRegister}
                            onPress={register}
                        >
                            <Text style={styles.textRegisterOn}>Register</Text>
                        </TouchableOpacity>
                    }

                </View>

            </KeyboardAvoidingView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        color: '#f00',
        fontSize: 20,
    },
    file: {
        marginTop: 20,
        marginBottom: 10,
    },
    fotoFoto: {
        alignItems: 'center',
        borderRadius: 80,
        justifyContent: 'center',
        backgroundColor: '#ddd',
        width: 120,
        height: 120,
        backgroundColor: '#495057',
        border: '2px solid white',
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
        color: '#f7ede2'
    },
    register: {
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 15,
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
        color: '#ff7b00'
    },
    buttonRegister: {
        width: 90,
        height: 45,
        backgroundColor: '#e50914',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        color: 'white',
    },
    textRegisterOff: {
        fontSize: 16,
        color: 'white',
    },
    textRegisterOn: {
        fontSize: 16,
        color: '#e9ecef',

    },
    registration: {
        marginTop: 20,
        // fontWeight: 'italic',
        fontSize: 12,
        color: '#f7ede2',

    },
    linkSubscribe: {
        color: '#f8f9fa',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
});
