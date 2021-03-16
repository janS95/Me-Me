import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
const axios = require("axios");

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class App extends Component {
  state = {
    todos: []
  };


componentDidMount(){
  axios.get("/api/todos/")
  .then(res=> this.setState({ todos: res.data}))
  .catch(err=>console.log(err));
};

render() {
  return (
    <div>
      {this.state.todos.map(item=>(
        <div key={item.id}>
          <h1>{item.title}</h1>
          </div>
      ))}
    </div>
  );
}
}
export default App;
