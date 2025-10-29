import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'
import { useNavigate } from "react-router";
import { Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '../Components/Spinner';

export default function OrderPage(props) {
    const [order, setOrder] = useState({})
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3333/api/foods')
        .then(async res =>{
            const data = await res.json()

            setFoods(data)
            console.log(data)
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
    }, [])



    const handleOrder = data => {
        const newOrder = { ...order }
        newOrder[data.id] = { name: data.name, quantity: data.quantity }
        setOrder(newOrder)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (order && Object.keys(order).length > 0) {
            setIsLoading(true)
            fetch('http://localhost:3333/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(async res => {
                if (res.ok) {
                    toast.success('Rendelés leadása sikeresen megtörtént!')

                    const data = await res.json()

                    console.log(data)

                    navigate('/status', { state: { orderId: data.id } })
                } 
                else {
                    toast.error('Hiba történt a rendelés leadása során!')
                }
            })
            .catch(err => {
                toast.error('Hiba történt a rendelés leadása során!')
            })
            .finally(load => setIsLoading(false))

            
        } 
        else {
            toast.warning('Kérem válasszon ki ételt!');
        }
    }

    return (
        <div>
            <h1>McKing - Menü</h1>

            <Form onSubmit={handleSubmit}>
                <Row>

                    {
                        foods.map( (element, key) => (
                            <OrderComponent key={key} element={element} onOrderChange={handleOrder} />
                        ))
                    }
                </Row>
                <button type="submit" className="orderSubmitButton shadow">Rendelés leadása</button>
            </Form>
            {isLoading && <Spinner />}
            <ToastContainer position="top-center"/>
        </div>
    )
}