import React, { Component } from 'react';

export default class PageNotFound extends Component {
  componentWillMount() { // create script tags
    var script = document.createElement("script");
    var scriptBody = document.createTextNode(`
      $(document).ready(function () {
        $(".settings").hide();
      });
    `);
    script.appendChild(scriptBody);
    document.body.appendChild(script);
  }
  
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "1%" }}>404 Page Not Found:</h1>
        <h3 style={{ textAlign: "center", marginTop: "1%" }}>This Page Does Not Exist</h3>
      </div>
    );
  }
}