// This is the TODO page, where is rendering only the TODO component

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import image from "../../../public/background2.jpg";
import React, { useState, useEffect } from "react";

import {
  ListGroup, ListGroupItem, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
  Row, Form, FormGroup, Label, Input, Button,
} from "reactstrap";


const AdminView = () => {
  const { user } = useAuthContext();

  return (


    <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`, backgroundSize: 'cover', height: '100vh', }}>
      <Row style={{ paddingTop: "50px", justifyContent: "center", alignItems: "center" }}>
        <Col md={5} >
          <Card>
            <CardTitle>
              <h1 style={{ paddingLeft: "10px", paddingTop: "5px" }} >Admin</h1>
            </CardTitle>
            <CardBody>
              <a href="/addMedico" className="btn btn-primary">Crear Médico</a> 
              &nbsp; 
              &nbsp; 
              &nbsp; 
              <a href="/directory" className="btn btn-secondary">Ver Médicos</a>


            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default AdminView;