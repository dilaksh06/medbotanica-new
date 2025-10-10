import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const BASE_URL = "http://10.51.168.93:8000"; // Update your backend IP if needed

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
 const navigation = useNavigation<LoginScreenProp>();
  // ✅ Load JWT token on mount
  useEffect(() => {
    const loadUserToken = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setToken(parsed.access_token || parsed.token);
      }
    };
    loadUserToken();
  }, []);

  // === Pick Image from Gallery ===
  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Failed to pick image");
        } else if (response.assets && response.assets.length > 0) {
          const pickedImage = response.assets[0];
          setImageUri(pickedImage.uri || null);
          setCaption(null);
        }
      }
    );
  };

  // === Upload Image to Backend ===
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    if (!token) {
      Alert.alert("Error", "User not authenticated. Please log in again.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(`${BASE_URL}/user/predictions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCaption(data.caption);
      } else {
        Alert.alert("Prediction Failed", data.detail || data.message || "Try again later.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('user'); // clear only user data
    navigation.navigate('Login'); // go back to login screen
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Image Captioning</Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Button title="Pick an Image" onPress={pickImage} />

        <Button title="Logout" onPress={handleLogout} />
      <View style={{ height: 15 }} />

      <Button
        title="Predict Caption"
        onPress={uploadImage}
        disabled={loading}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2ec770"
          style={{ marginTop: 15 }}
        />
      )}

      {caption && (
        <View style={styles.captionBox}>
          <Text style={styles.captionText}>Prediction: {caption}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2ec770",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  captionBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    width: "90%",
  },
  captionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
