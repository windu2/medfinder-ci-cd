// This is the TODO page, where is rendering only the TODO component

import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const IndexView = () => {

  const navigate = useNavigate()

  const verMedicos = () =>{
    navigate('/medicos')
  }

  return (
    <div className="container-fluid my-5">
      <h1>Bienvenidos a MedFinder! </h1>
      <Button onClick={verMedicos} color="primary"> Ver los médicos </Button>
    </div>
  );
};

export default IndexView;