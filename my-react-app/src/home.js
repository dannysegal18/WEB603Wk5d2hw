import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import AppNavbar from "./navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Button className="m-5 nav bg-light">
            <Link to="/inventories/" className="nav-link">Manage Inventory List</Link>
          </Button>
        </Container>
      </div>
    );
  }
}

export default Home;