import { useEffect, useState } from 'react'
import OrderComponent from '../Components/OrderComponent'
import { useNavigate } from "react-router";
import { Form, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '../Components/Spinner';
import SidebarComponent from '../Components/SidebarComponent';

export default function OrderPage(props) {
    const [price, setPrice] = useState(0);
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
            //console.log(data)
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
        .finally(() => setIsLoading(false))
    }, [])

    const handleOverallPrice = overallPrice => {
        setPrice(price + overallPrice)
    }

    const handleOrder = data => {
        const newOrder = { ...order }
        newOrder[data.id] = { name: data.name, quantity: data.quantity }

        for (const key in newOrder) {
            if (newOrder[key].quantity === 0) {
                delete newOrder[key];
            }
        }

        setOrder(newOrder)
    }

    const handleFilter = filter => {
        if (!filter || filter == 'Minden') return setFilteredFoods(foods);
        setFilteredFoods(foods.filter(food => food.tipus === filter));
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (order && Object.keys(order).length > 0) {
            setIsLoading(true)
            
            fetch('http://localhost:3333/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({order: order, user: props.username})
            })
            .then(async res => {
                if (res.ok) {
                    toast.success('Rendelés leadása sikeresen megtörtént!')

                    const data = await res.json()

                    console.log(data)

                    props.setLastOrderId(data.id);

                    navigate('/status')
                } 
                else {
                    toast.error('Hiba történt a rendelés leadása során!')
                }
            })
            .catch(err => {
                toast.error('Hiba történt a rendelés leadása során!')
            })
            .finally(() => setIsLoading(false))
            

            
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
                            <OrderComponent key={key} element={element} onOrderChange={handleOrder} overallPrice={handleOverallPrice} />
                        ))
                    }
                </Row>
                <button type="submit" className="orderSubmitButton shadow">Rendelés leadása</button>
                <h5 className='mt-3'>Fizetendő: {price} Ft</h5>
            </Form>

            {isLoading && <Spinner />}
            <ToastContainer position="top-center"/>
        </div>
    )
}