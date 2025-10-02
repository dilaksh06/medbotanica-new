import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type AuthLoadingProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function AuthLoading({ navigation }: AuthLoadingProps) {
  useEffect(() => {
    const checkLogin = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login'); 
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2ec770" />
    </View>
  );
}
