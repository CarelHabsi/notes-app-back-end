import NoteRepositories from '../repositories/note-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createNote = async (req, res, next) => {
  /* line code ini hanya untuk menyimpan data notes pada memori saja tidak disimpan di database. Tidak perlu async await*/
  // const { title = 'untitled', tags, body } = req.body;
  // const id = nanoid(16);
  // const createdAt = new Date().toISOString();
  // const updatedAt = createdAt;

  // const newNote = { title, tags, body, id, createdAt, updatedAt };
  // notes.push(newNote);
  // //success newNote to notes response
  // const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // //condition
  // if (!isSuccess) {
  //   return next(new InvariantError('Catatan gagal ditambahkan'));
  // }
  // //fail newNote to notes response
  // return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: id });

  /* line code ini menyimpan data pada database*/
  const { title, body, tags } = req.validated; // ambil data dari req.validated dimana data ini sudah divalidasi oleh middleware validate()
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
  }); // panggil method createNote dari repository

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

export const getNotes = async (req, res) => {
  /* line code ini untuk menampilkan data notes dari memory bukan dari database*/
  // const { title = '' } = req.query;
  // if (title !== '') {
  //   const note = notes.filter((note) => note.title === title);
  //   return response(res, 200, 'success', { notes: note });
  // }

  // return res.json({
  //   status: 'success',
  //   data: { notes }
  // });

  /* line code ini untuk menampilkan data notes dari database*/
  const notes = await NoteRepositories.getNotes(); // panggil method getNotes dari repository
  return response(res, 200, 'Catatan sukses ditampilkan', { notes: notes });
};

export const getNoteById = async (req, res, next) => {
  /* line code ini untuk menampilkan data notes dari memory bukan dari database*/
  // const { id } = req.params;
  // const note = notes.filter((n) => n.id === id)[0];

  // if (!note) {
  //   return next(new NotFoundError('Catatan tidak ditemukan'));
  // }

  // return response(res, 200, 'Catatan sukses ditampilkan', { note: note });

  /* line code ini untuk menampilkan data notes dari database*/
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
  /* line code ini untuk mengupdate data notes dari memory bukan dari database*/
  // const { id } = req.params;
  // const { title, tags, body } = req.body;
  // const updatedAt = new Date().toISOString();
  // const index = notes.findIndex((n) => n.id === id);

  // if (index === -1) {
  //   return next(new NotFoundError('Catatan tidak ditemukan'));
  // }

  // notes[index] = { ...notes[index], title, tags, body, updatedAt };
  // return response(res, 200, 'Catatan berhasil diperbarui', notes[index]);

  /* line code ini untuk mengupdate data notes dari database*/
  const { id } = req.params;
  const {
    title,
    body,
    tags,
  } = req.validated;

  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNoteById = async (req, res, next) => {
  /* line code ini untuk menghapus data notes dari memory bukan dari database*/
  // const { id } = req.params;
  // const index = notes.findIndex((n) => n.id === id);

  // if (index === -1) {
  //   return next(new NotFoundError('Catatan tidak ditemukan'));
  // }

  // notes.splice(index, 1);
  // return response(res, 200, 'Catatan berhasil dihapus');

  /* line code ini untuk menghapus data notes dari database*/
  const { id } = req.params;
  const deletedNote = await NoteRepositories.deleteNote(id);

  if (!deletedNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};