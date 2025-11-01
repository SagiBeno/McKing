import { useState, useEffect } from "react";
import OrderCardComponent from "../Components/OrderCardComponent";

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
                <OrderCardComponent key={index} order={order} showAktiv={true} />
            ))}
        </>
    );
}