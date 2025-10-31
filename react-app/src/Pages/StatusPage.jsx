import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Spinner from '../Components/Spinner';

export default function StatusPage () {
    const location = useLocation();
    const orderId = location.state.orderId >= 0 ? location.state.orderId : -1;
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        if (orderId === -1) {
            return;
        }
        fetch(`http://localhost:3333/api/order/${orderId}`)
        .then(async res =>{
            const data = await res.json()
            setOrder(data);
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
        .finally(() => setIsLoading(false))
    }, []);

    return(
        <>
            <h1>Rendelésed:</h1>
            <Card className='shadow'>
                <Card.Header>Rendelés azonosítója: {orderId}</Card.Header>
                <Card.Body>
                    {Object.values(order).map((item, idx) => (
                        <p key={idx}>
                            {item.name} - {item.quantity} db
                        </p>
                    ))}
                </Card.Body>
                <Card.Footer>Rendelésed állapota: </Card.Footer>         
            </Card>
            {isLoading && <Spinner />}
        </>
    )
}