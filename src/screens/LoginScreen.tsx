import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = () => {
  
const [email, setEmail] = useState<string>("")
const [paswd, setPaswd] = useState<string>("")
const [lists, setLists] = useState<string[]>([])

function collectData(text: string) {
  setLists([...lists, text])  // ✅ appends the string to the list
}

    function submit(){
      Alert.alert("hi you have pressed the button")
    }


  return (
      <View style={styles.mainView}>
      <View style={{ flex: 2, width: "55%" }}>
        <Text>Email</Text>

        <TextInput
          style={styles.inputBox}
          placeholder='email'
          onChangeText={setEmail}
        />

        <Text>password</Text>

        <TextInput
          style={styles.inputBox}
          placeholder='email'
        />
        <Button
        title='submit'
        onPress={submit}/>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create(

  {
    mainView: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center"
    },
    inputBox: {
      borderColor: "#2ec770",
      borderWidth: 1,
      borderRadius: 5,
      color:"black"
      
    }


  }
)