import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'; 
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    model: '',
    serial: '',
    pilot: '',
    copilot: '',
    date: new Date(),
    flightNo: '',
    formNo: '',
    logFile: '',
    region: '',
    wind: '',
    temperature: '',
    altitude: '',
    coordinates: '',
    weather: '',
    los: '',
    weight: '',
    range: '',
    duration: '',
    camera: '',
    center: '',
    signal: '',
    gps: '',
    batteryUsed: '',
    preVoltage: '',
    postVoltage: '',
    video: '',
    mission: '',
    takeoff: '',
    landing: '',
    emergency: '',
    report: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      handleChange('date', selectedDate);
    }
  };

  const handleSave = async () => {
  try {
    const formattedData = {
      ...formData,
      date: formData.date.toISOString().split('T')[0],
    };

    console.log('📤 [Form Gönderimi] Backend’e gönderilecek veri:', formattedData);

    const response = await fetch('http://10.0.2.2:3000/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    });

    console.log('📥 [Response] Sunucudan dönen status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [Backend Hatası]:', errorText);
      throw new Error('Sunucu hatası: ' + response.status);
    }

    // ✅ Backend yanıtını al (içinde MongoDB _id’si var)
    const savedRecord = await response.json();
    console.log('✅ [Kayıt Başarılı]:', savedRecord);

    // ✅ AsyncStorage’a eklemek için önce mevcut veriyi al
    const existing = await AsyncStorage.getItem('flight_records');
    const records = existing ? JSON.parse(existing) : [];

    // ✅ Yeni kaydı doğrudan ekle (uuid değil, backend’den gelen veri)
    records.push(savedRecord);

    await AsyncStorage.setItem('flight_records', JSON.stringify(records));

    Alert.alert('Başarılı', 'Form kaydedildi.');
    navigation.navigate('Records');

  } catch (err: any) {
    console.error('❌ [Form Kaydetme Hatası]:', err);
    Alert.alert('Hata', err.message || 'Bir hata oluştu.');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Genel Bilgi */}
      <Text style={styles.sectionTitle}>Genel Bilgi</Text>
      <TextInput
        style={styles.input}
        placeholder="Model Adı"
        onChangeText={text => handleChange('model', text)}
        value={formData.model}
      />
      <TextInput
        style={styles.input}
        placeholder="Seri No"
        onChangeText={text => handleChange('serial', text)}
        value={formData.serial}
      />
      <TextInput
        style={styles.input}
        placeholder="Pilot Adı"
        onChangeText={text => handleChange('pilot', text)}
        value={formData.pilot}
      />
      <TextInput
        style={styles.input}
        placeholder="Yardımcı Pilot Adı"
        onChangeText={text => handleChange('copilot', text)}
        value={formData.copilot}
      />

      {/* Tarih Picker */}
      <Text style={styles.label}>Tarih</Text>
      <Button
        title={formData.date.toISOString().split('T')[0]}
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Uçuş No"
        onChangeText={text => handleChange('flightNo', text)}
        value={formData.flightNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Form No"
        onChangeText={text => handleChange('formNo', text)}
        value={formData.formNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Log Dosya Adı"
        onChangeText={text => handleChange('logFile', text)}
        value={formData.logFile}
      />

      {/* Hava Durumu */}
      <Text style={styles.sectionTitle}>Hava Durumu</Text>
      <TextInput
        style={styles.input}
        placeholder="Uçuş Bölgesi"
        onChangeText={text => handleChange('region', text)}
        value={formData.region}
      />
      <TextInput
        style={styles.input}
        placeholder="Rüzgar"
        onChangeText={text => handleChange('wind', text)}
        value={formData.wind}
      />
      <TextInput
        style={styles.input}
        placeholder="Sıcaklık"
        onChangeText={text => handleChange('temperature', text)}
        value={formData.temperature}
      />
      <TextInput
        style={styles.input}
        placeholder="Hedef Uçuş İrtifası"
        onChangeText={text => handleChange('altitude', text)}
        value={formData.altitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Bölge Koordinatı"
        onChangeText={text => handleChange('coordinates', text)}
        value={formData.coordinates}
      />
      <TextInput
        style={styles.input}
        placeholder="Hava Durumu"
        onChangeText={text => handleChange('weather', text)}
        value={formData.weather}
      />
      <TextInput
        style={styles.input}
        placeholder="LOS Kontrolü"
        onChangeText={text => handleChange('los', text)}
        value={formData.los}
      />

      {/* İHA Bilgileri */}
      <Text style={styles.sectionTitle}>İHA Bilgileri</Text>
      <TextInput
        style={styles.input}
        placeholder="Kalkış Ağırlığı"
        onChangeText={text => handleChange('weight', text)}
        value={formData.weight}
      />
      <TextInput
        style={styles.input}
        placeholder="Uçuş Menzili"
        onChangeText={text => handleChange('range', text)}
        value={formData.range}
      />
      <TextInput
        style={styles.input}
        placeholder="Uçuş Süresi"
        onChangeText={text => handleChange('duration', text)}
        value={formData.duration}
      />

      {/* Kamera Picker */}
      <Text style={styles.label}>Kullanılan Kamera</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.camera}
          onValueChange={value => handleChange('camera', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz..." value="" />
          <Picker.Item label="Gündüz" value="Gündüz" />
          <Picker.Item label="Termal" value="Termal" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ağırlık Merkezi Kontrolü"
        onChangeText={text => handleChange('center', text)}
        value={formData.center}
      />
      <TextInput
        style={styles.input}
        placeholder="Bağlantı Sinyal Seviyesi"
        onChangeText={text => handleChange('signal', text)}
        value={formData.signal}
      />
      <TextInput
        style={styles.input}
        placeholder="GPS Uydu Sayısı ve HDOP Değeri"
        onChangeText={text => handleChange('gps', text)}
        value={formData.gps}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanılan mAh"
        onChangeText={text => handleChange('batteryUsed', text)}
        value={formData.batteryUsed}
      />

      {/* Güç Sistemi */}
      <Text style={styles.sectionTitle}>Güç Sistemi</Text>
      <TextInput
        style={styles.input}
        placeholder="Batarya 1 Voltaj Kalkış Öncesi"
        onChangeText={text => handleChange('preVoltage', text)}
        value={formData.preVoltage}
      />
      <TextInput
        style={styles.input}
        placeholder="Batarya 1 Voltaj Uçuş Sonrası"
        onChangeText={text => handleChange('postVoltage', text)}
        value={formData.postVoltage}
      />

      {/* Uçuş Detayları */}
      <Text style={styles.sectionTitle}>Uçuş Detayları</Text>
      <TextInput
        style={styles.input}
        placeholder="Video Dosyası ve Depolama"
        onChangeText={text => handleChange('video', text)}
        value={formData.video}
      />
      <TextInput
        style={styles.input}
        placeholder="Görev"
        onChangeText={text => handleChange('mission', text)}
        value={formData.mission}
      />

      {/* Kalkış Picker */}
      <Text style={styles.label}>Kalkış</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.takeoff}
          onValueChange={value => handleChange('takeoff', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz..." value="" />
          <Picker.Item label="Loiter" value="loiter" />
          <Picker.Item label="Auto" value="auto" />
          <Picker.Item label="Althold" value="althold" />
          <Picker.Item label="Stabilize" value="stabilize" />
        </Picker>
      </View>

      {/* İniş Picker */}
      <Text style={styles.label}>İniş</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.landing}
          onValueChange={value => handleChange('landing', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz..." value="" />
          <Picker.Item label="Loiter" value="loiter" />
          <Picker.Item label="Auto" value="auto" />
          <Picker.Item label="Althold" value="althold" />
          <Picker.Item label="Stabilize" value="stabilize" />
          <Picker.Item label="RTL" value="rtl" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Acil Durum (Batarya - RF - GPS - Datalink - Kırım - Diğer)"
        onChangeText={text => handleChange('emergency', text)}
        value={formData.emergency}
      />
      <TextInput
        style={styles.input}
        placeholder="Uçuş Raporu ve Notlar"
        onChangeText={text => handleChange('report', text)}
        value={formData.report}
      />

      {/* Kaydet Butonu */}
      <View style={{ marginTop: 20 }}>
        <Button title="Kaydet" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default FormScreen;