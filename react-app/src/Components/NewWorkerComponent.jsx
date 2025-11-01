import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react";
import Spinner from "./Spinner";

export default function NewWorkerComponent() {
    const [isLoading, setIsLoading] = useState(false)

    const handleData = e => {
        e.preventDefault();

        const formElements = e.target.elements
        const username = formElements.workerUsername.value
        const email = formElements.workerEmail.value
        const password1 = formElements.workerPassword1.value
        const password2 = formElements.workerPassword2.value
        const workerType = formElements.workerType.value

        if (password1 != password2) toast.warning('A jelszavak nem egyeznek!')
        else {
            if (password1.length < 8) toast.warning('A jelszónak legalább nyolc karakter hosszúnak kell lennie!')
        }

        setIsLoading(true)
        fetch('http://localhost:3333/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password1 })
            }
        )
        .then(async (response) => {

        })
        .catch(console.warn)
        .finally(setIsLoading(false))
    }

    return (
        <>
            <Form onSubmit={handleData} className="newWorkerComponent">
                <label htmlFor="workerUsername">Felhasználónév:</label>
                <input type="text" required name="workerUsername" id="workerUsername" placeholder="Felhasználónév"/>

                <label htmlFor="workerEmail">E-mail cím:</label>
                <input type="email" required name="workerEmail" id="workerEmail" placeholder="minta@gmail.com"/>

                <label htmlFor="workerPassword1">Jelszó: </label>
                <input type="password" required name="workerPassword1" id="workerPassword1" placeholder="Jelszó"/>

                <label htmlFor="workerPassword2">Jelszó ismétlése: </label>
                <input type="password" required name="workerPassword2" id="workerPassword2" placeholder="Jelszó ismétlése"/>

                <div className="workerRadioButtons">
                    <label htmlFor="workerType1">Admin</label>
                    <input type="radio" name="workerType" id='workerType1' value='admin' style={{margin: '0px 10px 10px 0px'}} />

                    <label htmlFor="workerType2">Dolgozó</label>
                    <input type="radio" name="workerType" id="workerType2" value='worker' defaultChecked />
                </div>

                <button type="submit" className="workerButton m-1">Dolgozó felvétele</button>
            </Form>
            <ToastContainer position="top-center" />
            {isLoading && <Spinner />}
        </>    
    )
}