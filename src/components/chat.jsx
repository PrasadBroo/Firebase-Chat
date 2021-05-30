import React, { Component } from "react";
import { firestore, auth, firebaseStorage } from "../services/firebase";
import "../css/chat.css";
import ChatMsg from "./chatMsg";
import "../css/chatmsg.css";
import noteSound from "../audios/note.mp3";
import gotmsg from "../audios/gotmsg.mp3";
import Filter from "bad-words";
import Loader from "./Loader";
import ImageModel from "./ImageModel";
let filter = new Filter();

class Chat extends Component {
  async componentDidMount() {
    let msgsRef = firestore().collection("messages");
    let query = msgsRef.orderBy("createdAt", "desc").limit(25);
    this.state.gotMessages = true;
    query.onSnapshot(async (next) => {
      this.setState({
        allMessages: next.docs.map((data) => data.data()).reverse(),
      });

      try {
        if (
          auth().currentUser.uid !==
          this.state.allMessages[this.state.allMessages.length - 1].uid
        ) {
          let audio = new Audio(gotmsg);
          audio.play();
        }
        window.scrollTo(0, document.body.scrollHeight);
      } catch (error) {
        return;
      }
    });
  }

  state = {
    msg: "",
    allMessages: [],
    btndisabled: true,
    gotMessages: false,
    isImageUploading: false,
    isImageUploaded: true,
    displayImagePopup: false,
    displayPopupImageUrl: false,
  };

  render() {
    return (
      <div className="main-model">
        <ImageModel
          display={this.state.displayImagePopup}
          displayPopupImageUrl={this.state.displayPopupImageUrl}
          hidepopup={() => this.setState({ displayImagePopup: false })}
        />
        <div className="all-msgs">
          {!this.state.gotMessages && <Loader />}
          {this.state.allMessages.map((data, i) => {
            if (data.uid === auth().currentUser.uid) {
              return (
                <ChatMsg
                  handelPopup={this.handelImagePopup}
                  type={data.type ?? 'text'}
                  displayImg={data.messgaeImg}
                  image={data.image}
                  msg={data.msg}
                  key={i}
                  what="sent"
                />
              );
            }
            return (
              <ChatMsg
                handelPopup={this.handelImagePopup}
                type={data.type ?? 'text'}
                displayImg={data.messgaeImg}
                image={data.image}
                msg={data.msg}
                key={i}
                what="received"
              />
            );
          })}
        </div>
        <div className="text-msg">
          <div className="fileInput">
            <button className="imageInput" onClick={this.handelFileInput}>
              <i className="fas fa-link"></i>
            </button>
            <input
              type="file"
              accept="image/*"
              alt="Input Image"
              id="my_file"
              hidden
              multiple={false}
              onChange={this.handelImageChange}
            ></input>
          </div>

          <input
            type="text"
            onChange={(e) => this.handelInputChange(e.target.value)}
            className="msg-input"
            value={this.state.msg}
            onKeyDown={this._handleKeyDown}
          />
          <button
            className="send-msg"
            disabled={this.state.btndisabled}
            onClick={this.handelSubmit}
          >
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handelSubmit();
    }
  };

  handelInputChange = (e) => {
    this.setState({ msg: e });
    if (e.trim() === "" || e.length === 0 || e.length > 69) {
      this.setState({ btndisabled: true });
    } else {
      this.setState({ btndisabled: false });
    }
  };

  handelSubmit = async () => {
    let totalUserMsgs = firestore()
      .collection("messages")
      .where("uid", "==", auth().currentUser.uid);
    let userMsgs = (await totalUserMsgs.get()).docs.map((doc) => doc.data());
    if (userMsgs.length >= 100)
      return alert("Your Are Banned, Happy Chatting.");
    let { msg } = this.state;

    let msgsRef = firestore().collection("messages");

    let tempmsg = msg;
    this.setState({ msg: "", btndisabled: true });
    let audio = new Audio(noteSound);
    audio.play();

    await msgsRef.add({
      msg: filter.clean(tempmsg),
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid: auth().currentUser.uid,
      image: auth().currentUser.photoURL,
    });
  };

  handelImageChange = async (e) => {
    try {
      const [file] = e.target.files;
      const ref = firebaseStorage().ref("images");
      const fileName = new Date() + "-" + file.name;
      const metadata = { contentType: file.type };
      const task = await ref.child(fileName).put(file, metadata);
      this.addImageToMessgae(await task.ref.getDownloadURL());
    } catch (error) {
      alert(error.message);
    }
  };

  async addImageToMessgae(downloadUrl) {
    let msgsRef = firestore().collection("messages");
    await msgsRef.add({
      type: "image",
      messgaeImg: downloadUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid: auth().currentUser.uid,
      image: auth().currentUser.photoURL,
    });
  }

  handelFileInput() {
    document.getElementById("my_file").click();
  }

  handelImagePopup = (imageUrl) => {
    this.setState({ displayImagePopup: true, displayPopupImageUrl: imageUrl });
  };
}

export default Chat;
