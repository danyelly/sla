import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet,
  ImageBackground, ScrollView, FlatList, TouchableOpacity, Image
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import firebaseApp from './firebaseConfig'
//import Update from './update'


const db = firebaseApp.firestore();
const URL = 'https://firebasestorage.googleapis.com/v0/b/somativanetfli.appspot.com/o/image%2F';
const Media = '?alt=media';

export default function DeleteX({ navigation }) {

  function deleteItem(id) {
    db.collection("Filmes").doc(id).delete()
  }

  const [page, setPage] = useState([])

  useEffect(() => {
    db.collection("Filmes").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setPage(list)
    })
  }, [])

  return (
    <ImageBackground source={require('../assets/netflix-nova-animacao-logo.jpg')}
      style={{
        flex: 1,
        width: '100%',
        justifyContent: "center",
        resizeMode: "cover"
      }}
    >
      <View style={{ backgroundColor: '#rgba(0,0,0,0.75)', flex: 1, }}>
        <View style={{ borderRadius: 5, width: '100%', justifyContent: 'space-around' }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            paddingLeft: '15px',
            marginTop: 30,
          }}>Delete
          </Text>
          <View  style={{flex: 1}}>
          <ScrollView>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 15,
              marginLeft: 15
            }}>

              <FlatList
                data={page}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.pageDelete}>
                      <Image style={styles.img} source={{ uri: URL + item.image + Media }} />

                      <Text
                        style={styles.textDelete}
                        onPress={() => {
                          navigation.navigate("Update", {
                            id: item.id,
                            description: item.description
                          })
                        }}
                      >
                        {item.nome}
                      </Text>
                      <TouchableOpacity
                        style={styles.deleteItemX}
                        onPress={() => { deleteItem(item.id) }}
                      >
                        <FontAwesome
                          name='trash'
                          size={25}
                          color='#f00'
                        />
                      </TouchableOpacity>
                    </View>

                  )
                }}
              />
            </View>
          </ScrollView>
          </View>
          

        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',

  },
  img: {
    width: 100,
    height: 120,
  },
  pageDelete: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: 'rgba(150, 148, 147, 0.85)',
    alignItems: 'center',
    borderRadius: 5
  },
  deleteItemX: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textDelete: {
    width: 200,
    height: 25,
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#eee',
    padding: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: '#444',
    marginLeft: 5,
    fontSize: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    backgroundColor: 'black',
  }

})