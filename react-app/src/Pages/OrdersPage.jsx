import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3333/api/orders')
        .then(async res =>{
            const data = await res.json()
            setOrders(data);
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
    }, []);

    return (
        <>
            {orders.map((order, index) => (
                <Card className="my-3" key={index}>
                    <Card.Header>Rendelés #{index + 1}</Card.Header>
                    <Card.Body>
                        {Object.values(order).map((item, idx) => (
                            <Card.Text key={idx}>
                                {item.name} - Mennyiség: {item.quantity}
                            </Card.Text>
                        ))}
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}