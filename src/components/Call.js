import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import './Call.css';

const RTCPeerConnection = window.webkitRTCPeerConnection;

const servers = {
  'iceServers': [
    {
      urls: 'stun:stun.services.mozilla.com'
    },
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
};
const pc = new RTCPeerConnection(servers);

function sendMessage(sender, target, data) {
  const msg = firebase.database().ref().push({
    sender,
    target,
    message: data
  });
  msg.remove();
}

function readMessage(sender, target, data) {
  const val = data.val();
  if (!val.message) {
    return;
  }

  const msg = JSON.parse(val.message);
  if (val.sender === sender) {
    return;
  }

  if (msg.ice) {
    pc.addIceCandidate(new RTCIceCandidate(msg.ice));
  } else if (msg.sdp.type === 'offer') {
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
      .then(() => pc.createAnswer())
      .then((answer) => pc.setLocalDescription(answer))
      .then(() => {
        sendMessage(
          sender,
          target,
          JSON.stringify({
            sdp: pc.localDescription
          }));
      });
  } else if (msg.sdp.type == "answer") {
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
  }
}

export default class Call extends React.Component {
  getSelectedId() {
    return this.props.match.params.id;
  }

  getTargetId() {
    return this.props.match.params.target;
  }

  showFriend() {
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        sendMessage(
          this.getSelectedId(),
          this.getTargetId(),
          JSON.stringify({
            sdp: pc.localDescription
          }));
      });
  }

  showSelf() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      if (this.ourVideo) {
        this.ourVideo.srcObject = stream;
        pc.addStream(stream);
      }
    });
  }

  componentDidMount() {
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage(
          this.getSelectedId(),
          this.getTargetId(),
          JSON.stringify({
            ice: event.candidate
          }));
      } else {
        console.log('Send All Ice');
      }
    };
    pc.onaddstream = (event) => {
      if (this.theirVideo) {
        this.theirVideo.srcObject = event.stream;
      }
    };
    firebase.database().ref().on('child_added', (data) => readMessage(
      this.getSelectedId(),
      this.getTargetId(),
      data));
    this.showSelf();
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
          autoPlay
          className="Call-video Call-ourVideo"
          muted
          ref={(video) => this.ourVideo = video}
        />
        <video
          autoPlay
          className="Call-video Call-theirVideo"
          ref={(video) => this.theirVideo = video}
        />
        <button
            className="Call-button"
          onClick={() => this.showFriend()}
        >
          Retry
        </button>
      </div>
    );
  }
}

