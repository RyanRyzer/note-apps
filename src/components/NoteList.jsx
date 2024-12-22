import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchive, onUnarchive }) {
    if (notes.length === 0) {
        return <p>{onArchive ? "Tidak ada catatan yang aktif" : "Tidak ada catatan yang diarsipkan"}</p>;
    }

    return (
        <div className="note-list">
            {
                notes.map((note) => (
                    <NoteItem
                        key={note.id}
                        id={note.id}
                        onDelete={onDelete}
                        onArchive={onArchive}
                        onUnarchive={onUnarchive}
                        {...note} />
                ))
            }
        </div>
    );
}

export default NoteList;
