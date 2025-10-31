import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function NavbarComponent(props) {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
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
                            <Nav.Link as={Link} to="/order">Új rendelés leadása</Nav.Link>
                            <Nav.Link as={Link} to="/status">Rendelésed állapota</Nav.Link>

                            {(props.role === 'admin' || props.role === 'worker') && 
                            <Nav.Link as={Link} to="/current-orders">Jelenlegi rendelések</Nav.Link>}
                            
                        </Nav>

                        <Navbar.Text>
                            Bejelentkezve: <Navbar.Brand as={Link} to="/" className="logoutButton" style={{padding:0}}>{props.username}</Navbar.Brand>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}