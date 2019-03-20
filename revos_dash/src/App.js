import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';


class Header extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">revOS</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar defaultActiveKey="/home">
                <NavItem>
                  <NavLink href="/home" active={window.location.pathname === '/home'? true : false} >Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/map" active={window.location.pathname === '/map' ? true : false}>Map</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/stationTable" active={window.location.pathname === '/stationTable' ? true : false}>Station Table</NavLink>
                </NavItem>
              </Nav>

            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
      </div>
    );
  }
}

export default App;
