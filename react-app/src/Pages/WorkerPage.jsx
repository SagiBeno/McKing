import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import NewWorkerComponent from '../Components/NewWorkerComponent'
import WorkersComponent from '../Components/WorkersComponent'
import Spinner from '../Components/Spinner'
import ConfrimWorkerModal from '../Components/ConfrimWorkerModal'
import { toast, ToastContainer } from 'react-toastify';

export default function WorkerPage() {
    const [workers, setWorkers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showNewWorker, setShowNewWorker] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [deleteWorker, setDeleteWorker] = useState()

    useEffect( () => {
        getData()
    }, [])

    const getData = () => {
        setIsLoading(true)

        fetch('http://localhost:3333/workers')
        .then(async res => {
            const data = await res.json()
            setWorkers(data)
        })
        .catch(console.warn)
        .finally(() => setIsLoading(false))
    }

    const handleShowForm = e => {
        let innerHTML = e.target.innerHTML
        if (innerHTML === 'Dolgozó felvételéhez kattintson ide') e.target.innerHTML = 'Mégse'
        else e.target.innerHTML = 'Dolgozó felvételéhez kattintson ide'
        setShowNewWorker(showNewWorker ? false : true)
        
    }

    const handleButtonValue = data => {
        const id = data
        var worker = {
            title: 'Törlés',
            workerData: [],
            message: 'Szeretné törölni az alábbi dolgozót:',
            items: []
        }
        workers.map((element, idx) => {
            if (element.id === id) {
                worker.items = [
                    {label: 'Felhasználónév:', value: element.username},
                    {label: 'E-mail cím:', value: element.email},
                    {label: 'Munkakör:', value: element.tipus}
                ]
                    
                worker.workerData.push(element)
            }
        })
        setDeleteWorker({...worker})
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleDelete = () => {
        setShowModal(false)
        fetch('http://localhost:3333/delete-worker', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([...deleteWorker.workerData])
        })
        .then(async (res) => {
            let status = res.status
            if (status === 204) {
                toast.success('Sikeresen töröltük a dolgozót!')
                getData()
            } else {
                toast.error('A dolgozó törlése sikertelen!')
            }
        })
        .catch(console.warn)
    }

    const handleNewWorker = data => {
        const {username, email, password, type} = data

        fetch('http://localhost:3333/new-worker', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password, type: type })
            }
        )
        .then(async (response) => {
            const status = response.status
            if (status === 201) {
                toast.success('A dolgozót sikeresen rögzítettük!')
                getData()
            }

            else if (status === 409) {
                toast.warning('A dolgozó rögzítése sikertelen, mert már szerepel!')
            }

            else {
                toast.error('A dolgozó rögzítése sikertelen!')
            }
        })
        .catch(console.warn)
        .finally(getData())
    }

    return (
        <>
            <WorkersComponent data={workers} onModal={handleButtonValue}/>
            <button type='button' onClick={handleShowForm} style={{margin: '20px auto 5px auto'}} className='workerButton'>Dolgozó felvételéhez kattintson ide</button>
            {
                showNewWorker && 
                <Card className='shadow mt-3'>
                    <Card.Body>
                        <h1>Új dolgozó adatai</h1>
                        <NewWorkerComponent onNew={handleNewWorker} /> 
                    </Card.Body>
                </Card>
            }
            {isLoading && <Spinner />}
            {showModal && <ConfrimWorkerModal show={showModal} onConfirm={handleDelete} onShow={handleCloseModal} data={deleteWorker}/>}
            <ToastContainer position="top-center"/>
        </>
    )
}