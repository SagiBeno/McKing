import { Card } from 'react-bootstrap'
import NewWorkerComponent from '../Components/NewWorkerComponent'
import WorkersComponent from '../Components/WorkersComponent'

export default function WorkerPage() {
    return (
        <>
            <WorkersComponent />
            <Card className='shadow mt-3'>
                <Card.Body>
                    <h1>Új dolgozó adatai</h1>
                    <NewWorkerComponent /> 
                </Card.Body>
            </Card>
        </>
    )
}