import { useState } from "react"
import { Button, Form, Row} from 'react-bootstrap';

export default function LoginComponent(props) {
    const [invalidLogin, setInvalidLogin] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        {/* TODO - Backend által jóváhagyott bejelentkezés*/}
        setInvalidLogin(false)
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
                <button type="submit" className="loginButton shadow">Bejelentkezés</button>
            </Row>

            <Row className="mt-3">
                <button type="button" className="shadow" id='guestButton' onClick={() => props.onLogin(true)}>Rendelelés bejelentkezés nélkül</button>
            </Row>
            {invalidLogin && <p className="text-danger mt-3">Helytelen felhasználónév vagy jelszó!</p>}
            <p className="mt-3">Nincs fiókja? <a href="/register">Regisztráljon</a></p>
        </Form>
    )
}