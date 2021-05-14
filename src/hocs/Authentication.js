import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";

const Authentication = ({ checkAuthenticated, load_user }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (null);
};

export default connect(null, { checkAuthenticated, load_user })(Authentication);
