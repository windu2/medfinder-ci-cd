import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button } from 'reactstrap';
import {
  Input,
  Label,
  Form,
  FormGroup,
  Col,
  Card,
  Row,
  CardTitle,
  NavLink,
} from "reactstrap";
import { useAuthContext } from "../../context/useAuthContext";

const MedicosView = () => {
  const { user, logoutUser } = useAuthContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/medicos/get/%22");
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

  // Lista predefinida de nombres
  /*const [data, setData] = useState([
    { "id": "1", "rut" : "11.111.111-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "2", "rut" : "22.22.22-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "3", "rut" : "33.33.33-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "4", "rut" : "44.44.44-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "5", "rut" : "55.55.55-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "6", "rut" : "666.666.666-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "7", "rut" : "77.77.77-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "8", "rut" : "88.88.88-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "9", "rut" : "99.99.99-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "10", "rut" : "15.178.856-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },
    { "id": "11", "rut" : "21.521.251-1",name: "nombre1","apellido_P" : "ApellidoP","apellido_M" : "ApellidoM", "edad" : 21, "especialidad" : "Cardiología","profesion" : "Médico Cirujano", "ubicacion" : "link","credencial" : "Link" , address: "dire1" },

  ]);*/

  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Cantidad de elementos por página
  const itemsPerPage = 10;

  // Índices del primer y último elemento en la página actual
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // Estado para almacenar los nombres editados
  const [editedData, setEditedData] = useState({});

  // Función para cambiar de página
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleDeleteClick = (index) => {
  
  const result = window.confirm("¿Está seguro que desea eliminar este elemento?");

  if (result) {
    var rutMedico = data[firstIndex + index].rut;
    console.log(rutMedico)
    const newData = [...data];
    newData.splice(firstIndex + index, 1);
    setData(newData);
    setEditedData({});

    // recargar la página
    deleteRemoteItem(idMedico) {
    fetch('http://127.0.0.1:8000/api/medicos/delete/' + idMedico, { method: 'DELETE' })
      .then(res => res.json())
      .then(
        () => {
          this.fetchRemoteItems()
          }
      )
    }
    window.location.reload();
  } else {
    setEditedData({});
  }
};

  // Función para manejar cambios en los inputs de edición
  const handleEditInputChange = (event, index) => {
    const { data, value } = event.target;
    setEditedData({
      ...editedData,
      [index]: {
        ...editedData[index],
        [data]: value,
      },
    });
  };

  // Función para iniciar la edición de un elemento
  const handleEditClick = (index) => {
  setEditedData({
    ...editedData,
    [index]: {      
      rut: data[firstIndex + index].rut,
      name: data[firstIndex + index].name,
      apellido_P: data[firstIndex + index].apellido_P,
      apellido_M: data[firstIndex + index].apellido_M,
      edad: data[firstIndex + index].edad,
      especialidad: data[firstIndex + index].especialidad,
      profesion: data[firstIndex + index].profesion,
      credencial: data[firstIndex + index].credencial,
      address: data[firstIndex + index].address,
    },
  });
};

  // Función para cancelar la edición de un elemento
  const handleCancelClick = (index) => {
    const { [index]: deleted, ...rest } = editedData;
    setEditedData(rest);
  };

  // Función para confirmar la edición de un elemento
  const handleConfirmClick = (index) => {
  const newData = [...data];

  newData[firstIndex + index] = editedData[index];
  setEditedData({});
  setData(newData);
  useEffect(() => {
  async function updateData() {
    const response = await fetch(`http://127.0.0.1:8000/api/medicos/update/${medicoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const json = await response.json();
    setData(json);
  }

  updateData();
}, [updatedData]);
};

  // Número de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <ListGroup>
  <div className="container-fluid my-5">
    <table className="table table-bordered table-striped">
      <thead>
        <tr>

          <th>Rut</th>
          <th>Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th> 
          <th>Edad</th>
          <th>Especialidad</th>
          <th>Profesión</th>
          <th>Ubicación</th>
          <th>Credencial</th> 
          {user.is_admin && (
            <th>Acciones</th>
          )}
          
        </tr>
      </thead>
      <tbody>
  {data.slice(firstIndex, lastIndex).map((data, index) => (
    <tr key={index}>
    

      <td>
        {editedData[index] ? (
          <Input
            data="rut"
            value={editedData[index].rut}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.rut
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="name"
            value={editedData[index].name}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.name
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="apellido_P"
            value={editedData[index].apellido_P}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.apellido_P
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="apellido_M"
            value={editedData[index].apellido_M}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.apellido_M
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="edad"
            value={editedData[index].edad}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.edad
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="especialidad"
            value={editedData[index].especialidad}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.especialidad
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="profesion"
            value={editedData[index].profesion}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.profesion
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="credencial"
            value={editedData[index].credencial}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.credencial
        )}
      </td>
      <td>
        {editedData[index] ? (
          <Input
            data="address"
            value={editedData[index].address}
            onChange={(event) => handleEditInputChange(event, index)}
          />
        ) : (
          data.address
        )}
      </td>
      {user.is_admin && (
  <td>
    {editedData[index] ? (
      <>
        <Button onClick={() => handleCancelClick(index)}>Cancelar</Button>
        <Button onClick={() => handleConfirmClick(index)} color="primary">Guardar</Button>
        <Button color="danger" onClick={() => handleDeleteClick(index)}>Eliminar</Button>
      </>
    ) : (
      <>
        <Button onClick={() => handleEditClick(index)} color="primary" outline>Editar</Button>
        <Button color="danger" onClick={() => handleDeleteClick(index)}>Eliminar</Button>
      </>
    )}
  </td>
)}
 
      </tr>
  ))}
</tbody>
    </table>
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? "page-item active" : "page-item"
            }
          >
            <a
              href="#"
              className="page-link"
              id={number}
              onClick={handleClick}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
  </ListGroup>
);
}



export default MedicosView;