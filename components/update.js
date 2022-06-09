import { NavigationContainer } from '@react-navigation/native'
import firebaseApp from './firebaseConfig'
import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet, ImageBackground
} from 'react-native'
import { Entypo, Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'

const db = firebaseApp.firestore()
const URL =
  'https://firebasestorage.googleapis.com/v0/b/somativanetfli.appspot.com/o/image%2F'
const Media = '?alt=media'
const storage = firebaseApp.storage()

export default function Update({ navigation }) {
  const [test, setTest] = useState([])

  const [nome, setNome] = useState('')
  const [imagem, setImagem] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [nome2, setNome2] = useState('')
  const [imagem2, setImagem2] = useState('')
  const [descricao2, setDescricao2] = useState('')
  const [categoria2, setCategoria2] = useState('')
  const [show, setShow] = useState(false)
  let i = 0

  function procuraFilme(nomeP) {
    db.collection('Filmes')
      .where('nome', '==', nomeP)
      .get()
      .then(querySnapshot => {
        const list = []
        querySnapshot.forEach(doc => {
          list.push({ ...doc.data() })
          setImagem(doc.data().image)
          setNome2(doc.data().nome)
          setCategoria(doc.data().idCategoriaFK)
          setCategoria2(doc.data().idCategoriaFK)
          setDescricao(doc.data().descricao)
          setDescricao2(doc.data().descricao)
        })
        setTest(list)
      })
      .catch(error => { })
    console.log(test)
    setShow(true)
  }

  function update() {
    console.log(nome)
    console.log(nome2)
    if (nome != nome2 || categoria != categoria2 || descricao != descricao2) {
      console.log('o nome mudou')
      db.collection("Filmes").doc(id).update({
        nome: nome2,
        idCategoriaFK: categoria,
        descricao: descricao
      }).then(() => alert('Data Updated'))
    }

    if (nome != nome2) {
      db.collection("Filmes").doc(id).update({
        nome: nome2
      }).then(() => alert('Name Updated'))
    }
    if (categoria != categoria2) {
      db.collection("Filmes").doc(id).update({
        idCategoriaFK: categoria
      }).then(() => alert('Category Updated'))
    }
    if (descricao != descricao2) {
      db.collection("Filmes").doc(id).update({
        descricao: descricao
      }).then(() => alert('Description Updated'))
    }
  }

  function showF() {
    setShow(false)
    setNome('')
  }

  return (
    <ImageBackground source={require('../assets/netflix-nova-animacao-logo.jpg')}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: "center",
        resizeMode: "cover"
      }}
    >
      <View style={{ backgroundColor: '#rgba(0,0,0,0.75)', flex: 1 }}>
        <View style={{ borderRadius: 5, width: '100%', justifyContent: 'center' }}>


          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            paddingLeft: '15px',
            marginTop: 30,
          }}>Update
          </Text>
          <TouchableOpacity
            onPress={() => { showF() }}
          >

          </TouchableOpacity>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginRight: 20
          }}>
            <TextInput
              placeholder="Name of the movie"
              onChangeText={setNome}
              value={nome}
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'calibri',
                marginTop: 45,
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.75)',
                marginLeft: 30,
                padding: 5,
                heigth: 'auto',
                width: '70%',
                color: '#fefae0',
                border: '2px solid white',
                marginBottom: 30,
              }}
            />

            <TouchableOpacity onPress={() => { procuraFilme(nome) }}>
              <Feather name='search' size='25px' color='red' />
            </TouchableOpacity>

          </View>
        </View>
        <ScrollView>

          <View style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
          >
            {show ?

              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Image source={{ uri: URL + imagem + Media }} style={{
                    height: 200,
                    width: 200,
                    justifyContent: 'center',
                    borderRadius: 5,
                    border: '1px solid white',
                    alignItems: 'center',
                  }} />
                </View>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}
                >
                  <TextInput
                    style={{
                      backgroundColor: '#0b090a',
                      borderRadius: 5,
                      padding: 10,
                      heigth: 'auto',
                      width: '95%',
                      color: '#fefae0',
                      border: '1px solid white',
                      marginTop: 5,
                    }}
                    placeholder='Name'
                    onChangeText={setNome2}
                    value={nome2}
                  />
                  <TextInput
                    style={{
                      backgroundColor: '#0b090a',
                      borderRadius: 5,
                      padding: 10,
                      heigth: 'auto',
                      width: '95%',
                      color: '#fefae0',
                      border: '1px solid white',
                      marginTop: 5,
                    }}
                    placeholder='Category'
                    onChangeText={setCategoria}
                    value={categoria}
                  />
                  <TextInput style={{
                    backgroundColor: '#0b090a',
                    borderRadius: 5,
                    padding: 10,
                    heigth: 'auto',
                    width: '95%',
                    color: '#fefae0',
                    border: '1px solid white',
                    marginBottom: 30,
                  }}
                    multiline={true}
                    numberOfLines={10}
                    placeholder='Description'
                    onChangeText={setDescricao}
                    value={descricao}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      update()
                    }}
                  >
                    <Text>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <></>
            }
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  subcontainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    top: 20
  },
  textSalvar: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  buttonSalvar: {
    width: 90,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    color: 'white',
    marginBottom: 10,
    padding: 0,
    backgroundColor: 'red'
  },
  file: {
    marginTop: 20,
    marginBottom: 15,
    paddingLeft: 65
  },

  textInput: {
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    marginTop: 30,
    padding: 10,
    height: 40,
    width: '95%',
    color: '#fefae0',
    border: '2px solid white'
  },
  salvar: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'arial',
    color: 'red'
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri',
    marginTop: 30
  },
  textSucesso: {
    flex: 1,
    //backgroundColor:'#555',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 0,
    marginTop: 0
  },
  foto: {
    alignItems: 'center',
    marginTop: 30,
    // backgroundColor: '#495057',
    border: 'none'
    // border: '2px solid white',
  },
  fotoBotao: {
    marginTop: 20,
    width: '30%'
  },
  fotoFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 200,
    height: 200,
    backgroundColor: '#495057',
    border: '2px solid white'
  },
  create: {
    alignItems: 'center',
    width: '300%',
    height: '95%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#0a0908'
  },
  image: {
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  caixa: {
    width: '95%',
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '#343a40',
    color: '#6c757d',
    border: '2px solid white'
  },
  picker: {
    width: '95%',
    marginTop: 30,
    color: '#ffffff',
    backgroundColor: '#0a0908',
    border: '2px solid white'
  }
})
