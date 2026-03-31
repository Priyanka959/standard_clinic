import mongoose, { Document } from 'mongoose';
export interface ISubscriber extends Document {
    email: string;
    isActive: boolean;
    createdAt: Date;
}
declare const Subscriber: mongoose.Model<ISubscriber, {}, {}, {}, mongoose.Document<unknown, {}, ISubscriber, {}, mongoose.DefaultSchemaOptions> & ISubscriber & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISubscriber>;
export default Subscriber;
//# sourceMappingURL=subscriber.model.d.ts.map