import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'
import { useNavigate } from "react-router";

export default function OrderPage() {
    const [order, setOrder] = useState()
    let navigate = useNavigate()

    const handleOreder = data => {
        setOrder([...data])
        navigate('/status');
    }

    return (
        <div>
            <h1>McKing - Menü</h1>
            <OrderComponent onOrder={handleOreder}/> 
        </div>
    )
}