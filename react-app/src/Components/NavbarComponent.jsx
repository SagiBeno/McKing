import { Navbar, Nav, Container, NavLink } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function NavbarComponent(props) {
    return (
        <>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <img
                            src="/McKing.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="McKing logo"
                          />
                        McKing
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link href="/order">Új rendelés leadása</Nav.Link>
                            <Nav.Link href="/status">Rendelésed állapota</Nav.Link>

                            {(props.role === 'admin' || props.role === 'worker') && 
                            <Nav.Link href="/orders">Jelenglegi rendelések</Nav.Link>}
                            
                        </Nav>

                        <Navbar.Text>
                            Bejelentkezve: <a href="/" className="logoutButton">{props.username}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}