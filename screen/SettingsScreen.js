import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const SettingScreen = () => {
  const handleButtonPress = (buttonName) => {
    // Xử lý khi người dùng nhấn vào một nút
    console.log(`Pressed ${buttonName}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: styles.background }]}
        onPress={() => handleButtonPress('Button 1')}
      >
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: styles.background }]}
        onPress={() => handleButtonPress('Button 2')}
      >
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: styles.background }]}
        onPress={() => handleButtonPress('Button 3')}
      >
        <Text style={styles.buttonText}>Button 3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: styles.background }]}
        onPress={() => handleButtonPress('Button 4')}
      >
        <Text style={styles.buttonText}>Button 4</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  button: {
    width: '80%',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  background: '#FF5733', // Màu nền của các nút
});

export default SettingScreen;
