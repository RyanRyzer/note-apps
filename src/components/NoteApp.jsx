import React from 'react';
import NoteList from './NoteList';
import NoteInput from './NoteInput';
import { getData } from '../utils/data';

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getData(),
            archivedNotes: [],
            searchQuery: ""
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
        this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        const archivedNotes = this.state.archivedNotes.filter((note) => note.id !== id);
        this.setState({ notes, archivedNotes });
    }

    onAddNoteHandler({ title, body, imageUrl }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        imageUrl,
                        createdAt: new Date().toISOString(),
                        archived: false
                    }
                ]
            }
        });
    }

    onArchiveHandler(id) {
        const noteToArchive = this.state.notes.find((note) => note.id === id);
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState((prevState) => {
            return {
                notes,
                archivedNotes: [...prevState.archivedNotes, noteToArchive]
            }
        });
    }

    onUnarchiveHandler(id) {
        const noteToUnarchive = this.state.archivedNotes.find((note) => note.id === id);
        const archivedNotes = this.state.archivedNotes.filter((note) => note.id !== id);
        this.setState((prevState) => {
            return {
                notes: [...prevState.notes, noteToUnarchive],
                archivedNotes
            }
        });
    }

    onSearchChangeHandler(event) {
        this.setState({ searchQuery: event.target.value });
    }

    render() {
        const filteredNotes = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            note.body.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        const filteredArchivedNotes = this.state.archivedNotes.filter((note) =>
            note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            note.body.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        return (
            <div className="note-app">
                <h1>Note App</h1>
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={this.state.searchQuery}
                    onChange={this.onSearchChangeHandler}
                    className="search-bar"
                />
                <hr className="separator" />
                <NoteInput addNote={this.onAddNoteHandler} />
                <h2>Catatan Aktif</h2>
                <NoteList notes={filteredNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                <h2 className="archived-notes-header">Catatan Arsip</h2>
                <NoteList notes={filteredArchivedNotes} onDelete={this.onDeleteHandler} onUnarchive={this.onUnarchiveHandler} />
            </div>
        );
    }
}

export default NoteApp;
