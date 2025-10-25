import { useState } from 'react'
import { Card } from "react-bootstrap";
import OrderComponent from '../Components/OrderComponent'

export default function OrderPage() {
    const [orderedItems, setOrderedItems] = useState()

    const handleOreder = e => {
        //console.log('handleOrder: ', e);
    }

    return (
        <div className='container'>
            <OrderComponent onOrder={handleOreder}/> 
        </div>
    )
}