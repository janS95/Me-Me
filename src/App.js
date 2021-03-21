import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button, ButtonGroup, Col, Form, Image, Row } from "react-bootstrap";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      showIMG:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      postIMG: null,
      emotion: "keine Emotion",
    };
  }

  fileChangedHandler = (event) => {
    this.setState((prevState) => ({
      todos: prevState.todos,
      showIMG: prevState.showIMG,
      postIMG: event.target.files[0],
      emotion: prevState.emotion,
    }));
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState((prevState) => ({
          todos: prevState.todos,
          showIMG: reader.result,
          postIMG: prevState.postIMG,
          emotion: prevState.emotion,
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
          },
        })
        .then((res) => {
          console.log(res);
          this.setState((prevState) => ({
            todos: prevState.todos,
            showIMG: prevState.showIMG,
            postIMG: prevState.postIMG,
            emotion: res.data,
          }));
        });
    }
  };

  componentDidMount() {}

  render() {
    const Img = this.state.showIMG;
    return (
      <Container style={{maxWidth:"100%"}}>
        <Row style={{backgroundColor:"#212529", paddingTop:"20px",paddingBottom:"20px"}}><Col style={{backgroundColor:"#212529"}}>ME&amp;ME</Col></Row>
        <Row>
          <Col>
            <Image src={Img} rounded></Image>
          </Col>
        </Row>
      
        <Row >
          <Col >
          <label for="input" className="btn btn-primary">Bild auswählen</label>
            <Form.File
              type="file"
              accept="image/*"
              capture="user"
              name="image-upload"
              id="input"
              onChange={(e) => {
                this.fileChangedHandler(e);
                this.imageHandler(e);
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
          <Col>{this.state.emotion}</Col>
        </Row>
      </Container>
    );
  }
}
export default App;
