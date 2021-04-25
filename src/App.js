import logo from "./logo.svg";
import "./style/App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button, ProgressBar, Col, Form, Image, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Firebase from "firebase";
import firebaseConfig from "./config";

import Camera from "./containers/Camera";
import Settings from "./containers/Settings";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";

import Layout from "./hocs/Layout";

import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "./themes";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  //var theme = null;
  useEffect(() => {
    if (localStorage.getItem("theme") === "darkTheme") {
      //theme = darkTheme;
      setTheme(darkTheme);
    } else {
      //theme = lightTheme;
      setTheme(lightTheme);
    }
  });

  /*  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
      Firebase.initializeApp(firebaseConfig);
    } else {
      Firebase.app(); // if already initialized, use that one
    }
    this.state = {
      showIMG:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      postIMG: null,
      emotion: "keine Emotion",
      uploadPercentage: 0,
      newImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      image: null,
      supportsCamera: "mediaDevices" in navigator,
      enableCamera: true,
      theme: lightTheme,
    };
  } */

  /* changeImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  startChangeImage = () => {
    this.setState({ enableCamera: !this.state.enableCamera });
  };

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
            emotion: prevState.emotion,
            newImg: res.data,
          }));
        });
    }
  };

  componentDidMount() {} */

  /*   const Img = this.state.showIMG;
    const uploadPercentage = this.state.uploadPercentage;
    const newImg = this.state.newImg; */
  return (
    // <Container style={{ maxWidth: "100%" }}>
    /* {   <Row
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
              <ProgressBar
                style={{
                  width: "40%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
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
              Bild auswählen
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
              onClick={(e) => {
                e.target.value = "";
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
        <Row>
          <Col>
            <img
              src={this.state.image}
              alt="profile"
              style={{ height: 200, marginTop: 50 }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {this.state.enableCamera && (
              <div>
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
                  style={{ width: "100%", maxWidth: 300 }}
                ></video>

                <br />

                <button onClick={this.takeImage}>Take Image</button>

                <canvas
                  ref={(c) => (this._canvas = c)}
                  style={{ display: "none" }}
                />
              </div>
            )}

            <br />
            {this.state.supportsCamera && (
              <button onClick={this.startChangeImage}>Toggle Camera</button>
            )}
          </Col>
        </Row>} */
    <ThemeContext.Provider value={{ setTheme }}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Camera} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route
                  exact
                  path="/password/reset/confirm/:uid/:token"
                  component={ResetPasswordConfirm}
                />
                <Route
                  exact
                  path="/activate/:uid/:token"
                  component={Activate}
                />
              </Switch>
            </Layout>
          </Router>
        </Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
    // </Container>
  );
};

export default App;
