import mongoose, { Document } from 'mongoose';
export interface IInquiry extends Document {
    name: string;
    email: string;
    phone: string;
    service?: string;
    message: string;
    status: 'pending' | 'contacted' | 'resolved';
    createdAt: Date;
}
declare const Inquiry: mongoose.Model<IInquiry, {}, {}, {}, mongoose.Document<unknown, {}, IInquiry, {}, mongoose.DefaultSchemaOptions> & IInquiry & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IInquiry>;
export default Inquiry;
//# sourceMappingURL=inquiry.model.d.ts.map