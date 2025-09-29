import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function App() {

  const[email,setEmail]=useState("message")
  return (
    <View style={{margin:4,backgroundColor:"white",flex:1}}>
      <View style={{flex:2,width:"55%"}}>
        <Text>App</Text>

      <TextInput 
      style={{borderColor:"#2ec770",borderWidth:1,borderRadius:5}}
      placeholder='email'
      />
      </View>
    </View>
  )
}
