import { Form } from "react-bootstrap";

export default function NewWorkerComponent() {

    const handleData = e => {
        e.preventDefault();
    }

    return (
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
                <input type="radio" name="workerType" id='workerType1' value='admin' style={{margin: '0px 10px 10px 0px'}} onChange={handleRadioButton}/>

                <label htmlFor="workerType2">Dolgozó</label>
                <input type="radio" name="workerType" id="workerType2" value='worker' checked onChange={handleRadioButton}/>
            </div>

            <button type="submit" className="newWorkerButton m-1">Dolgozó felvétele</button>
        </Form>
    )
}