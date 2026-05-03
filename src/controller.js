import { nanoid } from 'nanoid';
import notes from '../src/notes.js';

export const createNote = (req, res) => {
  const { title = 'untitled', tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };
  notes.push(newNote);
  //success newNote to notes response
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  //condition
  if (isSuccess) {
    return res.status(201).json({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { noteId: id }
    });
  }
  //fail newNote to notes response
  return res.status(500).json({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
};

export const getNotes = (req, res) => {
  return res.json({
    status: 'success',
    data: { notes }
  });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return res.json({
      status: 'success',
      data: { note }
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });
};

export const editNoteById = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt };
    return res.json({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  });
};

export const deleteNoteById = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return res.json({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  });
};