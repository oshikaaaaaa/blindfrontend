import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';

export default function Camera({ onImageCapture }) {
  const cameraRef = useRef(null);

  useEffect(() => {
    const captureImagePeriodically = async () => {
      try {
        const { status } = await ExpoCamera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          console.log('Camera permission denied');
          return;
        }

        const interval = setInterval(async () => {
          if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log("here",photo);
            onImageCapture(photo); // Access the base64 string correctly
          }
        }, 30000); // 8 seconds

        return () => clearInterval(interval);
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    };

    captureImagePeriodically();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <ExpoCamera
          style={styles.camera}
          type={ExpoCamera.Constants.Type.back}
          ref={cameraRef}
        />
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center the camera container
    justifyContent: 'center', // Center the camera container
  },
  cameraContainer: {
    width: '80%', // Adjust the width as needed
    aspectRatio: 1, // 1:1 aspect ratio, adjust as needed
    height: height * 0.5, // Set height to 50% of the screen height
    marginTop: height * 0.25, // Center vertically by adding top margin
    overflow: 'hidden', // Ensure the camera is within the container
    borderRadius: 10, // Optional: Add border radius for styling
    borderWidth: 2, // Optional: Add border width for styling
    borderColor: '#FFF', // Optional: Add border color for styling
  },
  camera: {
    flex: 1,
  },
});