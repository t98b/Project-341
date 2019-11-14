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
  const messageType = message => {
    const newMessage = {
      message: message,
      user: props.user,
      timestamp: new Date()
    };
    return newMessage;
  };

  const uploadMessage = newMesssage => {
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

  return (
    <form className="input-field-container" onSubmit={sendMessage}>
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleImageUpload}
        //onChange={handleImageUpload}
      />

      {/* <span className="input-field-container--icon" onClick={imageInputHandler}>
        <PaperclipIcon />
      </span> */}
      <input
        className="input-field-container--inputField"
        value={message}
        onChange={onChange}
        placeholder={"Message "}
      />
    </form>
  );
};
