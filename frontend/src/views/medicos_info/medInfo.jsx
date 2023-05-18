// This is the TODO page, where is rendering only the TODO component
import image from "/background2.jpg";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card, CardBody, CardTitle, Row } from "reactstrap";

const MedInfoView = () => {
  const params = useParams();

  function renderDataTable(esp) {
    //filter the data from the table
    console.log(esp);
    return;
  }

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  var i = 0;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/medicos/get/");
      const json = await response.json();
      setData(json);
      setIsLoaded(true);
    }

    fetchData();
  }, []);
  for (let j = 0; j < data.length; j++) {
    console.log(j);
    if (data[j].id == parseInt(params.id)) {
      console.log(data[j]);
      i = j;
      break;
    }
  }

  if (!isLoaded) {
    return <div>Cargando...</div>;
  } else {
    // Your existing code that depends on the data
    for (let j = 0; j < data.length; j++) {
      console.log(j);
      if (data[j].id == parseInt(params.id)) {
        console.log(data[j]);
        i = j;
        break;
      }
    }

    return (
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <Row
            style={{
              paddingTop: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col md={5}>
              <Card>
                <CardTitle>
                  <h1 style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                    Médico
                  </h1>
                </CardTitle>
                <CardBody>
                  <p>
                    {"Nombre: " +
                      data[i].nombre +
                      " " +
                      data[i].apellido_P +
                      " " +
                      data[i].apellido_M}
                  </p>
                  <p>{"Rut: " + data[i].rut}</p>
                  <p>{"Edad: " + data[i].edad}</p>
                  <p>{"Edpecialidad: " + data[i].especialidad} </p>
                  <p>
                    {"Ubicación: "}
                    <a href={data[i].ubicacion} target="blank">
                      {" "}
                      {data[i].ubicacion}
                    </a>
                  </p>
                  <p>
                    {"Credencial: "}
                    <a href={data[i].credencial} target="blank">
                      {" "}
                      {data[i].credencial}
                    </a>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

export default MedInfoView;
