import firebaseApp from './firebaseConfig';
import { Text, View,TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import React, {useEffect, useState} from 'react';

const db = firebaseApp.firestore();
const URL = 'https://firebasestorage.googleapis.com/v0/b/somativanetfli.appspot.com/o/image%2F';
const Media = '?alt=media';

export default function Search({navigation}){
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [show, setShow] = useState(false);

    useEffect(()=>{
        // console.log('nome:',nome)
        // console.log('imagem:',imagem)
    },[nome,imagem])

      function procuraFilme(nomeP){
        // console.log(nomeP)
        // console.log(imagem)
        // console.log(descricao)
        // console.log(categoria)

        db.collection("Filmes").where("nome",">=",nomeP).where("nome","<=",nomeP + '\uf8ff').get().then((querySnapshot) =>{
            querySnapshot.forEach((doc)=>{
                // console.log(doc.data());
                setImagem(doc.data().image);
                setDescricao(doc.data().descricao);
                setCategoria(doc.data().idCategoriaFK);

            })
        }).catch((error) => {
            // console.log("Error getting documents: ", error);
        });
        
        // console.log(imagem)
        // console.log(descricao)
        // console.log(categoria)
        setShow(true)
      }
      
      function showF(){
          setShow(false)
          setNome('')
      }

  return(
    <View>
        <Text>Search</Text>
        <TouchableOpacity
            onPress={()=>{showF()}}
        >
            <TextInput
                placeholder="Name of the movie"
                onChangeText={setNome}
                value={nome}
            />
        </TouchableOpacity>
        
        <TouchableOpacity
            onPress={()=>{procuraFilme(nome)}}
        >
            <Feather name='search' size='20px' color='red' />
        </TouchableOpacity>

        
        { show ?  
            <View>
                <View>
                <img src={URL + imagem + Media} style={{ height: 200, width: 200 }} />
                </View>
                <Text>{nome}</Text>
                <Text>Categoria: {categoria}</Text>
                <Text>{descricao}</Text>
         </View>
            :
            <></>
        }
    </View>

  );
}