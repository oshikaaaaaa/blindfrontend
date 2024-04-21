import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioPlayer =({ audioFile })=> {
  useEffect(() => {
    if (audioFile) {
      playAudio(audioFile);
    }
  }, [audioFile]);

  const playAudio = async (audioFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioFile },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  return null; // No visual component needed
}

export default AudioPlayer;