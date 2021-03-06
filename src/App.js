import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button, ProgressBar, Col, Form, Image, Row } from "react-bootstrap";
import Firebase from "firebase";
import firebaseConfig from "./config";




axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


class App extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(firebaseConfig);
    this.state = {
   
      showIMG:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      postIMG: null,
      emotion: "keine Emotion",
      uploadPercentage:0,
      newImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    };
  }

  fileChangedHandler = (event) => {
    console.log("fileChanged");
    this.setState((prevState) => ({

      showIMG: prevState.showIMG,
      postIMG: event.target.files[0],
      emotion: prevState.emotion,
      uploadPercentage: prevState.uploadPercentage,
    }));
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState((prevState) => ({
    
          showIMG: reader.result,
          postIMG: prevState.postIMG,
          emotion: prevState.emotion,
          uploadPercentage: prevState.uploadPercentage,
        }));
      }
    };
    try {
      reader.readAsDataURL(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  uploadHandler = () => {
    const formData = new FormData();
    console.log(this.state.postIMG);
    if (this.state.postIMG !== null) {
      formData.append("image", this.state.postIMG, this.state.postIMG.name);
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
          this.setState((prevState) => ({
    
            showIMG: prevState.showIMG,
            postIMG: prevState.postIMG,
            emotion:prevState.emotion,
            newImg: res.data
          }));
        });
    }
  };

  componentDidMount() {}

  render() {
    const Img = this.state.showIMG;
    const uploadPercentage=this.state.uploadPercentage;
    const newImg = this.state.newImg;
    return (
      <Container style={{ maxWidth: "100%" }}>
        <Row
          style={{
            backgroundColor: "#212529",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Col style={{ backgroundColor: "#212529" }}>ME&amp;ME</Col>
        </Row>
        <Row>
          <Col>
            <Image src={Img} rounded></Image>
          </Col>
        </Row>
        {uploadPercentage > 0 && (
          <Row>
            <Col>
              <ProgressBar style={{width:"40%", marginLeft:"auto",marginRight:"auto"}}
                now={uploadPercentage}
                label={`${uploadPercentage}%`}
                animated
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <label for="input" className="btn btn-primary">
              Bild ausw??hlen
            </label>
            <Form.File
              type="file"
              accept="image/*"
              capture="user"
              name="image-upload"
              id="input"
              onInput={(e) => {
                this.fileChangedHandler(e);
                this.imageHandler(e);
              }}
              onClick={(e)=>{
                e.target.value = '';
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.uploadHandler}>Hochladen oder so!</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={newImg} rounded></Image>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
