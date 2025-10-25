import { Button, Card } from "react-bootstrap"
import { useEffect, useState } from 'react'

export default function OrderComponent(props) {
    // Fetch
    const example = [
        {id: 1, name: 'Hamburger', price: 1250, quantity: 0},
        {id: 2, name: 'MalacCola', price: 300, quantity: 0}
    ]

    const [order, setOrder] = useState(example)

    const handleAdd = e => {
        const id = e.target.value
        var newOrder = [...order]
        newOrder.map((item, key) => {
            if (item.id == id) item.quantity++
        })
        setOrder([...newOrder])
    }

    const handleRemove = e => {
        const id = e.target.value
        var newOrder = [...order]
        newOrder.map((item) => {
            if (item.id == id) {
                if (item.quantity != 0) item.quantity--
            }
        })
        setOrder([...newOrder])
    }

    const handleSubmit = e => {
        e.preventDefault()

        var ordered = []
        order.map((item) => {
            if (item.quantity != 0) {
                ordered.push(item)
            }
        })

        if (ordered.length > 0) props.onOrder(ordered)
    }

    return (
        <>
            {
                order.map( (item, key) => (
                    <Card key={key} className="mb-1">
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.price} Ft</Card.Text>
                        <Card.Text className="quantityDiv">
                            <button type="button" className="deleteButton orderButton" value={item.id} onClick={handleRemove}>-</button>
                            <span style={{marginRight: '2px'}}>{item.quantity}</span>db
                            <button type="button" className="appendButton orderButton" value={item.id} onClick={handleAdd}>+</button>
                        </Card.Text>
                    </Card>
                ))
            }

            <button type="submit" onClick={handleSubmit}>Rendelés leadása</button>
        </>
    )
}