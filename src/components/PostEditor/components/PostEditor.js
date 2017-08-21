import React, { Component } from "react";
import "../styles/PostEditor.css";

import MsgList from '../../MsgList/components/MsgList';
class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPostBody: "",
      openPopup:true
    };

    this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(
      this
    );
    this.createPost = this.createPost.bind(this);
  }

  handlePostEditorInputChange(ev) {
    this.setState({
      newPostBody: ev.target.value
    });
  }

  createPost() {
     this.props.addPost(this.state.newPostBody);
  }
  
  openMsgPopup = () => {
    if(this.state.openPopup) {
      document.querySelector('.msg-block').classList.toggle('hide');
      document.querySelector('.overlay').classList.toggle('hide');
    }
  }

  closePopup = () => {
    this.setState({openPopup: false});
    this.setState({newPostBody: ''});
    document.querySelector('.msg-block').classList.toggle('hide');
    document.querySelector('.overlay').classList.toggle('hide');
  }

  selectMsg =(selectedMsg) => {
      this.setState({newPostBody: selectedMsg});
      this.openMsgPopup();
  }

  hideFilter = () => {
    this.openMsgPopup();
  }

  render() {
    return (
      <div className="panel post-editor">
        <div className="panel-body">
          <MsgList selectMsg={this.selectMsg} closePopup={this.closePopup} />
          <textarea
            rows="6"
            className="form-control post-editor-input"
            value={this.state.newPostBody}
            onClick={this.openMsgPopup}
            onChange={this.handlePostEditorInputChange}
          />
          <div className="btn-block">
          <button
            className="btn btn-success post-editor-button"
            onClick={this.createPost}
          >
            Send Message
          </button>
          <a href={'tel:+91'+this.props.telNo} className="btn btn-success post-editor-button">
          Call Passenger
        </a>
        </div>
        </div>
        <div className="overlay hide" onClick={this.hideFilter}></div>
      </div>
    );
  }
}

export default PostEditor;
