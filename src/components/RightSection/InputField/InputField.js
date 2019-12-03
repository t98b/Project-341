import React, { useState } from "react";
import { PaperclipIcon } from "./../../shared/Icon";
import "./../../Main.css";
import "./../../../App.css";
import firebase from "firebase";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

export const InputField = props => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const path = props.path;
  const context = props.context;
  const sendTo = props.sendTo;
  console.log(sendTo);

  const onChange = event => {
    setMessage(event.target.value);
  };

  const isDirectMessage = () => {
    return;
  };
  const messageType = (message) => {
    const newMessage = {
      message: message,
      user: props.user,
      timestamp: new Date()
    };
    return newMessage;
  };

  const uploadMessage = (newMesssage) => {
    let messagesRef = firebase
      .firestore()
      .collection("channels")
      .doc(sendTo);
    messagesRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(newMesssage)
    });
  };

  const sendMessage = event => {
    console.log(image);
    event.preventDefault();
    let mes = "";
    if (message !== "") {
      mes = messageType(message);
      uploadMessage(mes);
    }
    setMessage("");
  };

  const test = abc => {
    setLoading(abc);
  };

  const test1 = abc => {
    setImage(abc);
  };

  const imageInputHandler = () => {
    // console.log("clicked");
    document.querySelector("#image-input").click();
  };

  const handleImageUpload = event => {
    var image = event.target.files[0];
    if (image) {
      const uploadImage = firebase
        .storage()
        .ref("images/" + image.name)
        .put(image);

      uploadImage.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setMessage(url);
            });
        }
      );
    }
  };
    return(
        <div className="footer-container">
            <form className="input-field-container" onSubmit={sendMessage}>
                <span className="input-field-container--icon"><PaperclipIcon /></span>
                <input className="input-field-container--inputField" value={message} onChange={onChange} placeholder={'Message '} />
            </form>
            <div className={message.length > 2 ? "footer-tip footer-tip--displayed" : "footer-tip footer-tip--hidden"}>
                <span className="footer-send-tip"><b>Return</b> to send </span>
                <span><b>Shift + Return</b> to add a new line</span>
            </div>
        </div>
    );
};