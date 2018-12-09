'use strict';
import utilService from '../service/util-service.js';
import storageService from '../service/storage-service.js';

const NOTES_KEY = 'notes';
var notes = [];

function quary (filter = null) {

  return storageService.load(NOTES_KEY).then(notes => {
    if (!notes || !notes.length) {
      notes = _generateNotes();
      storageService.store(NOTES_KEY, notes);
    }
    if (!filter) {
      return notes;
    } else {
      var filterdNotes = notes.filter(note => {
        return note.data.title.toUpperCase().includes(filter.byTxt.toUpperCase()) ||
          note.data.txt.toUpperCase().includes(filter.byTxt.toUpperCase())
      })
      if (filter.byType === 'all') return filterdNotes;
      return filterdNotes.filter(note => {
        return filter.byType === note.type;
      })
    }
  });
}


function deleteNote (noteId) {
  return storageService.load(NOTES_KEY)
    .then(notes => {
      var noteIdx = notes.findIndex(note => note.data.id === noteId);
      notes.splice(noteIdx, 1);
      storageService.store(NOTES_KEY, notes);
      return notes;
    })
}

function getNoteById (noteId) {
  return quary().then(notes => {
    return notes.find(note => {
      return note.data.id === noteId;
    });
  });
}

function saveNote (note) {
  quary().then(notes => {
    if (note.data.id) {
      var noteIdx = notes.findIndex(currNote => currNote.data.id === note.data.id)
      notes.splice(noteIdx, 1, note);
    } else {
      note.data.id = utilService.makeId();
      notes.push(note);
    }
    return storageService.store(NOTES_KEY, notes);
  });
}

export const keepService = {
  quary,
  getNoteById,
  saveNote,
  deleteNote
};



function _generateNotes () {
  var notesNew = [
    {
      type: 'txtNote',
      data: {
        id: utilService.makeId(),
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        txt: 'Learn py',
        title: '1',
        isPinned: false,
        color: 'red',
        backgroundColor: 'yellow'
      }
    },
    {
      type: 'imgNote',
      data: {
        id: utilService.makeId(),
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        url: 'img/1.jpg',
        title: 'My sis',
        txt: 'My beautifull sis :)',
        isPinned: false,
        color: 'lightgreen',
        backgroundColor: 'white'
      }
    },
    {
      type: 'txtNote',
      data: {
        id: utilService.makeId(),
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        title: 'Buy new laptop',
        txt: 'Buy new laptop',
        isPinned: false,
        color: 'black',
        backgroundColor: 'white'
      }
    },
    {
      type: 'imgNote',
      data: {
        id: utilService.makeId(),
        time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        url: 'img/2.jpg',
        title: 'Joe',
        txt: 'joe !!',
        isPinned: false,
        color: 'red',
        backgroundColor: 'lightblue'
      }
    }
  ];
  return notesNew;
}
