import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import OrderCardComponent from '../Components/OrderCardComponent';

export default function StatusPage (props) {
    const location = useLocation();
    let orderId;

    if(location.state === null){
        orderId = props.lastOrderId;
    } 
    else {
        orderId = location.state.id;
    }

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