import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from './firebaseConfig';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';

const db = firebaseApp.firestore();
const URL = 'https://firebasestorage.googleapis.com/v0/b/somativanetfli.appspot.com/o/image%2F';
const Media = '?alt=media';

export default function loginInfo({ navigation }) {

  console.log('----------------------- user', global.config.userId)

  const [nome, setNome] = useState('');
  const [nome2, setNome2] = useState('');
  const [id, setId] = useState(global.config.userId);
  const [imagem, setImagem] = useState('');
  const [imagem2, setImagem2] = useState('');
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [cpf, setCPF] = useState('');
  const [cpf2, setCPF2] = useState('');
  const [nasc, setNasc] = useState('');
  const [nasc2, setNasc2] = useState('');
  const [fone, setFone] = useState('');
  const [fone2, setFone2] = useState('');

  useEffect(() => {
    db.collection("usuarios").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id == id) {
          setNome(doc.data().nome);
          setNome2(doc.data().nome);
          setImagem(doc.data().imagem);
          setImagem2(doc.data().imagem);
          setFone(doc.data().fone);
          setFone2(doc.data().fone);
          setNasc(doc.data().nascimento);
          setNasc2(doc.data().nascimento);
          setCPF(doc.data().cpf);
          setCPF2(doc.data().cpf);
          setEmail(doc.data().email);
          setEmail2(doc.data().email);
        }
      })
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);



  console.log(nome)
  const signOutUser = async () => {
    try {
      await firebaseApp.auth().signOut();
      navigation.navigate('login')
    } catch (error) {
      console.log("Error signing out")
    }
  }

  function update(valueP) {
    if (valueP == 1) {
      db.collection("usuarios").doc(id).update({
        nome: nome
      }).then(() => alert('Name Updated'))
    }

    if (valueP == 3) {
      db.collection("usuarios").doc(id).update({
        cpf: cpf
      }).then(() => alert('CPF Updated'))
    }
    if (valueP == 4) {
      db.collection("usuarios").doc(id).update({
        nascimento: nasc
      }).then(() => alert('Date birthday Updated'))
    }
    if (valueP == 5) {
      db.collection("usuarios").doc(id).update({
        fone: fone
      }).then(() => alert('Phone Updated'))
    }
  }
  return (
    <View style={styles.container}>

      <View stye={styles.logout}>
        <TouchableOpacity
          onPress={() => signOutUser()}>
          <Feather name="log-out" size='20px' color='white' margin='8px' />
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.nomeUser}>Hello {nome2}!</Text>
        <View style={styles.fotoFoto}>
          <Image source={{ uri: URL + imagem + Media }} style={{ height: 200, width: 200, borderRadius: 120 }} />
        </View>
        <View style={styles.editar}>
          <TextInput
            placeholder="Name"
            onChangeText={setNome}
            value={nome}
            style={styles.textInput1}
          />
          <TouchableOpacity
            onPress={() => { update(1) }}
          >
            <Feather
              name='edit'
              size={15}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.editar}>
          <Text style={styles.textT}>
            {email}
          </Text>
        </View>
        <View style={styles.editar}>
          <TextInput
            placeholder="CPF"
            onChangeText={setCPF}
            value={cpf}
            style={styles.textInput1}
          />
          <TouchableOpacity
            onPress={() => { update(3) }}
          >
            <Feather
              name='edit'
              size={15}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.editar}>
          <TextInput
            placeholder="Date Birthday"
            onChangeText={setNasc}
            value={nasc}
            style={styles.textInput1}
          />
          <TouchableOpacity
            onPress={() => { update(4) }}
          >
            <Feather
              name='edit'
              size={15}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.editar}>
          <TextInput
            placeholder="Phone"
            onChangeText={setFone}
            value={fone}
            style={styles.textInput1}
          />
          <TouchableOpacity
            onPress={() => { update(5) }}
          >
            <Feather
              name='edit'
              size={15}
              color='white'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'black',
  },
  nomeUser: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    top: 5
  },
  editar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  conteudo: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '100%'
  },
  logout: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-end',
    margin: '8px',
    backgroundColor: 'red',
    height: 20
  },
  textCont: {
    color: 'white'
  },
  fotoFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 200,
    height: 200,
    backgroundColor: '#495057',
    border: '2px solid white',
    borderRadius: 120,
    marginBottom: 20,
    marginTop: 20
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
  textT: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
    width: 180,
    height: 40,
    color: '#f7ede2'
  }
})