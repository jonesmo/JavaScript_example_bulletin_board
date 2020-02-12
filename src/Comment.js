import React, {Component} from 'react'
import {FaTrash} from 'react-icons/fa'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.removeComment = this.removeComment.bind(this)
  }

  removeComment() {
    this.props.onRemoveComment(this.props.index)
  }

  render() {
    return (
      <div>
      <div className="comment">
      <p>{this.props.children}</p>
      <span>
      <button id="remove" onClick={this.removeComment}><FaTrash /></button>
      </span>
      </div>
      </div>
    )
  }
}

export default Comment
