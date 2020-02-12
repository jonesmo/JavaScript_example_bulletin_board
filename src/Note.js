import React, {Component} from 'react'
import Comment from './Comment'
import {FaPencilAlt} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {FaSave} from 'react-icons/fa'
import {Container, Row, Col} from 'reactstrap'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      checked: false,
      comments: []
    }

    this.editNote = this.editNote.bind(this)
    this.removeNote = this.removeNote.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.renderNoteForm = this.renderNoteForm.bind(this)
    this.renderNoteDisplay = this.renderNoteDisplay.bind(this)
    this.randomBetween = this.randomBetween.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.noteAppearance = this.noteAppearance.bind(this)
    //
    this.addComment = this.addComment.bind(this)
    this.eachComment = this.eachComment.bind(this)
    this.removeComment = this.removeComment.bind(this)
    this.nextCommentId = this.nextCommentId.bind(this)
  }

  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150,'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px')
    }
  }

  randomBetween(x, y, s) {
    return x + Math.ceil(Math.random() * (y-x)) + s
  }

  componentDidUpdate() {
    var textArea
    if(this.state.editing) {
      textArea = this._newText
      textArea.focus()
      textArea.select()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.children !== nextProps.children || this.state !== nextState
    )
  }

  editNote() {
    this.setState ({
      editing: true
    })
  }
  removeNote() {
    this.props.onRemoveNote(this.props.index)
  }
  saveNote(e) {
    e.preventDefault()
    this.props.onChangeNote(this._newText.value, this.props.index)
    this.setState({
      editing: false
    })
  }

  handleCheckbox() {
    this.setState({
      checked: !this.state.checked
    })
  }

  noteAppearance() {
    var styleToUse = {backgroundColor: "yellow"}
    if (this.state.checked) styleToUse = {backgroundColor: "pink"}
    return (styleToUse)
  }

  //
  addComment(text) {
    //alert('tryna add a comment')
    this.setState(prevState => ({
      comments: [
        ...prevState.comments,
        {
          id: this.nextCommentId(),
          comment: text
        }
      ]
    }))
  }

  nextCommentId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  removeComment(id) {
    console.log('removing comment at', id)
    this.setState(prevState => ({
      comments: prevState.comments.filter(commentObj => commentObj.id !== id)
    }))
  }

  eachComment(commentObj, i) {
    console.log('making note at index',i)
    return (
      <Comment key={commentObj.id}
      index = {commentObj.id}
      onRemoveComment = {this.removeComment}>
      {commentObj.comment, 'Comment' + ' ' + commentObj.id}
      </Comment>
    )
  }

  renderNoteForm() {
    return(
      <Container>
      <div className="note" style={this.styleToUse}>
      <form onSubmit={this.saveNote}>
      <textarea ref={input => this._newText = input}
      defaultValue={this.props.children}/>
      <button id="save"><FaSave /></button>
      </form>
      </div>
      </Container>
    )
  }

  renderNoteDisplay() {
    var styleToUse = {...this.noteAppearance()}
    return (
      <Container>
      <div className="note d-md-block" style={styleToUse}>
      <p>{this.props.children}</p>
      <input type="checkbox" onChange={this.handleCheckbox} defaultChecked={this.state.checked} id="check"/>
      <button onClick={this.addComment.bind(null, "Comment ...")} id="comment">Comment</button>
      <span>
      <button id="edit" onClick={this.editNote}><FaPencilAlt /></button>
      <button id="remove" onClick={this.removeNote}><FaTrash /></button>
      </span>
      </div>
      {this.state.comments.map(this.eachComment)}
      </Container>
    )
  }
  render() {
    return this.state.editing ? this.renderNoteForm() : this.renderNoteDisplay()
  }
}

export default Note
