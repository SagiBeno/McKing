import { Card } from "react-bootstrap";
import LoginComponent from "../Components/LoginComponent";

export default function LoginPage(props) {
    const handleLogin = data => {
        props.onLogin(data);
    }

    return(
        <Card className="shadow">
            <Card.Body>
                <LoginComponent onLogin={handleLogin} />
            </Card.Body>
        </Card>
    )
}