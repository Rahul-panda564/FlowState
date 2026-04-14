import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, default: 'general' },
  description: { type: String }
}, { timestamps: true });

const SystemSetting = mongoose.model('SystemSetting', settingSchema);
export default SystemSetting;
