import React, { Component } from "react";
import { firestore, auth } from "../services/firebase";
import "../css/chat.css";
import ChatMsg from "./chatMsg";
import "../css/chatmsg.css";
import noteSound from "../audios/note.mp3";

class Chat extends Component {
  async componentDidMount() {
    let msgsRef = firestore().collection("messages");
    let query = msgsRef.orderBy("createdAt", "desc").limit(25);
    query.onSnapshot((next) => {
        this.setState({
          allMessages: next.docs.map((data) => data.data()).reverse(),
        });
      });
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  state = {
    msg: null,
    allMessages: [],
  };
  render() {
    return (
      <div className="main-model">
        <div className="all-msgs">
          {this.state.allMessages.map((data, i) => {
            if (data.uid === auth().currentUser.uid) {
              return (
                <ChatMsg
                  image={data.image}
                  msg={data.msg}
                  key={i}
                  what="sent"
                />
              );
            }
            return <ChatMsg image={data.image} msg={data.msg} key={i} />;
          })}
        </div>
        <div className="text-msg">
          <input
            type="text"
            onChange={this.handelInputChange}
            className="msg-input"
          />
          <button className="send-msg" onClick={this.handelSubmit}>
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  handelInputChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  handelSubmit = async () => {
    let { msg } = this.state;
    let msgsRef = firestore().collection("messages");
    await msgsRef.add({
      msg: msg,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid: auth().currentUser.uid,
      image: auth().currentUser.photoURL,
    });

    let audio = new Audio(noteSound);
    audio.play();
  };
}

export default Chat;

