import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'reactstrap';
import image from "../../../public/background2.jpg";
import {
    ListGroup, ListGroupItem, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Row, FormGroup, Label, Input,
} from "reactstrap";

const AddMedicoView = (e) => {

    useEffect(() => {

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
            AddMedicInfo();
            //console.log("pasé");
        });
        


    }, []);


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



    const [rut, setRut] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido_P, setApellido_P] = useState("")
    const [apellido_M, setApellido_M] = useState("")
    const [edad, setEdad] = useState(0)
    const [especialidad, setEspecialidad] = useState("")
    //const[profesion, setProfesion] = useState("")
    const [ubicacion, setUbicacion] = useState("")
    const [credencial, setCredencial] = useState("")




    const AddMedicInfo = async () => {
        let formField = new FormData()

        formField.append('rut', rut)
        formField.append('nombre', nombre)
        formField.append('apellido_P', apellido_P)
        formField.append('apellido_M', apellido_M)
        formField.append('edad', edad)
        formField.append('especialidad', especialidad)
        formField.append('profesion', "profesion")
        formField.append('ubicacion', ubicacion)
        formField.append('credencial', credencial)

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/medicos/post/',
            data: formField
        }).then((response) => {
            console.log(response.data)
        })
    }

    return (
        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`, backgroundSize: 'cover', height: '100vh', }}>



            <div className="container" style={{ justifyContent: "center", alignItems: "center" }}  >

                <Row>
                    <Col md={6}>
                        <Card style={{ padding: "20px" }}>
                            <h1>Crear Médico</h1>
                            <form id='addform'>
                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="text, number" input-mode="numeric"
                                        maxlength={12}
                                        className="form-control form-control-lg"
                                        id='rut'
                                        onInput={e => formatterRut(e)}
                                        required
                                        placeholder="12.345.678-9"
                                        //pattern="\d{7,10}"
                                        name="rut"
                                        value={rut}
                                        onChange={(e) => setRut(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Nombre médico"
                                        maxLength={50}
                                        pattern="[a-Z]{0,50}"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Apellido Paterno"
                                        maxLength={50}
                                        pattern="[a-Z]{0,50}"
                                        name="apellido_P"
                                        value={apellido_P}
                                        onChange={(e) => setApellido_P(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Apellido Materno"
                                        maxLength={50}
                                        pattern="[a-Z]{0,50}"
                                        name="apellido_M"
                                        value={apellido_M}
                                        onChange={(e) => setApellido_M(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Edad"
                                        maxLength={2}
                                        min="1" max="99"
                                        name="edad"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Especialidad"
                                        maxLength={50}
                                        pattern="[a-Z]{0,50}"
                                        name="especialidad"
                                        value={especialidad}
                                        onChange={(e) => setEspecialidad(e.target.value)}
                                    />
                                </div>
                            </div>



                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Ubicación"
                                        maxLength={100}
                                        name="ubicacion"
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="form-group">
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        required
                                        placeholder="Credencial"
                                        maxLength={100}
                                        name="credencial"
                                        value={credencial}
                                        onChange={(e) => setCredencial(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />
                            <Button id="submit" color="primary" tag="input" type="submit" value="Crear médico" />
                            </form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddMedicoView;