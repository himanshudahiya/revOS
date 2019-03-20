import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'antd/dist/antd.css';
import {Container, Row, Col} from 'react-bootstrap';
import {DatePicker } from 'antd';
import Moment from 'moment';
import { Button} from 'reactstrap';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import './config.js'
import { BrowserRouter, Route, NavLink, Router } from "react-router-dom";


export class InfoWindowEx extends Component {

  constructor(props) {
    super(props);
    this.infoWindowRef = React.createRef();
    this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
    if (!this.containerElement) {
      this.containerElement = document.createElement(`div`);
    }
  }

  onInfoWindowOpen() {
    ReactDOM.render(React.Children.only(this.props.children), this.containerElement);
    this.infoWindowRef.current.infowindow.setContent(this.containerElement);
  }
  render() {
    return <InfoWindow onOpen={this.onInfoWindowOpen} ref={this.infoWindowRef} {...this.props}/>
  }
}


class MapContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      center: {},
      zoom: 14,
      error: null,
      isLoaded: false,
      data: [],
      stationArray: [],
      visible: false,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      bikesCount: 0,
      startDate: 0,
      stopDate: 0,
      bikesArray: [],
    };
  }

   getBikesData(stationID, isAllData){

      var d = Moment(this.state.startDate);
      d = d.toDate();
      var startDateNew = d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      d = Moment(this.state.stopDate);
      d = d.toDate();
      var stopDateNew = d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


      var params = new URLSearchParams({
        'stationID': stationID,
        'startTime': startDateNew.toString(),
        'endTime': stopDateNew.toString(),
        'allData': isAllData
      });

      fetch(global.server+"getStationDetails", {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          'Content-Type':'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        body: params
      })
        .then(response => response.json())
        .then(
          (result) => {

              this.setState({
                bikesCount: result.count,
              });
              if(isAllData==true){
                const { detect } = require('detect-browser');
                const browser = detect();
                localStorage.clear();
                localStorage.setItem("stationID", stationID);
                localStorage.setItem("startDate", this.state.startDate);
                localStorage.setItem("stopDate", this.state.stopDate);
                localStorage.setItem("bikesData", JSON.stringify(result.bikes));
                if(browser.name=='safari'){
                  window.location.assign('/stationTable');
                }
                else{
                  var stationDetailsTable = window.open('/stationTable', '_blank');
                }
              }
            return "success";
          },
          (error) => {
            this.setState({
              error
            });
            return error;
          }
        );
      }



  onMarkerClick = (props, marker, e) => {

    this.getBikesData(props.id, false);
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }

  onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    }

    updateStartDate( date, dateString){
        this.setState({
          startDate: dateString
        });
    }
    updateStopDate( date, dateString){
        this.setState({
          stopDate: dateString
        });

    }

  componentDidMount() {
    localStorage.clear();
      fetch("http://127.0.0.1:3000/home/getStations", {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        mode: 'cors',
      })
        .then(response => response.json())
        .then(
          (result) => {
            this.setState({
              data: result.station,
              center: {
                lat: result.station[0]._id.startStationLatitude,
                lng: result.station[0]._id.startStationLongitude
              }
            });
            for(let i = 0; i < this.state.data.length; i++) {
              this.state.stationArray.push(
                <Marker
                  onClick={this.onMarkerClick}
                  name={this.state.data[i]._id.startStationName}
                  id={this.state.data[i]._id.startStationID}
                  position={{lat: this.state.data[i]._id.startStationLatitude, lng: this.state.data[i]._id.startStationLongitude}}
                  alldata="false"
                />
              );
            }
            this.setState({
              isLoaded: true,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  render(){
    const { error, isLoaded } = this.state;

      if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return(
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                height: '100vh'}}>
                <Spin />
                <h5>Loading...</h5>
              </div>);;
          } else {
            return (
              <div style={{ height: '100vh', width: '100%' }}>
                <Container style={{margin:20}}>
                  <Row className="justify-content-md-center">
                    <Col>
                      <Row className="justify-content-md-center">
                        <Col >
                          <DatePicker
                            showTime
                            placeholder="Start Date and Time"
                            selected={this.state.startDate}
                            onChange={this.updateStartDate.bind(this)}
                          />
                        </Col>
                      </Row>
                  </Col>
                  <Col >
                    <Row className="justify-content-md-center">
                      <Col >
                        <DatePicker
                          showTime
                          placeholder="End Date and Time"
                          selected={this.state.stopDate}
                          onChange={this.updateStopDate.bind(this)}
                        />
                      </Col>

                    </Row>
                  </Col>
                  </Row>

                </Container>
              <Map google={this.props.google}
                initialCenter={this.state.center}
                center={this.state.center}
                onClick={this.onMapClicked}
                zoom={this.state.zoom}
                >
                {this.state.stationArray}
                <InfoWindowEx
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}>
                    <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                      <p>Total Bikes: {this.state.bikesCount}</p>
                      {this.state.showingInfoWindow ? (
                        <div>
                          <p>Lat: {this.state.selectedPlace.position.lat}</p>
                          <p>Lng: {this.state.selectedPlace.position.lng}</p>
                        </div>
                      ) : <p />
                      }
                      <Button type="primary" id={this.state.selectedPlace._id} alldata="true" onClick={() =>this.getBikesData(this.state.selectedPlace.id, true)}>Show All Bikes</Button>
                    </div>
                </InfoWindowEx>

              </Map>
              </div>
            );
          }
        }

}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBGviren9F-mZK0ZNZmXmyx9RwlR7Ry-_o"
})(MapContainer)
