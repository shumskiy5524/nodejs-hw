import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  },
);
noteSchema.index({
  tag: 1,
});
export const Note = mongoose.model('Note', noteSchema);
