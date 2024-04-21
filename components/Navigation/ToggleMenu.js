import React from 'react';
import { View, StyleSheet } from 'react-native';

const ToggleMenu=()=> {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    // Add any additional styles for the toggle menu
  },
});

export default ToggleMenu;