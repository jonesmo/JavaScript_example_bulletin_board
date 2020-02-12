import React, {Component} from 'react'
import Note from './Note'
import {FaPlus} from 'react-icons/fa'
import { Container, Col, Row } from 'reactstrap'


class Board extends Component {
constructor(props) {
  super(props)
  this.state = {
    notes: []
  }
  this.addNote = this.addNote.bind(this)
  this.eachNote = this.eachNote.bind(this)
  this.updateNote = this.updateNote.bind(this)
  this.removeNote = this.removeNote.bind(this)
  this.nextNoteId = this.nextNoteId.bind(this)
}

componentWillMount() {
  var self = this
  if(this.props.count) {
    fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
    .then(response => response.json())
    .then(json => json[0]
    .split('. ')
    .forEach(sentence => self.add(sentence.substring(0, 25))))
  }
}

nextNoteId() {
  this.uniqueId = this.uniqueId || 0
  return this.uniqueId++
}

addNote(text) {
  this.setState(prevState => ({
    notes: [
      ...prevState.notes,
      {
        id: this.nextNoteId(),
        note: text
      }
    ]
  }))
}

updateNote(newText, i) {
  console.log('updating item at index', i, newText)
  this.setState(prevState => ({
    notes: prevState.notes.map(
      note => (note.id !== i) ? note : {...note, note: newText}
    )
  }))
}

removeNote(id) {
  console.log('removing item at', id)
  this.setState(prevState => ({
    notes: prevState.notes.filter(note => note.id !== id)
  }))
}

eachNote(note, i) {
  console.log('making note at index',i)
  return (
    <Note key={note.id}
    index = {note.id}
    onChangeNote = {this.updateNote}
    onRemoveNote = {this.removeNote}>
    {note.note}
    </Note>
  )
}

  render() {
    return (
      <div className="board">
      {this.state.notes.map(this.eachNote)}
      <button onClick={this.addNote.bind(null, "New Note")}
      id="addNote">
      <FaPlus />
      </button>
      </div>
    )
  }
}

export default Board
