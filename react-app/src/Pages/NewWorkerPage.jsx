import { Card } from 'react-bootstrap'
import NewWorkerComponent from '../Components/NewWorkerComponent'

export default function NewWorkerPage() {
    return (
        <>
            <Card className='shadow'>
                <Card.Body>
                    <h1>Új dolgozó adatai</h1>
                    <NewWorkerComponent /> 
                </Card.Body>
            </Card>
        </>
    )
}