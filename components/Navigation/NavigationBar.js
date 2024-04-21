import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import ToggleMenu from './ToggleMenu';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarItems = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'Settings' },
    { id: '3', title: 'Help' },
    // Add more items as needed
  ];

  const renderNavbarItem = ({ item }) => (
    <TouchableOpacity style={styles.navbarItemContainer}>
      <Text style={styles.navbarItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <FlatList
          data={navbarItems}
          renderItem={renderNavbarItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.navbarItemsContainer}
        />
        {isMenuOpen && <ToggleMenu />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 0,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust for Android status bar height
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  navbarItemsContainer: {
    flex: 1,
  },
  navbarItemContainer: {
    paddingHorizontal: 10,
  },
  navbarItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationBar;