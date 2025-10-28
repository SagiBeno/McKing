import { useState } from "react"
import { Button, Form, Row } from 'react-bootstrap';

export default function RegistrationForm(props) {
    const [invalidRegistration, setInvalidRegistration] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        const formElements = e.target.elements
        const username = formElements.formUsername.value
        const email = formElements.formEmail.value
        const password = formElements.formPassword.value
        const confirmPassword = formElements.formConfirmPassword.value

        if (password !== confirmPassword) {
            setInvalidRegistration('Passwords do not match')
            return
        }

        else if(password.length < 8) {
            setInvalidRegistration('Password must be at least 8 characters long')
            return
        }

        fetch('http://localhost:3333/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, email: email, password: password })
        })
        .then(async response => {
            if (response.ok) {
                const data = await response.json();
                props.onRegister(data.username);
                                           
            } 
            else{
                const errorData = await response.json();
                setInvalidRegistration(errorData.message || 'Registration failed');
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Felhasználónév</Form.Label>
                <Form.Control type="text" placeholder="Felhasználónév" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>E-mail cím</Form.Label>
                <Form.Control type="email" placeholder="minta@gmail.com" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control type="password" placeholder="Jelszó" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Jelszó ismétlése</Form.Label>
                <Form.Control type="password" placeholder="Jelszó ismétlése" required/>
            </Form.Group>
            
            <Row>
                <button type="submit" className="loginButton shadow">Regisztráció</button>
            </Row>
            {invalidRegistration && <p className="text-danger mt-3">{invalidRegistration}</p>}
            <p className="mt-3">
                Rendelkezik fiókkal? <a href="/">Jelentkezzen be itt!</a>
            </p>
        </Form>
    )
}