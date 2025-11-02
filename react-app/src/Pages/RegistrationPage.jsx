import { Component } from "react";
import RegistrationComponent from "../components/RegistrationComponent";
import { Card } from "react-bootstrap";

export default class Registration extends Component {
    handleRegistration = e => {
        this.props.onRegister(e);
    }

    render() {
        return (
            <Card className="shadow">
                <Card.Body>
                    <RegistrationComponent onRegister={this.handleRegistration} />
                </Card.Body>
            </Card>
        )
    }
}