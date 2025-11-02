import { Card, Button } from 'react-bootstrap';

export default function OrderCardComponent({order, showAktiv, adminButtons, onComplete, onDelete}) {
    const handleComplete = () => {
        onComplete(order.id);
    }

    const handleDelete = () => {
        onDelete(order.id);
    }

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
                Állapot: {order.aktiv ? 'Folyamatban' : 'Teljesített'}
            </Card.Footer>}
            {adminButtons && 
                <div>
                    {order.aktiv ? <Button variant="success" onClick={handleComplete} style={{marginRight: '5px'}}>Teljesítés</Button> : ''}
                    <Button variant="danger" onClick={handleDelete}>Törlés</Button>
                </div>
            }
        </Card>
    )
}