import { Card, Button } from 'react-bootstrap';

export default function OrderCardComponent({order, showAktiv, adminButtons}) {
    const handleComplete = () => {
        // Teljesítés logika
    }

    const handleDelete = () => {
        // Törlés logika
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
                Akítv: {order.aktiv ? 'Igen' : 'Nem'}
            </Card.Footer>}
            {adminButtons && (
                <div>
                    <Button variant="success" onClick={handleComplete}>Teljesítés</Button>
                    <Button variant="danger" onClick={handleDelete}>Törlés</Button>
                </div>
                )}
        </Card>
    )
}