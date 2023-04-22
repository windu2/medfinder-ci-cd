// This is the TODO page, where is rendering only the TODO component

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";



const AdminView = () => {
    const { user } = useAuthContext();

    return (
        <div>
        { user.is_admin ? 
            <h1>This is an example to Admin users</h1>
            :
            <Navigate to="/todo"  />
        }
      </div>
    );
  };
  
  export default AdminView;