import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import ReactTable from "react-table";
import 'react-table/react-table.css'



class Table extends Component{


  render(){
    const columns = [
      {
        Header: 'Trip Duration',
        accessor: 'tripduration' // String-based value accessors!
      }, {
        Header: 'Start Time',
        accessor: 'starttime',
      }, {
        Header: 'Stop Time',
        accessor: 'stoptime' // Custom value accessors!
      },
      {
        Header: 'Start Station ID',
        accessor: 'startStationID' // Custom value accessors!
      },{
        Header: 'Start Station Name',
        accessor: 'startStationName' // Custom value accessors!
      },{
        Header: 'Start Station Latitude',
        accessor: 'startStationLatitude' // Custom value accessors!
      },{
        Header: 'Start Station Longitute',
        accessor: 'startStationLongitude' // Custom value accessors!
      },{
        Header: 'End Station ID',
        accessor: 'endStationID' // Custom value accessors!
      },{
        Header: 'End Station Name',
        accessor: 'endStationName' // Custom value accessors!
      },{
        Header: 'End Station Latitude',
        accessor: 'endStationLatitude' // Custom value accessors!
      },{
        Header: 'End Station Longitude',
        accessor: 'endStationLongitude' // Custom value accessors!
      },{
        Header: 'Bike ID',
        accessor: 'bikeID' // Custom value accessors!
      },{
        Header: 'User Type',
        accessor: 'userType' // Custom value accessors!
      },{
        Header: 'Birth Year',
        accessor: 'birthYear' // Custom value accessors!
      },{
        Header: 'Gender',
        accessor: 'gender' // Custom value accessors!
      }, ]


      return (
        <ReactTable
          data={this.props.bikesData}
          columns={columns}
        />
      );
  }
}

export default Table;
