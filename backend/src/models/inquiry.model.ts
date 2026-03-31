import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: Date;
}

const inquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, default: 'General Consultation' },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Inquiry = mongoose.model<IInquiry>('Inquiry', inquirySchema);
export default Inquiry;