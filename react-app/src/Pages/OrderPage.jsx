import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'
import { useNavigate } from "react-router";
import { Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderPage(props) {
    const [order, setOrder] = useState({})
    const [foods, setFoods] = useState([])
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
        newOrder[data.id] = data
        setOrder(newOrder)
    }

    const handleSubmit = e => {
        e.preventDefault()


        if (order && Object.keys(order).length > 0) {
            toast.success('Rendelés leadása sikeresen megtörtént!')
            //TODO backendnek küldés
            navigate('/status')
        } else {
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
            <ToastContainer position="top-center"/>
        </div>
    )
}