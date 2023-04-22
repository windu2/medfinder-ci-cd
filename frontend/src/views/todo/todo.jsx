// This is the TODO page, where is rendering only the TODO component

import Todo from "../../components/Todo/Todo/Todo";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const TodoView = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {/* We check if user is logged, if not redirect to /login always */}
      {/* {user ? <Todo user={user}/> : <Navigate to="/login"  /> } */}
      <Todo />
    </div>
  );
};

export default TodoView;
