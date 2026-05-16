import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  getNotesSchema,
  noteIdParamSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', celebrate(getNotesSchema), getAllNotes);

router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);

router.post('/notes', celebrate(createNoteSchema), createNote);

router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

router.delete('/notes/:noteId', celebrate(noteIdParamSchema), deleteNote);

export default router;
