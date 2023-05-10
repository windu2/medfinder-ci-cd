// This is the TODO page, where is rendering only the TODO component
import image from "../../../public/background2.jpg";
import React, { useState, useEffect } from "react";

import {
  ListGroup, ListGroupItem, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
  Row, Form, FormGroup, Label, Input, Button,
} from "reactstrap";

import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

//import { Template } from 'primereact/template';

import { Column } from 'primereact/column';





const InfoView = () => {

  function renderDataTable(e) {
    //filter the data from the table
    var search = document.getElementById("search");
    search.value = "";
    setFilters({
      global: { value: e.target.text, matchMode: FilterMatchMode.CONTAINS },
    });
    search.value = e.target.text;
    console.log(e.target.text);
    return;
  }

  function handleRowClick(rut) {
    console.log("Row ID:", rut);
    // handle the click event here
  }
  

  const rutTemplate = (rowData) => {
    return  (
      <a value={rowData.id} href={"medico/"+rowData.id} className="btn btn-secondary" >Información</a>
    );
    
}



  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/medicos/get/");
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`, backgroundSize: 'cover', height: '100vh', }}>
        <Row style={{ paddingTop: "5px" }}>
          <Col md={4}>
            <Card>
              <CardTitle>
                <h1 style={{ paddingLeft: "10px", paddingTop: "5px" }} >Especialidad</h1>
              </CardTitle>
              <CardBody>
                <ListGroup>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Odontólogo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Cardiólogo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Ginecólogo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Nutricionista</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Medicina Gral.</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Inmunología</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Cirujano</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Neurólogo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Fonoaudiologo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Enndocrinólogo</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Neurocirujano</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Cirujano Maxilofacial</ListGroupItem>
                  <ListGroupItem tag="a" href="#" onClick={e => renderDataTable(e)}>Pediatra</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>

          </Col>

          <Col>
            <Row>
              <Card style={{ paddingLeft: "5px", paddingTop: "5px" }}>
                <Col md={3}>
                  <h1 >Médicos</h1>
                  <div className="text-end">
                    <Input id="search" name="especialidad" placeholder="Buscar"
                      onInput={(e) =>
                        setFilters({
                          global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                        })
                      }
                    />
                  </div>

                  <br />
                </Col>
                <DataTable value={data} dataKey="id" showGridlines scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollHeight="400px" filters={filters}
                  emptyMessage="Médicos no encontrados">
                  <Column field="apellido_P" header="Apellido Paterno"></Column>
                  <Column field="apellido_M" header="Apellido Materno"></Column>
                  <Column field="nombre" header="Nombres"></Column>
                  <Column field="especialidad" header="Especialidad"></Column>
                  <Column header="Action" body={rutTemplate}></Column>
                </DataTable>

              </Card>
            </Row>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default InfoView;