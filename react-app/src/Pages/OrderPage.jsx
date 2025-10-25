import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'

export default function OrderPage() {
    const [order, setOrder] = useState()

    const handleOreder = data => {
        setOrder([...data])
    }

    return (
        <div>
            <OrderComponent onOrder={handleOreder}/> 
        </div>
    )
}