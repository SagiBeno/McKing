import { Card } from 'react-bootstrap'
import NewWorkerComponent from '../Components/NewWorkerComponent'
import WorkersComponent from '../Components/WorkersComponent'
import { useState } from 'react'

export default function WorkerPage() {
    const [workers, setWorkers] = useState([])
    const [showNewWorker, setShowNewWorker] = useState(false)

    const handleShowForm = e => {
        let innerHTML = e.target.innerHTML
        if (innerHTML === 'Dolgozó felvételéhez kattintson ide') e.target.innerHTML = 'Mégse'
        else e.target.innerHTML = 'Dolgozó felvételéhez kattintson ide'
        setShowNewWorker(showNewWorker ? false : true)
        
    }

    return (
        <>
            <WorkersComponent />
            <button type='button' onClick={handleShowForm} style={{margin: '20px auto 5px auto'}} className='workerButton'>Dolgozó felvételéhez kattintson ide</button>
            {
                showNewWorker && 
                <Card className='shadow mt-3'>
                    <Card.Body>
                        <h1>Új dolgozó adatai</h1>
                        <NewWorkerComponent /> 
                    </Card.Body>
                </Card>
            }
            
        </>
    )
}