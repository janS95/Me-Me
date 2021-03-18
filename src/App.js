import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  state = {
    todos: [],
    showIMG:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    postIMG: null,
  };

  fileChangedHandler = (event) => {
    this.setState((prevState) => ({
      todos: prevState.todos,
      showIMG: prevState.showIMG,
      postIMG: event.target.files[0],
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
    if (this.state.postIMG !== null) {
      formData.append("myFile", this.state.postIMG, this.state.postIMG.name);
      axios.post("UNSERE DOMAIN", formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.loaded / progressEvent.total);
        },
      });
    }
  };

  componentDidMount() {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todos: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const Img = this.state.showIMG;
    return (
      <div>
        <div className="img-holder">
          <img src={Img} alt="" id="img" className="img" />
        </div>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          name="image-upload"
          id="input"
          onChange={(e) => {
            this.fileChangedHandler(e);
            this.imageHandler(e);
          }}
        />
        <button onClick={this.uploadHandler}>Hochladen oder so!</button>
        <div>
          {this.state.todos.map((item) => (
            <div key={item.id}>
              <h1>{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
