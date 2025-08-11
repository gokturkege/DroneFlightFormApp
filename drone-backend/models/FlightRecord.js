const mongoose = require('mongoose');

const flightRecordSchema = new mongoose.Schema({
  model: String,
  serial: String,
  pilot: String,
  copilot: String,
  date: String,
  flightNo: String,
  formNo: String,
  logFile: String,
  region: String,
  wind: String,
  temperature: String,
  altitude: String,
  coordinates: String,
  weather: String,
  los: String,
  weight: String,
  range: String,
  duration: String,
  camera: String,
  center: String,
  signal: String,
  gps: String,
  batteryUsed: String,
  preVoltage: String,
  postVoltage: String,
  video: String,
  mission: String,
  takeoff: String,
  landing: String,
  emergency: String,
  report: String
}, { timestamps: true });

module.exports = mongoose.model('FlightRecord', flightRecordSchema, 'flightrecords');
