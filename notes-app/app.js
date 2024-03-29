const chalk = require('chalk');
const yargs = require('yargs');
const note = require('./notes.js');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
       
    },
    handler(argv){
        note.addNote(argv.title,argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title you want to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.removeNote(argv.title)
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title you want to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.readNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    builder: {

    },
    handler(){
        note.listNotes()
    }
})

yargs.parse()