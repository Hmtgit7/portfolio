// src/models/Contact.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const ContactSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    subject: {
        type: String,
        default: 'Portfolio Contact Form',
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Contact', ContactSchema);