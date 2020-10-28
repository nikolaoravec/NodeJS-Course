const chalk = require('chalk');
const fs = require('fs');

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse("Your notes:"));
    notes.forEach(note => {
        console.log(
            chalk.inverse("Title:") + note.title + chalk.inverse("Body:") + note.body)
        console.log("--------------------------");
    })
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

        if(noteToRead){
            console.log(chalk.inverse(noteToRead.title) + "\n" + noteToRead.body);
        }else{
            console.log(chalk.red.inverse("This title doesnt exist!"));
        }
}

const removeNote = (title) => {
    const oldNotesList = loadNotes()
    const newNotesList = oldNotesList.filter((note) => {
        note.title !== title
    })

    if (oldNotesList.length > newNotesList.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(newNotesList)
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }

    console.log(oldNotesList);
    console.log(newNotesList);
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);

    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}