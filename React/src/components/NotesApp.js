/**
 * Created by Clevin on 25.10.2016.
 */

import Masonry from 'masonry-layout'
import React from 'react'
import './NoteApp.scss'

class Note extends React.Component {
    render() {
        let style = {backgroundColor: this.props.color, color: this.props.textColor};

        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}>x</span>
                {this.props.children}
            </div>
        )
    }
}


class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            color: '#ffff00',
            textColor: {color: '#000000'}
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeTextColor =this.handleChangeTextColor.bind(this);
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    handleChangeTextColor(e) {
       
        this.setState({
            textColor: { color: e.target.value }
        })
    }

    handleChangeColor(e) {
        this.setState({ color: e.target.value })
    }

    handleNoteAdd() {
        let newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now(),
            textColor: this.state.textColor.color
        };

        this.props.onNoteAdd(newNote);
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <div className="note-editor">
                <textarea
                    className="textarea"
                    rows={5}
                    placeholder="Enter your note here..."
                    value={this.state.text}
                    onChange={this.handleTextChange}

                />
                <div className="colors-editor">
                    <input type="color" name="textColor" onChange={this.handleChangeTextColor} value={this.state.textColor.color} />
                    <input type="color" name="colorBg" onChange={this.handleChangeColor} value={this.state.color} />
                </div>
                <button
                    className="add-button"
                    onClick={this.handleNoteAdd}
                >
                    Add
                </button>
            </div>
        )
    }
}


class NotesGrid extends React.Component {
    componentDidMount() {
        let grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        })

    }

    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render() {

        return (

            <section className="notes-grid" ref="grid">
                {
                    this.props.notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                onDelete={this.props.onNoteDelete.bind(null, note)}
                                color={note.color}
                                textColor={note.textColor}

                            >
                                {note.text}
                            </Note>
                        )
                    })
                }
            </section>
        )
    }
}


export default class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this._updateLocalStorage = this._updateLocalStorage.bind(this);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));
        if(localNotes) {
            this.setState({ notes: localNotes });
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteDelete(note) {
        let noteId = note.id;
        let newNotes = this.state.notes.filter(note => note.id != noteId);
        this.setState({ notes: newNotes });
    }

    handleNoteAdd(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({notes: newNotes});
    }

    render() {

        return (
            <section className="notes-app">
                <h1>NotesApp</h1>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid  notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
            </section>

        )
    }

    _updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

}
