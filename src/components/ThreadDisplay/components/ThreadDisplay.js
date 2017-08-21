import React, { Component } from "react";
import Post from "../../Post/components/Post";
import PostEditor from "../../PostEditor/components/PostEditor";
import PassengerInfo from "../../PassengerInfo/components/PassengerInfo";
import axios from 'axios';

class ThreadDisplay extends Component {
  constructor(props) {
    super(props);

    this.databaseRef = this.props.database.ref().child("column1");
    this.databaseRef = this.props.database.ref().child("column1");
    // console.log(this.databaseRef);
    //this.addPost = this.addPost.bind(this);
    //this.updateLocalState = this.updateLocalState.bind(this);

    this.state = {
      posts: []
    };
  }

  // componentWillMount() {
  //   const { updateLocalState } = this;
  //   this.databaseRef.on("child_added", snapshot => {
  //     const response = snapshot.val();
  //     console.log(response);
  //     //updateLocalState(response);
  //   });
  // }

  addPost = (postBody) => {
    const { contact } = this.props.location.state;

    document.querySelector('.msg').classList.remove('hide');
    
  }

  updateStatus = (status) => {
    const {id, column } = this.props.location.state;
    var query = this.props.database.ref(`${column}/${id}/status`).set(status);
  }

  render() {
    return (
      <div>
        <PassengerInfo updateStatus={this.updateStatus} passengerData={this.props.location.state} />
        {this.state.posts.map((postBody, idx) => {
          return <Post key={idx} postBody={postBody} />;
        })}
        <PostEditor addPost={this.addPost} telNo ={this.props.location.state.contact}  />
        <p className="msg hide"> Message Successfully Sent!!!</p>
      </div>
    );
  }
}

export default ThreadDisplay;
