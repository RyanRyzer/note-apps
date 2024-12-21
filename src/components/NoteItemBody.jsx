import React from 'react';

function NoteItemBody ({ title, body, createdAt}) {
    const formattedDate = new Date(createdAt).toLocaleString('id', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="note-item__body">
            <h3 className='note-item__title'>{title}</h3>
            <p className='note-item__date'>{formattedDate}</p>
            <p className='note-item__body'>{body}</p>
        </div>
    );
}

export default NoteItemBody;