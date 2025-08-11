import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Uçuş Kayıt Uygulaması</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Yeni Form Kaydı</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Records')}>
        <Text style={styles.buttonText}>Geçmiş Kayıtlar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // koyu arka plan
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#E0E0E0', // açık yazı rengi
  },
  button: {
    backgroundColor: '#BB86FC', // mor tonlarında buton (dark theme uyumlu)
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#121212', // buton üstü koyu yazı rengi
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;