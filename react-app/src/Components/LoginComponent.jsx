import { useState } from "react"
import { Button, Form} from 'react-bootstrap';

export default function LoginComponent(props) {
    const [invalidLogin, setInvalidLogin] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        {/* TODO - Backend által jóváhagyott bejelentkezés*/}
        props.onLogin(true)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Felhasználónév</Form.Label>
                <Form.Control type="text" placeholder="Felhasználónév" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control type="password" placeholder="Jelszó" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Bejelentkezés
            </Button>
            {invalidLogin && <p className="text-danger mt-3">Helytelen e-mail cím vagy jelszó!</p>}
        </Form>
    )
}