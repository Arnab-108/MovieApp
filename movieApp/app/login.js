import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const router = useRouter()
  const handleLogin = ()=>{
    const obj = {
      email,
      password
    }

    axios.post(`https://reqres.in/api/login`,obj).then(()=>{
      alert("Login Successfull!")
      router.push("/")
    }).catch((err)=>{
      alert("Something Went Wrong!:",err)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login"
        onPress={handleLogin} 
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 15,
    color: '#ff5a5f',
    textDecorationLine: 'underline',
  },
});

export default Login