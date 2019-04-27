import React, { Component } from 'react';

export default class StatisticsModal extends Component {
  // constructor(props) {
  //   super(props);

  //   // this.state = {};
  // }

  render() {
    return (
      <div className="modal fade" id="statistics-modal" tabIndex="-1" role="dialog" aria-labelledby="statistics-modal-label" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="statistics-modal-label">&nbsp;</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><b>Rookie Year:</b> <span className="modal-rookie-year"></span></p>
              <p><b>Location:</b> <span className="modal-location"></span></p>
              <p><b>Event Record:</b> <span className="modal-event-status"></span></p>
              <p className="robot-images-title"><b>Robot Images:</b></p>
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}