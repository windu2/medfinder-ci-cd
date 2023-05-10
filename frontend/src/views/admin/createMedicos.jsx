import axios from 'axios';
import React, {useState} from 'react';
import {Button, Form} from 'reactstrap';

const AddMedicoView = () => {

    const[rut, setRut] = useState("")
    const[nombre, setNombre] = useState("")
    const[apellido_P, setApellido_P] = useState("")
    const[apellido_M, setApellido_M] = useState("")
    const[edad, setEdad] = useState(0)
    const[especialidad, setEspecialidad] = useState("")
    //const[profesion, setProfesion] = useState("")
    const[ubicacion, setUbicacion] = useState("")
    const[credencial, setCredencial] = useState("")

    const AddMedicInfo = async () => {
        let formField = new FormData()

        formField.append('rut', rut)
        formField.append('nombre', nombre)
        formField.append('apellido_P', apellido_P)
        formField.append('apellido_M', apellido_M)
        formField.append('edad', edad)
        formField.append('especialidad', especialidad)
        //formField.append('profesion', profesion)
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
        <div>
            <div className="container">
                <div className="form-control">
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg" 
                        placeholder="12345678-9"
                        name = "rut"
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
                        placeholder="Nombre médico"
                        name = "nombre"
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
                        placeholder="Apellido Paterno"
                        name = "apellido_P"
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
                        placeholder="Apellido Materno"
                        name = "apellido_M"
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
                        placeholder="Edad"
                        name = "edad"
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
                        placeholder="Especialidad"
                        name = "especialidad"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        />
                </div>
                </div>

                

                <div className="form-control">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg" 
                        placeholder="Ubicación"
                        name = "ubicacion"
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
                        placeholder="Credencial"
                        name = "credencial"
                        value={credencial}
                        onChange={(e) => setCredencial(e.target.value)}
                        />
                </div>
                </div>
            <Button color="primary" tag="input" onClick={AddMedicInfo} type="submit" value="Crear médico"/>
            </div>
            
        </div>
    )
}

export default AddMedicoView;