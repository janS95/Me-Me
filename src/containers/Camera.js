import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../style/Camera.css";

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCameraActive: true,
      image: null,
      uploadPercentage: 0,
    };
  }
  DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  takeImage = () => {
    this._canvas.width = this._video.videoWidth;
    this._canvas.height = this._video.videoHeight;
    const context = this._canvas.getContext("2d");
    context.save();
    context.scale(-1, 1);
    context.drawImage(
      this._video,
      0,
      0,
      -this._video.videoWidth,
      this._video.videoHeight
    );

    this._video.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    this.setState({
      image: this._canvas.toDataURL(),
      isCameraActive: false,
    });
  };

  uploadHandler = () => {
    var formData = new FormData();
    const file = this.DataURIToBlob(this.state.image);
    console.log(file);
    if (this.state.image !== null) {
      console.log("test");
      formData.append(
        "image",
        file,
        "img.png"
        //this.state.image.name
      );
      

      axios
        .post("/api/image/", formData, {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded / progressEvent.total);
             this.setState({
              uploadPercentage: Math.floor(
                (progressEvent.loaded * 100) / progressEvent.total
              ),
            }); 
            if (
              Math.floor((progressEvent.loaded * 100) / progressEvent.total) >=
              100
            ) {
              setTimeout(() => {
                this.setState({ uploadPercentage: 0 });
              }, 1000);
            }
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  render() {
    var uploadPercentage = this.state.uploadPercentage;
    if (this.state.isCameraActive) {
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
              transform: "rotateY(180deg)",
              width: "100%",
              height: "100%",
              marginTop: "0%",
              objectFit: "cover",
            }}
          ></video>

          <span
            class="material-icons"
            style={{
              color: "#DDDDDD", //Welche Farbe????????
              fontSize: "100px",
              zIndex: "4",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "4%",
              height: "100px",
              width: "100px",
            }}
            onClick={this.takeImage}
          >
            lens
          </span>
          <canvas ref={(c) => (this._canvas = c)} style={{ display: "none" }} />
        </div>
      );
    } else {
      return (
        <div style={{ position: "relative", height: "100%" }}>
          <img
            src={this.state.image}
            style={{
              width: "100%",
              height: "100%",
              marginTop: "0%",
              objectFit: "cover",
            }}
          ></img>
          {uploadPercentage > 0 && (
            <div
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
              width="5rem"
              height="5rem"
            >
              <CircularProgress
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "5rem",
                  height: "5rem",
                  transform: "translate(-50%,-50%)",
                }}
                variant="determinate"
                value={uploadPercentage}
              />

              <span
                style={{
                  position: "absolute",
                  width: "5rem",
                  height: "5rem",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >{`${uploadPercentage}%`}</span>
            </div>
          )}
          <span
            class="material-icons imageChoices"
            style={{
              color: "rgb(152 7 7)", //Welche Farbe????????
              left: "25%",
            }}
            onClick={(_) => {
              this.setState({ isCameraActive: true });
            }}
          >
            clear
          </span>
          <span
            class="material-icons imageChoices"
            style={{
              color: "rgb(90 152 7)", //Welche Farbe????????
              left: "75%",
            }}
            onClick={this.uploadHandler}
          >
            done
          </span>
          <canvas ref={(c) => (this._canvas = c)} style={{ display: "none" }} />
        </div>
      );
    }
  }
}

export default Camera;
