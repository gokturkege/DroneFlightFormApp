const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FlightRecord = require('./models/FlightRecord');

const app = express();
const PORT = 3000;

// Geliştirme ortamı için varsayılan bağlantı
const mongoUrl = process.env.MONGO_URL || 'mongodb://drone-mongo:27017/droneDB';

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB bağlantısı başarılı:', mongoUrl);

    app.get('/', (req, res) => {
      res.send('✅ Backend çalışıyor!');
    });

    app.get('/records', async (req, res) => {
      try {
        const records = await FlightRecord.find();
        console.log('📄 Tüm kayıtlar alındı:', records.length);
        res.json(records);
      } catch (err) {
        console.error('❌ Kayıtlar alınamadı:', err);
        res.status(500).json({ error: 'Kayıtlar alınamadı' });
      }
    });

    app.post('/records', async (req, res) => {
      try {
        console.log('📥 [POST /records] Gelen veri:', req.body);

        const newRecord = new FlightRecord(req.body);
        console.log('📄 [Model] Kayıt oluşturuldu:', newRecord);

        const savedRecord = await newRecord.save();
        console.log('✅ [MongoDB] Başarıyla kaydedildi:', savedRecord);

        res.status(201).json(savedRecord);
      } catch (err) {
        console.error('❌ [HATA] Kayıt eklenemedi:', err);
        res.status(400).json({ error: 'Kayıt eklenemedi', detay: err.message });
      }
    });

    app.get('/records/:id', async (req, res) => {
      try {
        const record = await FlightRecord.findById(req.params.id);
        if (!record) {
          console.warn('⚠️ Kayıt bulunamadı:', req.params.id);
          return res.status(404).json({ error: 'Kayıt bulunamadı' });
        }
        console.log('📄 Kayıt bulundu:', record);
        res.json(record);
      } catch (err) {
        console.error('❌ Kayıt alınamadı:', err);
        res.status(500).json({ error: 'Kayıt alınamadı' });
      }
    });

    app.delete('/records/:id', async (req, res) => {
      try {
        const deleted = await FlightRecord.findByIdAndDelete(req.params.id);
        if (!deleted) {
          console.warn('⚠️ Silinecek kayıt bulunamadı:', req.params.id);
          return res.status(404).json({ error: 'Kayıt bulunamadı' });
        }
        console.log('🗑️ Kayıt silindi:', deleted);
        res.json({ message: '✅ Kayıt silindi' });
      } catch (err) {
        console.error('❌ Silme işlemi başarısız:', err);
        res.status(500).json({ error: 'Silme işlemi başarısız' });
      }
    });

    app.listen(PORT, () => {
      console.log('🚀 Sunucu ${PORT} portunda çalışıyor');
    });
  } catch (err) {
    console.error('❌ MongoDB bağlantı hatası:', err);
    process.exit(1);
  }
}

startServer();