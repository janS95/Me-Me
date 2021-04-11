import React, { Component } from "react";
import { Link } from "react-router-dom";

class Camera extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <video
          ref={(c) => {
            this._video = c;
            if (this._video) {
              navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => (this._video.srcObject = stream));
            }
          }}
          controls={false}
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            marginTop: "0%",
            objectFit: "cover",
          }}
        ></video>

        <button
          style={{
            zIndex: "4",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "2%",
            borderRadius: "50%",
            height: "75px",
            width: "75px"
          }}
          onClick={this.takeImage}
        >
        </button>

        <canvas ref={(c) => (this._canvas = c)} style={{ display: "none" }} />
      </div>
    );
  }
}

export default Camera;
