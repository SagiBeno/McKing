import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';

export default function NewWorkerComponent(props) {
    const [formData, setFormData] = useState({
        workerUsername: "",
        workerEmail: "",
        workerPassword: "",
        workerConfirmPassword: "",
        workerType: "worker",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleData = e => {
        e.preventDefault();
        
        const username = formData.workerUsername
        const email = formData.workerEmail
        const password = formData.workerPassword
        const passwordConfirm = formData.workerConfirmPassword
        const workerType = formData.workerType

        if (password != passwordConfirm) toast.warning('A jelszavak nem egyeznek!')
        else {
            if (password.length < 8) toast.warning('A jelszónak legalább nyolc karakter hosszúnak kell lennie!')
            else {
                props.onNew({ username: username, email: email, password: password, type: workerType })
                setFormData({
                    workerUsername: "",
                    workerEmail: "",
                    workerPassword: "",
                    workerConfirmPassword: "",
                    workerType: "worker",
                });
            }
        }
    }

    return (
        <>
            <Form onSubmit={handleData} className="newWorkerComponent">
                <Form.Group className="mb-3" controlId="workerUsername">
                    <Form.Label>Felhasználónév</Form.Label>
                    <Form.Control type="text" placeholder="Felhasználónév" value={formData.workerUsername} onChange={handleChange} required/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="workerEmail">
                    <Form.Label>E-mail cím</Form.Label>
                    <Form.Control type="email" placeholder="minta@gmail.com" value={formData.workerEmail} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="workerPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó" value={formData.workerPassword} onChange={handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="workerConfirmPassword">
                    <Form.Label>Jelszó ismétlése</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó ismétlése" value={formData.workerConfirmPassword} onChange={handleChange} required/>
                </Form.Group>

                <div className="workerRadioButtons">
                    <Form.Check
                        inline
                        label="Admin"
                        name="workerType"
                        type="radio"
                        id="admin"
                        value="admin"
                        checked={formData.workerType === "admin"}
                        onChange={(e) =>
                            setFormData({ ...formData, workerType: e.target.value })
                        }
                    />

                    <Form.Check
                        inline
                        label="Worker"
                        name="workerType"
                        type="radio"
                        id="worker"
                        value="worker"
                        checked={formData.workerType === "worker"}
                        onChange={(e) =>
                            setFormData({ ...formData, workerType: e.target.value })
                        }
                    />
                </div>
                
                <button type="submit" className="workerButton m-1">Dolgozó felvétele</button>
            </Form>
        </>    
    )
}