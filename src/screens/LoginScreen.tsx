import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("")
  const [paswd, setPaswd] = useState<string>("")

  return (
    <View style={styles.mainView}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Enter email'
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Enter password'
          placeholderTextColor="#888"
          secureTextEntry
          value={paswd}
          onChangeText={setPaswd}
        />

        <View style={styles.buttonContainer}>
          <Button title='Login' onPress={() => console.log("Login pressed")} />
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center", // center vertically
    alignItems: "center",     // center horizontally
    padding: 20,
  },
  formContainer: {
    width: "80%",  // makes it responsive
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  inputBox: {
    borderColor: "#2ec770",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "black"
  },
  buttonContainer: {
    marginTop: 10,
  }
})
