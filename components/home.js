import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from './firebaseConfig';
import { StyleSheet, Image, Text, View, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import './config'
const db = firebaseApp.firestore();
const URL = 'https://firebasestorage.googleapis.com/v0/b/somativanetfli.appspot.com/o/image%2F';
const Media = '?alt=media';

export default function Inicio({ navigation }) {
  const [page, setPage] = useState(undefined);

  const value = 'Filmes';

  useEffect(() => {
    db.collection(value).onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setPage(list)
    })
  }, []);

  const [modalActive, setModalActive] = useState(false);
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');

  function teste(imagem, descricao, nome) {
    setNome(nome);
    setImagem(imagem);
    setDescricao(descricao);
    setModalActive(true);
  }
  const ref = useRef();
  useEffect(() => {
    const checkOfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setModalActive(false);
      }
    };
    document.addEventListener("click", checkOfClickedOutside);
    return () => {
      document.removeEventListener("click", checkOfClickedOutside);
    };
  }, [modalActive])
  return (
    <NavigationContainer independent={true}>
      <View style={styles.navigationContainer}>

        <Text style={styles.title}>Popular on Netflix</Text>

        <ScrollView
          horizontal
        >
          <Modal
            animationType="none"
            tranparent={true}
            visible={modalActive}
            onRequestClose={() => setModalActive(false)}
          >
            <View style={styles.outerView}>
              <View style={styles.modalView} ref={ref}>
                <Text style={styles.modalText}>{nome}</Text>
                <Image style={styles.image} source={{ uri: URL + imagem + Media }} />
                <Text style={styles.modalDesc}>{descricao}</Text>
              </View>
            </View>
          </Modal>
          <FlatList style={styles.container}

            data={page}
            numColumns={4}
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.image}>
                  {/* {console.log('id', item)} */}
                  {
                    item.image != undefined
                      ?
                      <TouchableOpacity
                        onPress={() => { teste(item.image, item.descricao, item.nome) }}
                      >
                        <Image style={styles.image} source={{ uri: URL + item.image + Media }} />
                      </TouchableOpacity>
                      :
                      null
                  }
                </View>
              )
            }}

          />
        </ScrollView>
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    // backgroundColor: 'white',
    height: '100%',
    paddingTop: 50,
    paddingBottom: 50,
  },
  navigationContainer: {
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 20,

  },
  modalDesc: {
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    width: 300,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});

