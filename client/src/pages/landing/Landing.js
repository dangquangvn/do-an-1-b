import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./landing.css";
import "../../styles/globalStyle.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Timekeeping & Management System</h1>
          <p className="lead">
            Attendance system using fingerprint scanning technology, door access
            system using Radio-frequency identification technology and a
            friendly modern management website suitable for start-up companies.
          </p>
          <div className="buttons">
            {/* <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link> */}
            <Link to="/login" className="btn btn-primary btn-login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// export default connect(mapStateToProps)(Landing);
export default Landing;
