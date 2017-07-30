import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import './Call.css';

const RTCPeerConnection = window.webkitRTCPeerConnection;

const servers = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  }]
};

export default class Call extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pc: null
    };
  }

  getSelectedId() {
    return this.props.match.params.id;
  }

  getTargetId() {
    return this.props.match.params.target;
  }

  callFriend() {
    const { pc } = this.state;
    pc.createOffer()
      .then((offer) => {
        pc.setLocalDescription(offer);
        this.sendMessage(
          this.getSelectedId(),
          this.getTargetId(),
          JSON.stringify({
            sdp: pc.localDescription
          }));
      });
  }

  sendMessage(sender, target, data) {
    const msg = firebase.database().ref().push({
      sender,
      target,
      message: data
    });
    msg.remove();
  }

  readMessage(data) {
    const val = data.val();
    if (!val.message) {
      console.log('Read unexpected message')
      console.log(val)
      return;
    }

    const msg = JSON.parse(val.message);
    const target = data.val().target;
    if (target !== this.getSelectedId()) {
      console.log('Got target ' + target + ' but expected ' + this.getTargetId())
      return;
    }

    const { pc } = this.state;
    if (msg.ice) {
      pc.addIceCandidate(new RTCIceCandidate(msg.ice));
    } else if (msg.sdp.type === "offer") {
      pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
        .then(() => pc.createAnswer())
        .then((answer) => {
          pc.setLocalDescription(answer);
          this.sendMessage(
            this.getSelectedId(),
            this.getTargetId(),
            JSON.stringify({
              sdp: pc.localDescription
            }));
        });
    } else if (msg.sdp.type == "answer") {
      pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
  }

  componentDidMount() {
    firebase.database().ref().on('child_added', this.readMessage.bind(this));

    const pc = new RTCPeerConnection(servers);
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendMessage(
          this.getSelectedId(),
          this.getTargetId(),
          JSON.stringify({
            ice: event.candidate
          }));
      } else {
        console.log('Send All Ice');
      }
    };

    // Start our video.
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
      .then((stream) => {
        if (this.ourVideo) {
          this.ourVideo.srcObject = stream;
          pc.addStream(stream);
        }
      });

    // Try to start their video
    const component = this;
    pc.onaddstream = (event) => {
      if (component.theirVideo) {
        component.theirVideo.srcObject = event.stream;
      }
    };

    this.setState({ pc });
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
      <div>
        <video
          autoplay={true}
          className="Call-video"
          muted={true}
          ref={(video) => this.ourVideo = video}
        />
        <video
          autoplay={true}
          className="Call-video"
          ref={(video) => this.theirVideo = video}
        />
        <button onClick={() => this.callFriend()}>Call</button>
      </div>
    );
  }
}

