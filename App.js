import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json/`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Fechar o teclado
    } catch(error){
      console.log('ERROR: ' + error);
    }
  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}> Digite o CEP desejado </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 79000123"
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areabtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1D75CD'}]} onPress={ buscar }>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#CD3E1D'}]} onPress={ limpar }>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Municipio: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areabtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5
  },
  botaoText: {
    fontSize: 15,
    color: '#FFF'
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20
  }
});