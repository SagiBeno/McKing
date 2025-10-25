import { useState } from "react"
import { Button, Form, Row} from 'react-bootstrap';

export default function LoginComponent(props) {
    const [invalidLogin, setInvalidLogin] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        {/* TODO - Backend által jóváhagyott bejelentkezés*/}
        props.onLogin(true)
    }

    return (
        <Form onSubmit={handleSubmit} style={{fontSize: '20px'}} className="formDiv">
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Felhasználónév</Form.Label>
                <Form.Control type="text" placeholder="Felhasználónév" required style={{fontSize: '20px'}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control type="password" placeholder="Jelszó" required style={{fontSize: '20px'}}/>
            </Form.Group>

            <Row>
                <Button id='loginButton' type="submit">
                    Bejelentkezés
                </Button>
            </Row>

            <Row className="mt-1">
                <Button id='guestButton' onClick={() => props.onLogin(true)}>
                    Rendelelés bejelentkezés nélkül
                </Button>
            </Row>

            {invalidLogin && <p className="text-danger mt-3">Helytelen felhasználónév cím vagy jelszó!</p>}
        </Form>
    )
}