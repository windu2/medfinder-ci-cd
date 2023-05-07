// Here is the header or NavBar of the project, you can modify as you wish

import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { useAuthContext } from "../../context/useAuthContext";

const Header = (args) => {
  const { user, logoutUser } = useAuthContext();
  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="/MedfinderLogo.png"
            style={{
              // height: 40,
              width: 300
            }}
          />
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
                <NavLink href="/todo">Todo</NavLink>
              </NavItem>
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
