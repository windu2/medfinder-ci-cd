// This is the TODO page, where is rendering only the TODO component
import image from "../../../public/background2.jpg";
import React, { useState, useEffect } from "react";
import {  useAuthContext } from "../../context/useAuthContext";

import {
  ListGroup, ListGroupItem, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
  Row, Form, FormGroup, Label, Input, Button, Modal,ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

//import { Template } from 'primereact/template';

import { Column } from 'primereact/column';





var id_global;
const InfoView = ({isMounted}) => {
  const [data, setData] = useState([]);


  function formatterRut(e) {
    var rut = e.target.value;
    var actual = rut.toString().replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
      var sinPuntos = actual.replace(/\./g, "");
      var actualLimpio = sinPuntos.replace(/-/g, "");
      var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      var rutPuntos = "";
      var i = 0;
      var j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        var letra = !/^([0-9])*$/.test(inicio.charAt(i)) ? '' : inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rutPuntos = "." + rutPuntos;
        }
        j++;
      }
      var dv = actualLimpio.substring(actualLimpio.length - 1);
      rutPuntos = rutPuntos + "-" + dv;
      e.target.value = rutPuntos;
          //console.log("??")
        }

      }
      function cleanRut(rut,withoutDv = false){
        var sinPuntos = rut.toString().replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        return withoutDv ? actualLimpio : actualLimpio.substring(0, actualLimpio.length - 1);
      }

      function validateRut(rut){
        if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut.toString())) {
          return false;
        }
        rut = cleanRut(rut,true);
        var t = parseInt(rut.slice(0, -1), 10);
        var m = 0;
        var s = 1;
        while (t > 0) {
          s = (s + (t % 10) * (9 - m++ % 6)) % 11;
          t = Math.floor(t / 10);
        }
        var v = s > 0 ? '' + (s - 1) : 'K';
        return v === rut.slice(-1);
      }

      const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      });

      

      useEffect(() => {
        async function fetchData() {
          const response = await fetch("http://127.0.0.1:8000/api/medicos/get/");
          const json = await response.json();
          setData(json);
          euconfio();
        }

        fetchData();
      }, []);





      const { user} = useAuthContext();
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
  function redirectToPage() {
  var valor = "Hola mundo"; // el valor que deseas pasar a la página de destino
  var url = "https://ejemplo.com/pagina-de-destino?valor=" + encodeURIComponent(valor); // establece la URL de destino y agrega el valor como parámetro de consulta
  
  window.location.href = url; // redirige a la página de destino
}


const rutTemplate = (rowData) => {
  if((user)){
    return  (
      <>
      <Button value={rowData.id} color="danger" onClick={e => eliminar(e)}>Eliminar</Button>
      &nbsp;
      <a href={"/EditMedico/"+rowData.id} className="btn btn-primary">Editar</a>
      
      
      &nbsp;
      <a value={rowData.id} href={"medico/"+rowData.id} className="btn btn-secondary" >Información</a>

      </>


      );
  }
  return  (
    <a value={rowData.id} href={"medico/"+rowData.id} className="btn btn-secondary" >Información</a>
    
    
    );

  
  
}






async function eliminar (e)  {
  var confirmacion = confirm("¿Estás seguro de que deseas eliminar este elemento?");

  // Si el usuario hace clic en "Aceptar", eliminar el elemento
  if (confirmacion) {
    // Código para eliminar el elemento
    console.log(e);
    const response = await fetch('http://127.0.0.1:8000/api/medicos/delete/' + e.target.value+"/", { method: 'DELETE' })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    window.location.reload();
  }


  // Si el usuario hace clic en "Cancelar", no hacer nada
  else {
    console.log("La eliminación del elemento ha sido cancelada.");
  }


}





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
  <a href="/addMedico" className="btn btn-primary">Agregar Médico</a>
  <br />
  <br />
  </Col>
  <DataTable value={data} dataKey="id" showGridlines scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} scrollHeight="400px" filters={filters}
  emptyMessage="Médicos no encontrados">
  <Column field="apellido_P" header="Apellido Paterno"></Column>
  <Column field="apellido_M" header="Apellido Materno"></Column>
  <Column field="nombre" header="Nombres"></Column>
  <Column field="especialidad" header="Especialidad"></Column>
  <Column header="Acción" body={rutTemplate}></Column>

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