import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RecordDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const record = route.params?.record;

  if (!record) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Kayıt bulunamadı.</Text>
      </View>
    );
  }

  const handleDelete = async () => {
    try {
      const existing = await AsyncStorage.getItem('flight_records');  // burası önemli
      let records = existing ? JSON.parse(existing) : [];

      records = records.filter((r: any) => r.id !== record.id);

      await AsyncStorage.setItem('flight_records', JSON.stringify(records));  // burası da
      Alert.alert('Başarılı', 'Kayıt silindi.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Hata', 'Silme işlemi başarısız oldu.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kayıt Detayı</Text>
      {Object.entries(record).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{typeof value === 'string' ? value : JSON.stringify(value)}</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Kaydı Sil" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#ccc',
    width: 150,
    textTransform: 'capitalize',
  },
  value: {
    color: '#eee',
    flexShrink: 1,
  },
});
