import { Image } from 'react-native';
import * as Speech from 'expo-speech';

export default class ApiService {
  static async sendImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: imageFile.uri,
      });

      const response = await fetch('http://192.168.1.139:8000/navigate/', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Accept': 'audio/mpeg', // Expected response content type
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching audio file: ${response.status}`);
      }

      console.log(response);
      const responseBody = await response.json();
      const instructions = responseBody.instructions;
      console.log(instructions);

      // Check if Speech is available on the platform
      if (Speech !== null && Speech.speak !== undefined && instructions) {
        await Speech.stop(); // Stop any existing speech
        await Speech.speak(instructions);
      } else {
        console.log('Speech module is not available on this platform');
      }

      return instructions; // Optionally return the instructions as well
    } catch (error) {
      console.log('Error sending image or speaking instructions:', error);
      return null;
    }
  }
}