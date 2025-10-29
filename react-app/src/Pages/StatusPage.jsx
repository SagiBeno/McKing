import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function StatusPage () {
    const location = useLocation();
    const orderId = location.state.orderId || {};
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3333/api/order/${orderId}`)
        .then(async res =>{
            const data = await res.json()
            setOrder(data);
        })
        .catch(err => {
            console.log("Hiba az adatok lekérése során: ", err)
        })
    }, []);

    return(
        <>
            <h1>McKing - Rendelés állapota</h1>
            {Object.values(order).map((item, idx) => (
                <p key={idx}>
                    {item.name} - Mennyiség: {item.quantity}
                </p>
            ))}
        </>
    )
}