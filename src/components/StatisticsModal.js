import React, { Component } from 'react';

export default class StatisticsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamKey: this.props.teamKey,
      eventKey: this.props.eventKey,
      teamNickname: null,
      rookieYear: null,
      location: null,
      eventRecord: null,
      shown: false,
      validProps: this.props.teamKey !== null && this.props.eventKey !== null
    };

    this.populateStateFromTBA();
    this.showModal();

    this.hideModal = this.hideModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    var newModal = false;
    if (prevProps.teamKey !== this.props.teamKey) {
      this.setState({ teamKey: this.props.teamKey, validProps: this.props.teamKey !== null && this.props.eventKey !== null });
      newModal = true;
    }

    if (prevProps.eventKey !== this.props.eventKey) {
      this.setState({ eventKey: this.props.eventKey, validProps: this.props.teamKey !== null && this.props.eventKey !== null });
      newModal = true;
    }

    if (newModal) {
      this.populateStateFromTBA();
      this.showModal();
    }
  }

  showModal() {
    if (this.state.validProps) {
      alert("Showing Modal For " + this.props.teamKey + " @ " + this.props.eventKey);
      this.setState({ shown: true });
      document.body.classList.add("modal-open");
      var backdrop = document.createElement("div");
      backdrop.id = "modal-backdrop";
      backdrop.classList.add("modal-backdrop", "fade", "show");
      document.body.appendChild(backdrop);
    }
  }

  hideModal() {
    this.setState({ shown: false });
    document.body.classList.remove("modal-open");
    document.body.removeChild(document.getElementById("modal-backdrop"));
  }

  populateStateFromTBA() {

  }

  render() {
    if (!this.state.validProps) {
      return (<div></div>);
    }

    return (
      <div className={`modal fade ${this.state.shown ? "show" : ""}`} id="statistics-modal" tabIndex="-1" role="dialog" aria-labelledby="statistics-modal-label" aria-hidden={!this.state.shown} style={{display: (this.state.shown ? "block" : "none")}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{"Team " + this.props.teamKey.substring(3) + ": " + this.state.teamNickname}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={this.hideModal}>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p><b>Rookie Year:</b> {this.state.rookieYear}</p>
              <p><b>Location:</b> {this.state.location}</p>
              <p><b>Event Record:</b> {this.state.eventRecord}</p>
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