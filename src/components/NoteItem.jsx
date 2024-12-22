import React from "react";
import NoteItemBody from "./NoteItemBody";
import NoteItemImage from "./NoteItemImage";
import DeleteButton from "./DeleteButton";

function NoteItem({ imageUrl, title, body, createdAt, id, onDelete, onArchive, onUnarchive }) {
  return (
    <div className="note-item">
      <NoteItemImage imageUrl={imageUrl} />
      <NoteItemBody title={title} body={body} createdAt={createdAt} />
      <div className="note-item__actions">
        <DeleteButton id={id} onDelete={onDelete} />
        {onArchive && <button className="note-item__archive" onClick={() => onArchive(id)}>Arsipkan</button>}
        {onUnarchive && <button className="note-item__unarchive" onClick={() => onUnarchive(id)}>Kembalikan</button>}
      </div>
    </div>
  );
}

export default NoteItem;
