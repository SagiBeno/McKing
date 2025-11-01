import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import OrderCardComponent from '../Components/OrderCardComponent';

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
        fetch(`http://localhost:3333/order/${orderId}`)
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
            <OrderCardComponent order={order} showAktiv={false} />
            {isLoading && <Spinner />}
        </>
    )
}