import React, { Component } from 'react';
// import Cache from '../storage/Cache';
// import AppState from '../state/AppState';
// import api from '../storage/api';

export default class StatisticsModal extends Component {
  // constructor(props) {
    // super(props);

    // this.state = {
    //   teamKey: this.props.teamKey,
    //   eventKey: this.props.eventKey,
    //   teamNickname: null,
    //   rookieYear: null,
    //   location: null,
    //   eventRecord: null,
    //   shown: false,
    //   validProps: this.props.teamKey !== null && this.props.eventKey !== null
    // };

    // this.showModal();

    // this.hideModal = this.hideModal.bind(this);
  // }

  // componentDidUpdate(prevProps) {
  //   var newModal = false;
  //   if (prevProps.teamKey !== this.props.teamKey) {
  //     this.setState({ teamKey: this.props.teamKey, validProps: this.props.teamKey !== null && this.props.eventKey !== null });
  //     newModal = true;
  //   }

  //   if (prevProps.eventKey !== this.props.eventKey) {
  //     this.setState({ eventKey: this.props.eventKey, validProps: this.props.teamKey !== null && this.props.eventKey !== null });
  //     newModal = true;
  //   }

  //   if (newModal) {
  //     this.showModal();
  //   }
  // }

  // async showModal() {
  //   if (this.state.validProps) {
  //     await this.populateStateFromTBA();
  //     alert("Showing Modal For " + this.props.teamKey + " @ " + this.props.eventKey);
  //     this.setState({ shown: true });
  //     document.body.classList.add("modal-open");
  //     var backdrop = document.createElement("div");
  //     backdrop.id = "modal-backdrop";
  //     backdrop.classList.add("modal-backdrop", "fade", "show");
  //     document.body.appendChild(backdrop);
  //   }
  // }

  // hideModal() {
  //   this.setState({ shown: false });
  //   document.body.classList.remove("modal-open");
  //   document.body.removeChild(document.getElementById("modal-backdrop"));
  // }

  // async populateStateFromTBA() {
  //   await api.pullStatisticsFromTBA(this.state.teamKey);
  //   var cache = Cache.getInstance().get();
  //   var event = AppState.getInstance().getEvent();
  
  //   if (cache.events == null || cache.events[event] == null || cache.events[event].teams == null || cache.events[event].teams[this.state.teamKey] == null) {
  //     return;
  //   }
  //   console.log("b")

  //   this.setState({
  //     teamNickname: cache.events[event].teams[this.state.teamKey].name,
  //     rookieYear: cache.events[event].teams[this.state.teamKey].rookie_year,
  //     location: cache.events[event].teams[this.state.teamKey].location,
  //     eventRecord: cache.events[event].teams[this.state.teamKey].status
  //   });
  // }

  render() {
    // if (!this.state.validProps) {
    //   return (<div></div>);
    // }

    return (
      <div className={`modal fade`} id="statistics-modal" tabIndex="-1" role="dialog" aria-labelledby="statistics-modal-label" aria-hidden={false}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">&nbsp;</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" /*onClick={this.hideModal}*/>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div><b>Rookie Year:</b><p className="modal-rookie-year"></p></div>
              <div><b>Location:</b><p className="modal-location"></p></div>
              <div><b>Event Record:</b><p className="modal-event-status"></p></div>
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