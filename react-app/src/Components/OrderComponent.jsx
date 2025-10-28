import { Button, Card, Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

export default function OrderComponent(props) {
    // Fetch
    const example = [
        { 
            id: 1, 
            name: 'Hamburger', 
            price: 1250, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'
        },
        { 
            id: 2, 
            name: 'CocaCola', 
            price: 300, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?w=800'
        },
        { 
            id: 3, 
            name: 'Sajtburger', 
            price: 1450, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800'
        },
        { 
            id: 4, 
            name: 'Dupla Sajtburger', 
            price: 1850, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800'
        },
        { 
            id: 5, 
            name: 'Hasábburgonya', 
            price: 750, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800'
        },
        { 
            id: 6, 
            name: 'Csirkefalatok', 
            price: 990, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=800'
        },
        { 
            id: 7, 
            name: 'Jégkrém', 
            price: 600, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800'
        },
        { 
            id: 8, 
            name: 'Kávé', 
            price: 450, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'
        },
        { 
            id: 9, 
            name: 'Limonádé', 
            price: 550, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=800'
        },
        { 
            id: 10, 
            name: 'Hot Dog', 
            price: 990, 
            quantity: 0,
            image: 'https://images.unsplash.com/photo-1613482084286-41f25b486fa2?w=800'
           }
    ]

    const [order, setOrder] = useState(example)
    const [filteredMenu, setFilteredMenu] = useState([...order])

    const handleAdd = e => {
        const id = e.target.value
        var newOrder = [...order]
        newOrder.map((element, key) => {
            if (element.id == id) element.quantity++
        })
        setOrder([...newOrder])
    }

    const handleRemove = e => {
        const id = e.target.value
        var newOrder = [...order]
        newOrder.map((element) => {
            if (element.id == id) {
                if (element.quantity != 0) element.quantity--
            }
        })
        setOrder([...newOrder])
    }

    const handleOrderFilter = (filter) => {
        const menuLowerCase = filter.toLowerCase()
        const filtered = order.filter(element =>
            element.name.toLowerCase().includes(menuLowerCase)
        );
        setFilteredMenu(filtered)
    }

    const handleSubmit = e => {
        e.preventDefault()

        var ordered = []
        order.map((element) => {
            if (element.quantity != 0) {
                ordered.push(element)
            }
        })

        if (ordered.length > 0) {
            props.onOrder(ordered)
            toast.success('Rendelés leadása sikeresen megtörtént!')
        } else {
            toast.warning('Kérem válasszon ki ételt!');
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    placeholder="Keresés étel alapján..."
                    className="mb-3"
                    name="filter"
                    id="filter"
                    onChange={(e) => handleOrderFilter(e.target.value)}
                />

                <Row>

                    {
                        filteredMenu.map( (element, key) => (
                            <Col key={key} className="orderCardDiv">
                                <Card key={key} className="mb-4 orderCard shadow">
                                    <Card.Body>
                                        <Card.Title style={{fontWeight: 'bold', marginBottom: '10px', fontSize: "25px"}}>{element.name}</Card.Title>
                                        <Card.Img className="card-img shadow" src={element.image} alt={element.name} title={element.title} loading="lazy"/>
                                        <Card.Text style={{fontSize: '20px', marginTop: '10px'}}>{element.price} Ft</Card.Text>
                                        <Card.Text className="quantityDiv">
                                            <button type="button" className="deleteButton orderButton shadow" value={element.id} onClick={handleRemove}><i className="fa-solid fa-minus"></i></button>
                                            <span style={{fontSize: '20px'}}>{element.quantity} db</span>
                                            <button type="button" className="appendButton orderButton shadow" value={element.id} onClick={handleAdd}><i className="fa-solid fa-plus"></i></button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <button type="submit" className="orderSubmitButton shadow">Rendelés leadása</button>
            </Form>
            <ToastContainer position="top-center"/>
        </>
    )
}