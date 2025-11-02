import { useState, useEffect } from "react";
import OrderCardComponent from "../Components/OrderCardComponent";
import { toast, ToastContainer } from 'react-toastify';

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

    const handleOrderDelete = (orderId) => {
        fetch(`http://localhost:3333/delete-order/${orderId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                setOrders(orders.filter(order => order.id !== orderId));
                toast.success("Rendelés sikeresen törölve!");
            } 
            else {
                console.log("Hiba a rendelés törlése során: ", res.statusText);
                toast.error("Hiba történt a rendelés törlése során.");
            }
        })
    }

    const handleOrderComplete = (orderId) => {
        fetch(`http://localhost:3333/complete-order/${orderId}`, {
            method: 'PATCH',
        })
        .then(res => {
            if (res.ok) {
                setOrders(orders.map(order => order.id === orderId ? { ...order, aktiv: 0 } : order));
                toast.success("Rendelés sikeresen teljesítve!");
            } else {
                console.log("Hiba a rendelés teljesítése során: ", res.statusText);
                toast.error("Hiba történt a rendelés teljesítése során.");
            }
        });
    }

    return (
        <>
            {orders.map((order, index) => (
                <OrderCardComponent key={index} order={order} showAktiv={true} 
                adminButtons={true} onComplete={handleOrderComplete} onDelete={handleOrderDelete} />
            ))}
        </>
    );
}