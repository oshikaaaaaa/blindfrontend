import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import NavigationBar from './components/Navigation/NavigationBar';
import Camera from './components/Camera/Camera';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ApiService from './services/ApiService';
import {decode as atob, encode as btoa} from 'base-64';

export default function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleImageCapture = (image) => {
    console.log("app", image);
    setCapturedImage(image);
  };

  const handleAudioReceived = (audio) => {
    setAudioFile(audio);
  };

  useEffect(() => {
    const fetchAudioFromApi = async () => {
      try {
        if (capturedImage) {
          // Convert the image to base64 format
         
          // Call the ApiService.sendImage() function with the base64 image
          // and pass the handleAudioReceived as a callback
          
          // const audioResponse = 
          await ApiService.sendImage(capturedImage);
        // console.log("audio record",audioResponse);
          // handleAudioReceived(audioResponse);
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
        // Handle errors if needed
      }
    };

    fetchAudioFromApi();

  }, [capturedImage]);

  // Function to convert image to base64 format
  const convertImageToBase64 = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  const convertBase64ToBinary = (base64) => {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (error) {
      console.error('Error converting base64 to binary:', error);
      throw error;
    }
  };

  // Function to convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar />
      <Camera onImageCapture={handleImageCapture} />
      <AudioPlayer audioFile={audioFile} />
    </View>
  );
}
