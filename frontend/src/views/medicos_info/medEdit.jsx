import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import image from "/background2.jpg";
import { Col, Card, Row } from "reactstrap";

const EditMedicoView = () => {
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellido_P: "",
    apellido_M: "",
    edad: 0,
    especialidad: "",
    ubicacion: "",
    credencial: "",
    profesion: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setMedicoData();
  }, []);

  const setMedicoData = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/medicos/get/${params.id}/`
    );

    if (response.status === 200) {
      setFormData({
        ...formData,
        apellido_M: response.data.apellido_M,
        apellido_P: response.data.apellido_P,
        rut: response.data.rut,
        nombre: response.data.nombre,
        edad: response.data.edad,
        especialidad: response.data.especialidad,
        profesion: "medico",
        ubicacion: response.data.ubicacion,
        credencial: response.data.credencial,
      });
    }
  };

  function formatterRut(e) {
    var rut = e.target.value;
    var actual = rut.toString().replace(/^0+/, "");
    if (actual != "" && actual.length > 1) {
      var sinPuntos = actual.replace(/\./g, "");
      var actualLimpio = sinPuntos.replace(/-/g, "");
      var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      var rutPuntos = "";
      var i = 0;
      var j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        var letra = !/^([0-9])*$/.test(inicio.charAt(i))
          ? ""
          : inicio.charAt(i);
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
  function cleanRut(rut, withoutDv = false) {
    var sinPuntos = rut.toString().replace(/\./g, "");
    var actualLimpio = sinPuntos.replace(/-/g, "");
    return withoutDv
      ? actualLimpio
      : actualLimpio.substring(0, actualLimpio.length - 1);
  }

  function validateRut(rut) {
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut.toString())) {
      return false;
    }
    rut = cleanRut(rut, true);
    var t = parseInt(rut.slice(0, -1), 10);
    var m = 0;
    var s = 1;
    while (t > 0) {
      s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
      t = Math.floor(t / 10);
    }
    var v = s > 0 ? "" + (s - 1) : "K";
    return v === rut.slice(-1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateRut(formData.rut)) {
      alert("Rut inválido");
      return;
    }

    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:8000/api/medicos/put/${params.id}/`,
        data: formData
      });
      
      console.log(response.data);
      if (response.data === "Rut actualmente en uso") {
        alert(response.data);
      } else {
        alert("Usuario Editado");
        navigate("/directory");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div
        className="container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Row>
          <Col md={6}>
            <Card style={{ padding: "20px" }}>
              <h1>Editar Médico</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="text, number"
                      input-mode="numeric"
                      maxlength={12}
                      className="form-control form-control-lg"
                      id="rut"
                      onInput={formatterRut}
                      required
                      placeholder="12.345.678-9"
                      //pattern="\d{7,10}"
                      name="rut"
                      value={formData.rut}
                      onChange={(e) =>
                        setFormData({ ...formData, rut: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      required
                      id="nombre"
                      placeholder="Nombre médico"
                      maxLength={50}
                      pattern="^[a-zA-Z][a-zA-Z ]{1,49}"
                      name="nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      required
                      id="apellido_P"
                      placeholder="Apellido Paterno"
                      maxLength={50}
                      pattern="^[a-zA-Z][a-zA-Z ]{1,49}"
                      name="apellido_P"
                      value={formData.apellido_P}
                      onChange={(e) =>
                        setFormData({ ...formData, apellido_P: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      required
                      id="apellido_M"
                      placeholder="Apellido Materno"
                      maxLength={50}
                      pattern="^[a-zA-Z][a-zA-Z ]{1,49}"
                      name="apellido_M"
                      value={formData.apellido_M}
                      onChange={(e) =>
                        setFormData({ ...formData, apellido_M: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      required
                      id="edad"
                      placeholder="Edad"
                      maxLength={2}
                      min="1"
                      max="99"
                      name="edad"
                      value={formData.edad}
                      onChange={(e) =>
                        setFormData({ ...formData, edad: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      required
                      id="especialidad"
                      placeholder="Especialidad"
                      maxLength={50}
                      pattern="^[a-zA-Z][a-zA-Z ]{1,49}"
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          especialidad: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="url"
                      className="form-control form-control-lg"
                      required
                      id="ubicacion"
                      placeholder="Ubicación"
                      maxLength={100}
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={(e) =>
                        setFormData({ ...formData, ubicacion: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="form-group">
                    <input
                      type="url"
                      className="form-control form-control-lg"
                      required
                      id="credencial"
                      placeholder="Credencial"
                      maxLength={100}
                      name="credencial"
                      value={formData.credencial}
                      onChange={(e) =>
                        setFormData({ ...formData, credencial: e.target.value })
                      }
                    />
                  </div>
                </div>
                <br />
                <Button
                  id="submit"
                  color="primary"
                  tag="input"
                  type="submit"
                  value="Guardar"
                />
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditMedicoView;
