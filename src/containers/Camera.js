import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../style/Camera.css";
import { useTheme } from "@material-ui/core/styles";



 

   
export default function Camera(){
const theme  = useTheme();
  const [imageStatus, setimageStatus] = useState("takeImage");
  const [image, setImage] = useState(null);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const [showImge, setshowImge] = useState(true);
  const canvasRef = React.useRef(null)
  const videoRef = React.useRef(null)


useEffect(()=>{
  console.log(videoRef.current);
  console.log(canvasRef.current);
  if(videoRef.current){
  navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream));

  }
  
})

  function DataURIToBlob(dataURI) {
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

  function takeImage(){
    canvasRef.current.width = videoRef.current.videoWidth;
    console.log( canvasRef.current.width);
    canvasRef.current.height = videoRef.current.videoHeight;
    const context = canvasRef.current.getContext("2d");
    context.save();
    context.scale(-1, 1);
    context.drawImage(
      videoRef.current,
      0,
      0,
      -videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );

    videoRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });
    const canvas =canvasRef.current;
    console.log(canvasRef.current);
    setImage(canvas.toDataURL());
    setimageStatus("imageTaken");

    
  }

  function uploadHandler() {
   setshowImge(false);
    var formData = new FormData();
    const file = DataURIToBlob(image);
    console.log(file);
    if (image !== null) {
      console.log("test");
      formData.append(
        "image",
        file,
        "img.png"
        //this.state.image.name
      );

     // document.getElementById("clear").style.visibility = "hidden";
     // document.getElementById("done").style.visibility = "hidden";

      axios
        .post("/api/image/", formData, {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded / progressEvent.total);
            setuploadPercentage(Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            ));
            
            if (
              Math.floor((progressEvent.loaded * 100) / progressEvent.total) >=
              100
            ) { setuploadPercentage(0);
             /*  setTimeout(() => {
               
              }, 1000); */
            }
          },
        })
        .then((res) => {
         // document.getElementById("clear").style.visibility = "visible";
          //document.getElementById("done").style.visibility = "visible";
          setImage(res.data);
          setimageStatus("receivedImage");
          setshowImge(true);
        
          console.log(res.data);
        });
    }
  }
   
    switch (imageStatus) {
      case "takeImage":
        return (
          <div style={{ position: "relative", height: "100%" }}>
            <video
              ref={
                videoRef
              }
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
                color: theme.palette.primary.main, //Welche Farbe????????
                fontSize: "100px",
                zIndex: "4",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "4%",
                height: "100px",
                width: "100px",
              }}
              onClick={()=>{takeImage()}}
            >
              lens
            </span>
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />
          </div>
        );

      case "imageTaken":
        return (
          <div style={{ position: "relative", height: "100%" }}>
            {showImge ? (
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: "0%",
                  objectFit: "cover",
                }}
              ></img>
            ) : null}
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
                    color: "#957fef",
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
                    color: "#957fef",
                  }}
                >{`${uploadPercentage}%`}</span>
              </div>
            )}
            <span
              id="clear"
              class="material-icons imageChoices"
              style={{
                color: "rgb(152 7 7)", //Welche Farbe????????
                left: "25%",
              }}
              onClick={(_) => {
                setimageStatus("takeImage");
                setshowImge(true);
              }}
            >
              clear
            </span>
            <span
              id="done"
              class="material-icons imageChoices"
              style={{
                color: "rgb(90 152 7)", //Welche Farbe????????
                left: "75%",
              }}
              onClick={()=>{uploadHandler()}}
            >
              done
            </span>
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />
          </div>
        );
      case "receivedImage":
        return (
          <div style={{ position: "relative", height: "100%" }}>
            {showImge ? (
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: "0%",
                  objectFit: "cover",
                }}
              ></img>
            ) : null}
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
                    color: "#957fef",
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
                    color: theme.palette.primary.main,
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
                setimageStatus("takeImage");
                setshowImge(true);
               
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
              onClick={(_) => {
                alert("MACHT NOCH NIX DU UNDANKBARES STÜCK!!");
              }}
            >
              file_download
            </span>
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />
          </div>
        );
    }
  
}


