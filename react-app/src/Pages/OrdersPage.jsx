import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3333/all-orders')
        .then(async res =>{
            const data = await res.json()
            console.log(data);
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
                        <Card.Title>Rendelő: {order.rendelo}</Card.Title>
                        <Card.Text>
                            Rendelt tételek: {order.rendelt_tetelek}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        Akítv: {order.aktiv ? 'Igen' : 'Nem'}
                    </Card.Footer>
                </Card>
            ))}
        </>
    );
}