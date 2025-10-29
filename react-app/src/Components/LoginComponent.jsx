import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Row} from 'react-bootstrap';

export default function LoginComponent(props) {
    const [invalidLogin, setInvalidLogin] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        
        console.log(e.target.formUsername.value)
        console.log(e.target.formPassword.value)

        fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.formUsername.value,
                password: e.target.formPassword.value
            })
        })
        .then(async response => {
            const data = await response.json()
            if (response.ok) {
                setInvalidLogin(false)
                props.onLogin({ username: e.target.formUsername.value, role: data.role })
                navigate('/order')
            } 
            else{
                setInvalidLogin(true)
            }
        })
        .catch(error => {
            console.error(error)
            setInvalidLogin(true)
        })
    }

    return (
        <Form onSubmit={handleSubmit} style={{fontSize: '20px'}} className="formDiv">
            <Form.Group className="mb-3" controlId="formUsername">
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
                <button type="button" className="shadow" id='guestButton' onClick={() => navigate('/order')}>Rendelelés bejelentkezés nélkül</button>
            </Row>
            {invalidLogin && <p className="text-danger mt-3">Helytelen felhasználónév vagy jelszó!</p>}
            <p className="mt-3">Nincs fiókja? <a href="/register">Regisztráljon itt!</a></p>
        </Form>
    )
}