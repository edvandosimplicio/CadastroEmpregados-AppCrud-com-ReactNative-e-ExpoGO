import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';
import { Feather as Icon } from '@expo/vector-icons';
 
export default function AppForm({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [nome, setNome] = useState(''); 
  const [setor, setSetor] = useState('');

  useEffect(() => {
    if(!route.params) return;
    setNome(route.params.nome);
    setSetor(route.params.setor);
  }, [route])
 
function handleDescriptionChange(nome){ setNome(nome); } 
function handleQuantityChange(setor){ setSetor(setor); }

async function handleButtonPress(){ 
  const listItem = {nome, setor: (setor)};
  Database.saveItem(listItem, id)
    .then(response => navigation.navigate("AppList", listItem));
}

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <View style={styles.inputContainer}> 
<TextInput 
  style={styles.input} 
  onChangeText={handleDescriptionChange} 
  placeholder="Informe seu nome completo"
  clearButtonMode="always"
  value={nome} /> 
<TextInput 
   style={styles.input} 
   onChangeText={handleQuantityChange} 
   placeholder="Informe seu setor"
   clearButtonMode="string"
   value={setor} /> 
<TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
  <View style={styles.buttonContainer}>
    <Icon name="save" size={22} color="white" />
    <Text style={styles.buttonText}>Salvar</Text> 
  </View>
</TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
  
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83C0EC',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#83C0EC',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },

  buttonContainer: {
    flexDirection: "row"
  },
  
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }

});