import React, { Component } from "react";
import firebase from "firebase";
import config from "./../firebase.config";
import FileUploader from "react-firebase-file-uploader";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "glamor";

class Messages extends Component {
  ROOT_CSS = css({
    height: 600,
    width: 400
  });
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: "",
      messages: [],
      image: "",
      imageURL: ""
    };
  }
  //this is called 'life cycle method' function called by the system not the user
  componentDidMount() {
    firebase
      .database()
      .ref("messages/")
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages != null) {
          this.setState({
            messages: currentMessages
          });
        }
      });
  }
  handleUploadStart = () => {
    this.setState({
      progress: 0
    });
  };

  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      prgress: 100
    });
    firebase
      .storage()
      .ref("avatars")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          imageURL: url
        })
      );
  };

  render() {
    return (
      <div className="messagesSection">
        <ScrollToBottom className={this.ROOT_CSS}>
          <ol className="">
            {this.state.messages.map((message, i) => {
              return <li key={message.id}>{message.text}</li>;
            })}
            {this.state.image && (
              <img width="200" height="121" src={this.state.imageURL} />
            )}
          </ol>
          <FileUploader
            accept="image/*"
            name="image"
            storageRef={firebase.storage().ref("avatars")}
            onUploadStart={this.handleUploadStart}
            onUploadSuccess={this.handleUploadSuccess}
          />
        </ScrollToBottom>
      </div>
    );
  }
}

export default Messages;
