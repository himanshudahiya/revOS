import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Table from './Table';
import { Spin } from 'antd';
import './config.js'
class Home extends Component{
  constructor(){
    super();
    this.state = {
      error: null,
      isLoaded: false,
      bikesData: []
    };
  }
  componentDidMount() {
    localStorage.clear();
      fetch(global.server+"getData", {
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
              isLoaded: true,
              bikesData: result.bike_details
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
              </div>);
          } else {
            return(
            <div class="container">
              <Table bikesData={this.state.bikesData}/>
            </div>
          );
        }
  }

}

export default Home;
