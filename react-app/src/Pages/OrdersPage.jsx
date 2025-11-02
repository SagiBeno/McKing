import { useState, useEffect } from "react";
import OrderCardComponent from "../Components/OrderCardComponent";
import { toast, ToastContainer } from 'react-toastify';
import ConfirmModal from "../Components/ConfirmModal";
import Spinner from "../Components/Spinner";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [deleteOrder, setDeleteOrder] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        setIsLoading(true)
        fetch('http://localhost:3333/all-orders')
        .then(async res =>{
            const data = await res.json()
            //console.log(data);
            setOrders(data);
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
        .finally(() => setIsLoading(false))
    }

    const handleOrderDelete = () => {
        const orderId = deleteOrder.orderId
        setShowModal(false)
        
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

    const handleOrderDeleteModal = (orderId) => {
        const id = orderId
        var order = {
            orderId: id,
            title: 'Törlés',
            orderData: [],
            message: 'Szeretné törölni az alábbi rendelést:',
            items: []
        }
        orders.map((element, idx) => {
            if (element.id === id) {
                order.items = [
                    {label: 'Rendelés száma:', value: element.id},
                    {label: 'Rendelő neve:', value: element.rendelo},
                    {label: 'Rendelt tételek:', value: element.rendelt_tetelek}
                ]
                order.orderData.push(element)
            }
        })

        setDeleteOrder({...order})
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
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
                adminButtons={true} onComplete={handleOrderComplete} onDelete={handleOrderDeleteModal} />
            ))}
            {showModal && <ConfirmModal onConfirm={handleOrderDelete} onShow={handleCloseModal} data={deleteOrder}/>}
            {isLoading && <Spinner />}
        </>
    );
}