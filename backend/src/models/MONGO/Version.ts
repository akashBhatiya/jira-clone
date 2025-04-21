import mongoose from 'mongoose';
import * as Types from '../../Types';

const versionSchema = new mongoose.Schema<Types.IVersion>({
  frontend: {
    type: String,
    required: true
  },
  backend: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Version = mongoose.model<Types.IVersion>('Version', versionSchema);

export default Version;
