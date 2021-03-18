import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  state = {
    todos: [],
    selectedFile: null

  };

    fileChangedHandler = event => {
      this.setState(prevState=>({todos:prevState.todos, selectedFile: event.target.files[0] }))
    }

    uploadHandler = () => {
      const formData = new FormData()
      formData.append(
        'myFile',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
      axios.post('UNSERE DOMAIN', formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      })
    }
  
  componentDidMount() {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todos: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.fileChangedHandler}></input>
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
