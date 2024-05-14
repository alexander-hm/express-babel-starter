import Note from '../models/note';

export const getNotes = async () => {
  const allNotes = await Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
  return allNotes;
};

export const deleteNote = async (id) => {
  // await deleting a note and return confirmation
  try {
    const confirmation = await Note.findByIdAndDelete(id);
    return confirmation;
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};

export const createNote = async (fields) => {
  // make Note object
  const note = new Note();
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.zIndex = fields.zIndex;
  note.text = fields.text;

  // await creating a note and return note
  try {
    const savedNote = await note.save();
    return savedNote;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const updateNote = async (id, fields) => {
  const updatedNote = await Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
  return updatedNote;
};
