import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'
import { useNavigate } from "react-router";
import { Form, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '../Components/Spinner';
import SidebarComponent from '../Components/SidebarComponent';

export default function OrderPage(props) {
    const [order, setOrder] = useState({})
    const [foods, setFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3333/foods')
        .then(async res =>{
            const data = await res.json()

            setFoods(data)
            setFilteredFoods(data)
            console.log(data)
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
        .finally(load => setIsLoading(false))

        console.log()
    }, [])

    const handleOrder = data => {
        console.log('Data: ', data)
        const newOrder = { ...order }
        newOrder[data.id] = { name: data.name, quantity: data.quantity }
        setOrder(newOrder)
        console.log('handleOrder: ', order)
    }

    const handleFilter = filter => {
        var filteredFoodsArray = []
        foods.map((element) => {
            if (element.tipus == filter) filteredFoodsArray.push(element)
        })
        setFilteredFoods(filteredFoodsArray)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('handleSubmit: ', order)

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
        <div style={{marginTop: '20px'}}>
            <h1>Menü</h1>
            <SidebarComponent onClick={handleFilter} />
            <Form onSubmit={handleSubmit}>
                <Row>

                     {
                        filteredFoods.map( (element, key) => (
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