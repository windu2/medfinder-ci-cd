// Here is the header or NavBar of the project, you can modify as you wish

import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { useAuthContext } from "../../context/useAuthContext";

const Header = (args) => {
  const { user, logoutUser } = useAuthContext();
  return (
    <div >
      <Navbar style={{backgroundColor:"#282828"}} >
        <NavbarBrand href="/" >
          <h1 style={{color:"white", paddingLeft:"10px"}}>MedFinder</h1>
        </NavbarBrand>

        <Nav>
          {user ? (
            <>
              {user.is_admin ? (
                <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
              ) : (
                ""
              )}
              <NavItem>
                <Button onClick={logoutUser} className="btn btn-danger">
                  Logout
                </Button>
              </NavItem>
            </>
          ) : (
            <>
              {/* <NavItem>
                <NavLink href="/register" active className="btn btn-secondary">
                  Register
                </NavLink>
              </NavItem> */}
              &nbsp;
              <NavItem>
                <NavLink href="/login" active className="btn btn-success">
                  Login Administrador
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
