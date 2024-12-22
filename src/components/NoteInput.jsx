import React from 'react';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            imageUrl: "",
            titleCharLimit: 20,
            bodyCharLimit: 200
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onImageFileChangeEventHandler = this.onImageFileChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const maxLength = this.state.titleCharLimit;
        if (event.target.value.length <= maxLength) {
            this.setState({ title: event.target.value });
        }
    }

    onBodyChangeEventHandler(event) {
        const maxLength = this.state.bodyCharLimit;
        if (event.target.value.length <= maxLength) {
            this.setState({ body: event.target.value });
        }
    }

    onImageFileChangeEventHandler(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState({ title: "", body: "", imageUrl: "" });
    }

    render() {
        const { titleCharLimit, bodyCharLimit, title, body } = this.state;
        const titleCharsLeft = titleCharLimit - title.length;
        const bodyCharsLeft = bodyCharLimit - body.length;

        return (
            <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <div className="input-group">
                    <small>{titleCharsLeft} karakter tersisa</small>
                    <input type="text" placeholder="Judul" value={title} onChange={this.onTitleChangeEventHandler} />
                </div>
                <div className="input-group">
                    <small>{bodyCharsLeft} karakter tersisa</small>
                    <textarea placeholder="Tulis catatanmu disini..." value={body} onChange={this.onBodyChangeEventHandler} />
                </div>
                <input type="file" accept="image/*" onChange={this.onImageFileChangeEventHandler} />
                <button type="submit">Tambah</button>
            </form>
        )
    }
}

export default NoteInput;
