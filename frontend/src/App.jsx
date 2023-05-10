import React, { Component } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";    

import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import TodoView from "./views/todo/todo";
import LoginView from "./views/auth/login";
import IndexView from "./views/index/index";
import AdminView from "./views/admin/admin";
import RegisterView from "./views/auth/register";
import InfoView from "./views/medicos_info/info";
import MedInfoView from "./views/medicos_info/medInfo";

// This is the most important and the main class of the project.
// Here is rendered every other view for the project
// You should add your Routes under the <Routes> tag with the path and
// the element (component) to render
class App extends Component {
  render() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen overflow-hidden">
          {/* AuthProvider makes that every person is logged, and can be used in every other Route */}
          <AuthProvider>
            <Header/>
            <Routes>
              {/* This path (*) prevents to navigate every other page that is not register in the project */}
              <Route path="/" element={<IndexView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/todo" element={<TodoView />} />
              <Route path="/admin" element={<AdminView />}></Route>
              <Route path="/directory" element={<InfoView />}></Route>
              <Route path="/medico/:id" element={<MedInfoView />}></Route>
            </Routes>
            {/* if you want a Footer, can be added by uncommenting the lane below and adding the required component */}
            {/* <Footer /> */}
          </AuthProvider>
        </div>
      </Router>
    );
  }
}

export default App;
