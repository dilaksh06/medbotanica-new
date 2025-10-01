import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'

interface LoginData {

    name: string,
    email: string,
    password: string,
    phone: string,
    created_at: string

}

export default function RegisterScree() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [paswd, setPaswd] = useState<string>("")
    const [phone, setPhone] = useState<string>("")



    const handleRegister = async () => {
        try {
            const response = await fetch('http://10.94.48.93:8000/user/register', {
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
            const json = await response.json();
            Alert.alert("Error", json.detail);


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
                    placeholder='Enter Name'
                    placeholderTextColor="#888"
                    value={phone}
                    onChangeText={setPhone}
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
