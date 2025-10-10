import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [paswd, setPaswd] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.51.168.93:8000/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: paswd,
          phone: phone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store user & token in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(data));
        console.log('Data saved', JSON.stringify(data));

        Alert.alert(
          "Success",
          data.message,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      } else {
        Alert.alert("Error", data.detail || data.message || "Registration failed");
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", String(error));
      }
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Enter Name'
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

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

        <Text style={styles.label}>Phone No</Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Enter phone number'
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <Button title='Register' onPress={handleRegister} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "80%",
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
  },
})
