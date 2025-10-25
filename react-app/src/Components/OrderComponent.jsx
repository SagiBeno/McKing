import { Card } from "react-bootstrap"
import { useEffect, useState } from 'react'

export default function OrderComponent(props) {
    // Fetch
    const example = { items:
        [
            {id: 1, name: 'Hamburger', price: 1250, quantity: 0},
            {id: 2, name: 'MalacCola', price: 300, quantity: 0}
        ]
    }

    const [orderItems, setOrderItems] = useState(example)
    const [orderedItems, setOrderedItems] = useState()

    const handleAdd = e => {
        //TODO
    }

    const handleRemove = e => {
        // TODO
    }

    return (
        <>
            {
                orderItems.items.map( (item, key) => (
                    <Card key={key} className="mb-1">
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.price} Ft</Card.Text>
                        <Card.Text className="quantityDiv">
                            <button type="button" className="deleteButton orderButton" value={item.id} onClick={handleRemove}>-</button>
                            <span style={{marginRight: '2px'}} id={item.id}>{item.quantity}</span>db
                            <button type="button" className="appendButton orderButton" value={item.id} onClick={handleAdd}>+</button>
                        </Card.Text>
                    </Card>
                ))
            }
        </>
    )
}