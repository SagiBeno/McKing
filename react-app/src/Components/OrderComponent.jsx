import { Card, Col} from "react-bootstrap"
import { useState } from 'react'

export default function OrderComponent(props) {
    const [quantity, setQuantity] = useState(0)

    const handleAdd = e => {
        e.preventDefault()

        setQuantity(quantity + 1)
        props.onOrderChange({ id: props.element.id, name: props.element.nev, quantity: quantity + 1 })
    }

    const handleRemove = e => {
        e.preventDefault()

        if (quantity > 0) {
            setQuantity(quantity - 1)
            props.onOrderChange({ id: props.element.id, name: props.element.nev, quantity: quantity - 1 })
        }

    }

    return (
        <Col className="orderCardDiv">
            <Card className="mb-4 orderCard shadow">
                <Card.Body>
                    <Card.Title style={{fontWeight: 'bold', marginBottom: '10px', fontSize: "25px"}}>{props.element.nev}</Card.Title>
                    <Card.Img className="card-img shadow" src={props.element.kep} alt={props.element.nev} title={props.element.title} loading="lazy"/>
                    <Card.Text style={{fontSize: '20px', marginTop: '10px'}}>{props.element.ar} Ft</Card.Text>
                    <Card.Text className="quantityDiv">
                        <button type="button" className="deleteButton orderButton shadow" onClick={handleRemove}><i className="fa-solid fa-minus"></i></button>
                        <span style={{fontSize: '20px'}}>{quantity} db</span>
                        <button type="button" className="appendButton orderButton shadow" onClick={handleAdd}><i className="fa-solid fa-plus"></i></button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}