import { Card } from 'react-bootstrap';

export default function OrderCardComponent({order, showAktiv}){
    return(
        <Card className="my-3">
            <Card.Header>Rendelés #{order.id}</Card.Header>
            <Card.Body>
                <Card.Title>Rendelő: {order.rendelo}</Card.Title>
                <Card.Text>
                    Rendelt tételek: {order.rendelt_tetelek}
                </Card.Text>
            </Card.Body>
            {showAktiv && <Card.Footer>
                Akítv: {order.aktiv ? 'Igen' : 'Nem'}
            </Card.Footer>}
        </Card>
    )
}