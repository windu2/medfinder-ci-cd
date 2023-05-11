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

  function euconfio(){



    var log = document.getElementById('rut');
        // code to run after render goes here
        document.getElementById('addform').addEventListener('submit', (event) => {
            // handle the form data
            event.preventDefault();
            if (!validateRut(log.value)) {
              console.log("Te pillamos ps compadre");

              return;
            }
            console.log("valido");
            handleConfirm();
          });
        



      }


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




      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      const [formData, setFormData] = useState({
        RUT: '',
        apellido_Paterno: '',
        apellido_Materno: '',
        nombre: '',
        EDAD: '',
        Especialidad: '',
        Ubicacion: '',
        email: ''
      });


      const [modal, setModal] = useState(false);

      const toggle = (e) =>{
        if(e.target.value){
          id_global = e.target.value;
          var elemento = data.find(objeto => objeto.id === parseInt(id_global));
          setFormData({
            RUT: elemento.rut,
            apellido_Paterno: elemento .apellido_P,
            apellido_Materno: elemento .apellido_M,
            nombre: elemento .nombre,
            EDAD: elemento .edad,
            Especialidad: elemento .especialidad,
            Ubicacion: elemento .ubicacion,
            Credencial: elemento .credencial
          });
        }


        console.log("el id_global es:" +id_global)
        setModal(!modal);
      }
      async function updateData() {
        const response = await fetch("http://127.0.0.1:8000/api/medicos/put/"+id_global+"/", { method: 'PUT' }, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: newdatosJSON
        });
        const json = await response.json();
    //window.location.reload();
  }
  function handleConfirm() {
    console.log("id glogal: "+id_global)
    var newapellido_P = document.getElementById("apellidoP");
    var newapellido_M = document.getElementById("apellidoM");
    var newnombres = document.getElementById("Nombres");
    var newespecialidad = document.getElementById("especialidad");
    var newrut = document.getElementById("rut");
    var newedad = document.getElementById("edad");
    var newubicacion = document.getElementById("ubicacion");
    var newcredencial = document.getElementById("credencial");



    var newdatos = {
      "rut": ""+newrut.value,
      "nombre": ""+newnombres.value,
      "apellido_P": ""+newapellido_P.value,
      "apellido_M": ""+newapellido_M.value,
      "edad": parseInt(""+newedad.value),
      "especialidad": ""+newespecialidad.value,
      "profesion" : "Médico Cirujano",
      "ubicacion": ""+newubicacion.value,
      "credencial": ""+newcredencial.value
    };



  // Convertir el objeto JSON a una cadena JSON
  var newdatosJSON = JSON.stringify(newdatos);
  console.log(newdatosJSON);


  // Redirigir a la función para enviar la consulta SQL con el nuevo valor
  
  updateData();


  //toggle();
};



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
  

  const rutTemplate = (rowData) => {
    if((user)){
      return  (
        <>
        <Button value={rowData.id} color="danger" onClick={e => eliminar(e)}>Eliminar</Button>
        &nbsp;
        <Button value={rowData.id} color="info" onClick={e => toggle(e)}>Editar</Button>
        
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
    //window.location.reload();
  }


  // Si el usuario hace clic en "Cancelar", no hacer nada
  else {
    console.log("La eliminación del elemento ha sido cancelada.");
  }


}





return (
  <div>
  <div>
  
  <Modal isOpen={modal} toggle={toggle} >
  <ModalHeader toggle={toggle}>Modal title</ModalHeader>
  
  <ModalBody>
  <form id='addform'>
  <FormGroup>
  <Label for="exampleEmail">Rut</Label>
  <Input type="text, number" input-mode="numeric" onInput={e=>formatterRut(e)} name="RUT" id="rut" placeholder="Escriba el nuevo Rut"value={formData.RUT} maxlength={12} onChange={handleInputChange} /> 
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Apellido Paterno</Label>
  <Input type="text" name="apellido_Paterno" id="apellidoP" placeholder="Escriba el nuevo Apellido Paterno" maxLength={50} pattern="^[a-zA-Z][a-zA-Z ]{1,49}" value={formData.apellido_Paterno} onChange={handleInputChange}/>
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Apellido Materno</Label>
  <Input type="text" name="apellido_Materno" id="apellidoM" placeholder="Escriba el nuevo Apellido Materno" maxLength={50} pattern="^[a-zA-Z][a-zA-Z ]{1,49}"  value={formData.apellido_Materno} onChange={handleInputChange} />
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Nombres</Label>
  <Input type="text" name="nombre" id="Nombres" placeholder="Escriba los nuevos Nombres" pattern="^[a-zA-Z][a-zA-Z ]{1,49}" maxLength={50} value={formData.nombre} onChange={handleInputChange}/>
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Edad</Label>
  <Input type="number" name="EDAD" id="edad" placeholder="Escriba la nueva edad" value={formData.EDAD} min="1" max="99" maxLength={2} onChange={handleInputChange}/>
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Especialidad</Label>
  <Input type="text" name="Especialidad" id="especialidad" placeholder="Escriba la nueva Especialidad " value={formData.Especialidad} pattern="^[a-zA-Z][a-zA-Z ]{1,49}" maxLength={50} onChange={handleInputChange}/>
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Ubicación</Label>
  <Input type="url" name="Ubicacion" id="ubicacion" placeholder="Ingrese el link de la Ubicación" value={formData.Ubicacion} maxLength={100} onChange={handleInputChange}/>
  </FormGroup>
  <FormGroup>
  <Label for="exampleEmail">Credencial</Label>
  <Input type="url" name="Credencial" id="credencial" placeholder="Ingrese el link con la Credencial" value={formData.Credencial} maxLength={100} onChange={handleInputChange}/>
  </FormGroup>
  <Button type="submit" color="primary" id="submit" >
  Confirmar
  </Button>{' '}
  </form>
  </ModalBody>
  
  <ModalFooter>
  
  <Button color="secondary" onClick={toggle}>
  Cancel
  </Button>
  
  </ModalFooter>


  </Modal>
  
  
  </div>



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