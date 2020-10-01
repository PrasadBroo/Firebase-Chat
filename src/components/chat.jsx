import React, { Component } from "react";
import { firestore, auth } from "../services/firebase";
import "../css/chat.css";
import ChatMsg from "./chatMsg";
import "../css/chatmsg.css";
import noteSound from "../audios/note.mp3";
import gotmsg from "../audios/gotmsg.mp3";
import Filter from  'bad-words';
import xss from 'xss';
let filter = new Filter();


class Chat extends Component {
  async componentDidMount() {
    document.body.style.backgroundColor = '#333';
    let msgsRef = firestore().collection("messages");
    let query = msgsRef.orderBy("createdAt", "desc").limit(25);
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
      } catch (error) {
        return;
      }
    });
  };
  componentWillUnmount(){
    document.body.style.backgroundColor = '#fff';
  };
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  };

  state = {
    msg: "",
    allMessages: [],
    btndisabled:true,
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
            onChange={(e)=> this.handelInputChange(e.target.value)}
            className="msg-input"
            value={this.state.msg}
            onKeyDown={this._handleKeyDown}
          />
          <button className="send-msg" disabled={this.state.btndisabled} onClick={this.handelSubmit}>
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }
  
  _handleKeyDown = (e)=> {
    if (e.key === 'Enter') {
      this.handelSubmit()
    }
  }


  handelInputChange = (e) => {
    this.setState({ msg: e});
    if(e ==='' || e.length ===0){
      this.setState({btndisabled:true});
    }
    else{
      this.setState({btndisabled:false});
    }
  };

  handelSubmit = async () => {
    let totalUserMsgs = firestore()
      .collection("messages")
      .where("uid", "==", auth().currentUser.uid);
    let userMsgs = (await totalUserMsgs.get()).docs.map((doc) => doc.data());
    if (userMsgs.length >= 100) return alert('Your Are Banned, Happy Chatting.');
    let { msg } = this.state;
    
    if ( msg.length > 69) return alert('Max Message Length Is Below 69');
    let msgsRef = firestore().collection("messages");

    
    let audio = new Audio(noteSound);
    audio.play();

    await msgsRef.add({
      msg: filter.clean(xss(msg)),
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid: auth().currentUser.uid,
      image: auth().currentUser.photoURL,
    });

    this.setState({ msg: "" ,btndisabled:true});
  };
}

export default Chat;
