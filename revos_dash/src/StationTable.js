import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Table';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import {Container, Row, Col} from 'react-bootstrap';
import {DatePicker } from 'antd';
import Moment from 'moment';
import './config.js'

class StationTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      stationID: 0,
      startDate: 0,
      stopDate: 0,
      bikesData: [],
    };
  }

  getBikesData(){

   var d = Moment(this.state.startDate);
   d = d.toDate();
   var startDateNew = d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
   d = Moment(this.state.stopDate);
   d = d.toDate();
   var stopDateNew = d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


   var params = new URLSearchParams({
     'stationID': this.state.stationID,
     'startTime': startDateNew.toString(),
     'endTime': stopDateNew.toString(),
     'allData': true
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
           localStorage.removeItem("bikesData");
           this.setState({
             bikesCount: result.count,
             bikesData: result.bikes
           });
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
  updateStationID = (e)=>{
    console.log(e.target.value);
    this.setState({
      stationID: e.target.value,
    });
  }

  componentDidMount(){
    this.setState({
      stationID: localStorage.getItem("stationID"),
      startDate: localStorage.getItem("startDate"),
      stopDate: localStorage.getItem("stopDate")

    });
  }


  render() {
    const bikesData = localStorage.getItem("bikesData");

      return(
        <div style={{ height: '100vh', width: '100%' }}>
          <Container style={{margin:20}}>
            <Row className="justify-content-md-center">
              <Col>
                <Input placeholder="Station ID" value={this.state.stationID} onChange={this.updateStationID} />
              </Col>
              <Col>
                <Row className="justify-content-md-center">
                  <Col >
                    <DatePicker
                      showTime
                      value={Moment(this.state.startDate)}
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
                    value={Moment(this.state.stopDate)}
                    placeholder="End Date and Time"
                    selected={this.state.stopDate}
                    onChange={this.updateStopDate.bind(this)}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="primary" onClick={()=>this.getBikesData()}>Save</Button>
            </Col>
            </Row>
          </Container>
          <Table bikesData={bikesData==null? (this.state.bikesData) : JSON.parse(localStorage.getItem("bikesData"))}/>
        </div>
      );

  }
}

export default StationTable;
