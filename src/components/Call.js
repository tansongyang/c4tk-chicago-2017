import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import './Call.css';

//this makes sure that our code will work on different browsers
var RTCPeerConnection = window.webkitRTCPeerConnection;

//Create an account on Firebase, and use the credentials they give you in place of the following
 var config = {
   apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
   authDomain: "christianminglebutbetter.firebaseapp.com",
   databaseURL: "https://christianminglebutbetter.firebaseio.com",
   projectId: "christianminglebutbetter",
   storageBucket: "christianminglebutbetter.appspot.com",
   messagingSenderId: "904563004940"
 };
firebase.initializeApp(config);

var database = () => firebase.database().ref();
var yourVideo = () =>  document.getElementById("yourVideo");
var friendsVideo = () => document.getElementById("friendsVideo");
var yourId = null;
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'}]};
var pc = new RTCPeerConnection(servers);
pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
pc.onaddstream = (event => friendsVideo().srcObject = event.stream);

function sendMessage(senderId, data) {
    var msg = database().push({ sender: senderId, message: data });
    msg.remove();
}

function readMessage(data) {
    if (!data.val().message) {
      return;
    }
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != yourId) {
        if (msg.ice != undefined)
            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        else if (msg.sdp.type == "offer")
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
              .then(() => pc.createAnswer())
              .then(answer => pc.setLocalDescription(answer))
              .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
        else if (msg.sdp.type == "answer")
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
};

database().on('child_added', readMessage);

function showMyFace() {
  navigator.mediaDevices.getUserMedia({audio:true, video:true})
    .then(stream => yourVideo().srcObject = stream)
    .then(stream => pc.addStream(stream));
}

function showFriendsFace() {
  pc.createOffer()
    .then(offer => pc.setLocalDescription(offer) )
    .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
}
export default class Call extends React.Component {
  constructor(props) {
    super(props);
    yourId = firebase.auth().currentUser.uid;
  }

  getSelectedId() {
    return this.props.match.params.id;
  }

  getTargetId() {
    return this.props.match.params.target;
  }

  // showFriend() {
  //   pc.createOffer()
  //     .then((offer) => pc.setLocalDescription(offer))
  //     .then(() => {
  //       sendMessage(
  //         this.getSelectedId(),
  //         this.getTargetId(),
  //         JSON.stringify({
  //           sdp: pc.localDescription
  //         }));
  //     });
  // }

  // showSelf() {
  //   navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
  //     if (this.ourVideo) {
  //       this.ourVideo.srcObject = stream;
  //       pc.addStream(stream);
  //     }
  //   });
  // }

  componentDidMount() {
    // pc.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     sendMessage(
    //       this.getSelectedId(),
    //       this.getTargetId(),
    //       JSON.stringify({
    //         ice: event.candidate
    //       }));
    //   } else {
    //     console.log('Send All Ice');
    //   }
    // };
    // pc.onaddstream = (event) => {
    //   if (this.theirVideo) {
    //     this.theirVideo.srcObject = event.stream;
    //   }
    // };
    // firebase.database().ref().on('child_added', (data) => readMessage(
    //   this.getSelectedId(),
    //   this.getTargetId(),
    //   data));
    showMyFace();
  }

  render() {
    const selectedId = this.getSelectedId();
    const targetId = this.getTargetId();
    if (!selectedId || !targetId) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div className="Call">
        <video
          id="yourVideo"
          autoPlay
          className="Call-video Call-ourVideo"
          muted
          ref={(video) => this.ourVideo = video}
        />
        <video
          id="friendsVideo"
          autoPlay
          className="Call-video Call-theirVideo"
          ref={(video) => this.theirVideo = video}
        />
        <button
          className="Call-button"
          onClick={() => showFriendsFace()}
        >
          Retry
        </button>
      </div>
    );
  }
}

