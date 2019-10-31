import React, { Component } from "react";
import firebase from "firebase";
import config from "./../firebase.config";
//import storage from "./../firebase.config";
import FileUploader from "react-firebase-file-uploader";

var selectedFile;

class Sender extends Component {
  constructor(props, context) {
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
      message: "",
      messages: [],
      image: "",
      url: "",
      progress: 0
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
  updateMessage(event) {
    //event and target is where the function is coming from.
    this.setState({
      message: event.target.value
    });
  }

  submitMessage(event) {
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    };
    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
  }

  handleUploadStart = () => {
    this.setState({
      progress: 0
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <input
          onChange={this.updateMessage}
          type="text"
          placeholder="Type here"
        />
        <button onClick={this.submitMessage}>Send</button>
        <br />
      </div>
    );
  }
}

export default Sender;
