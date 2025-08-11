import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'flight_records';

export default function RecordScreen() {
  const [records, setRecords] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecords = async () => {
        try {
          const data = await AsyncStorage.getItem(STORAGE_KEY);
          setRecords(data ? JSON.parse(data) : []);
        } catch (e) {
          console.error('Veriler alınamadı:', e);
        }
      };
      fetchRecords();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      'Silme Onayı',
      'Bu kaydı silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem(STORAGE_KEY);
              const currentRecords = data ? JSON.parse(data) : [];
              const updatedRecords = currentRecords.filter((r: any) => r.id !== id && r._id !== id);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
              setRecords(updatedRecords);
              Alert.alert('Başarılı', 'Kayıt silindi.');
            } catch (error) {
              console.error('Kayıt silme hatası:', error);
              Alert.alert('Hata', 'Kayıt silinirken hata oluştu.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RecordDetail', { record: item })}
      >
        <Text style={styles.title}>#{index + 1} - {item.pilot || 'Pilot İsmi Yok'}</Text>
        <Text style={styles.subtitle}>{item.date || 'Tarih Bilgisi Yok'}</Text>
      </TouchableOpacity>
      <View style={styles.deleteButton}>
        <Button title="Sil" color="red" onPress={() => handleDelete(item.id || item._id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Geçmiş Kayıtlar</Text>
      {records.length === 0 ? (
        <Text style={styles.noData}>Kayıt bulunamadı.</Text>
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || item._id || index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  noData: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
