import React from 'react';
import {
  Redirect,
  withRouter
} from 'react-router-dom';
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
class Call extends React.Component {
  constructor(props) {
    super(props);
    yourId = firebase.auth().currentUser.uid;
  }

  end() {
    window.score(firebase);
    this.props.history.push({
      pathname: '/users/' + yourId
    })
  }

  componentDidMount() {
    showMyFace();
  }

  render() {
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
          className="Call-retryButton"
          onClick={() => showFriendsFace()}
        >
          Retry
        </button>
        <button
          className="Call-endButton"
          onClick={() => this.end()}
        >
          End
        </button>
      </div>
    );
  }
}
export default withRouter(Call)
