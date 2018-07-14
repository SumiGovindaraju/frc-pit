import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Header extends Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.displayName) {
        var li = document.createElement("li"); 
        li.classList.add("nav-item");

        var a = document.createElement("a");
        a.classList.add("nav-link");
        a.classList.add("sign-out");
        a.innerHTML = "Sign out " + user.displayName;
        a.href = process.env.PUBLIC_URL + "/sign_out";

        li.appendChild(a);
        document.getElementsByClassName("sign-out-ul")[0].appendChild(li);
      }
    });
  }

  componentWillMount () { // create script tags
    var script = document.createElement("script");
    var scriptBody = document.createTextNode(`
      $(document).ready(function () {
        $('.set-team-number-and-event-btn').click(function () {
          setTeamNumberAndEvent();
        });
      });
    `);
    script.appendChild(scriptBody);
    document.body.appendChild(script);
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href={process.env.PUBLIC_URL}>FRC Pit</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL}><i className="fa fa-home" aria-hidden="true"></i> Home</a></li>
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL + "/tools_list"}><i className="fa fa-wrench" aria-hidden="true"></i> Tools List</a></li>
              <li className="nav-item"><a className="nav-link" href={process.env.PUBLIC_URL + "/check_out_tool"}><i className="fa fa-plus" aria-hidden="true"></i> Check Out Tool</a></li>
              <li className="nav-item dropdown settings" style={{display: "none"}}>
                <a className="nav-link dropdown-toggle" href={process.env.PUBLIC_URL} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-cog" aria-hidden="true"></i> Settings
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <form>
                    <input className="form-control" placeholder="Team Number" type="number" />
                    <select className="form-control"></select>
                    <div className="btn btn-success set-team-number-and-event-btn">Go!</div>
                  </form>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto sign-out-ul"></ul>
          </div>
        </nav>
      </header>
    );
  }
}