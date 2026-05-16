import { Segments, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .trim()
      .valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().allow(''),
    tag: Joi.string()
      .trim()
      .valid(...TAGS),
  }),
};

const objectIdValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message('Invalid note id!');
};

export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1),
    content: Joi.string().trim().allow(''),
    tag: Joi.string()
      .trim()
      .valid(...TAGS),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};
