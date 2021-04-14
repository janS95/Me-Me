import React, { Component } from "react";
class NavbarTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{position:"relative" ,fontFamily: "'Courgette', cursive", height: "100%"}}>
        <div style={{position:"absolute",float:"left",width:"47%",top:"50%",left:"3%",transform:"translate(0, -50%)",color: "#957FEF",fontSize:"1.35rem"}}>Me-Me</div>
        <div style={{position:"absolute", width:"47%",float:"left",top:"50%", right:"3%",transform:"translate(0, -50%)",  textAlign:"right"}}>
          <span style={{fontSize:"2rem",verticalAlign:"middle",color: "#957FEF"}} class="material-icons">send</span>
        </div>
      </div>
    );
  }
}
export default NavbarTop;
