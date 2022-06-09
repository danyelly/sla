import React, { useState, useEffect } from 'react'
import { Platform, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, Picker } from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import firebaseApp from './firebaseConfig'

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export default function CreateX({ navigation }) {

  const [description, setDescription] = useState()
  const [nome, setNome] = useState()
  const [preview, setPreview] = useState('')

  //############## Imagens ####################
  const [image, setImage] = useState('');
  const upload = () => {
    if (image == null)
      return;
    storage.ref(`/image/${description.replace(/ +/g, "") + "_" + image.name}`).put(image)
      .on("state_changed", alert("success"), alert);
  }

  const [page, setPage] = useState([]);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    db.collection('categoria').onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setPage(list)
      //console.log('preview:', preview)

    })
  }, []);

  for (let i = 0; i < page.length; i++) {
    // console.log('categorias:', page[i].id)
  }

  function adicionar() {
    db.collection("Filmes").add({
      descricao: description,
      idCategoriaFK: categoria,
      image: image.name,
      nome: nome
    })

    if (image == null || description == null || nome == null)
      return;
    storage.ref(`/image/${image.name}`).put(image)
      .on("state_changed", alert("success"), alert);
    setPreview(undefined)
    setDescription("")
    setNome('Cadastrado com sucesso')
    setTimeout(() => { setTexto('') }, 2000)
    //navigation.navigate("Read")
  }
  useEffect(() => {
    // console.log('categoriaSelect:', categoria)
    // console.log('nome:', nome)
    // console.log('descricao:', description)
    // console.log('imagem:', image)
  }, [categoria, nome, description, image])

  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)

  }, [image])

  return (
    <ImageBackground source={require('../assets/netflix.jpg')} style={styles.image} resizeMode="cover">

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <Text style={styles.titleText}>Create New Movie</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={setNome}
              value={nome}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              onChangeText={setDescription}
              value={description}
            />

            <Picker
              style={styles.picker}
              selectedValue={categoria}
              onValueChange={(item, indexItem) => setCategoria(item)
              }
            >
              {page.map((a, index) => {
                // console.log('a', a)
                return <Picker.Item label={a.nome} key={index} value={a.id}>Action</Picker.Item>
              })}

            </Picker>
            <View style={styles.foto}>
              <View style={styles.fotoFoto}>
                <img src={preview} style={{ height: 200, width: 200 }} />
              </View>
              <View style={styles.file}>
                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
              </View>
              <View style={styles.textSucesso}>
                <Text style={{ color: '#d00000', fontSize: 20 }}>{nome}</Text>
              </View>
              <TouchableOpacity
                style={styles.buttonSalvar}
                title='Salvar'
                onPress={() => {
                  adicionar(upload)
                }}
              >
                <Text style={styles.textSalvar}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View >
      </KeyboardAvoidingView>

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
    fontWeight: 'bold',
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
    backgroundColor: 'red',
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
    width: '60%',
    color: '#fefae0',
    border: '2px solid white',
  },
  salvar: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'arial',
    color: 'red',
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'calibri',
    marginTop: 30,
  },
  textSucesso: {
    flex: 1,
    //backgroundColor:'#555',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 0,
    marginTop: 0,
  },
  foto: {
    alignItems: 'center',
    marginTop: 30,
    // backgroundColor: '#495057',
    border: 'none',
    // border: '2px solid white',

  },
  fotoBotao: {
    marginTop: 20,
    width: '30%',


  },
  fotoFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 200,
    height: 200,
    backgroundColor: '#495057',
    border: '2px solid white',
  },
  create: {
    alignItems: 'center',
    width: '300%',
    height: '95%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#0a0908',

  },
  image: {
    width: '100%',
    flex: 1,
    justifyContent: "center",

  },
  caixa: {
    width: '60%',
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '#343a40',
    color: '#6c757d',
    border: '2px solid white',
  },
  picker: {
    width: '60%',
    marginTop: 30,
    color: '#ffffff',
    backgroundColor: '#0a0908',
    border: '2px solid white',

  }

})