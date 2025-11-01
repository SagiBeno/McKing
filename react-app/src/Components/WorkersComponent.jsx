import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Table, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import ConfrimWorkerModal from "./ConfrimWorkerModal";

export default function WorkersComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [workers, setWorkers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [deleteWorker, setDeleteWorker] = useState()

    useEffect(() => {
        setIsLoading(true)
        getData()
    }, [])

    const getData = () => {
        fetch('http://localhost:3333/workers')
        .then(async res => {
            const data = await res.json()
            setWorkers(data)
        })
        .catch(console.warn)
        .finally(() => setIsLoading(false))
    }

    const handleOpenModal = e => {
        const id = +e.target.value
        var worker = []
        workers.map((element, idx) => {
            if (element.id === id) worker.push(element) 
        })
        setDeleteWorker([...worker])
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
            body: JSON.stringify([...deleteWorker])
        })
        .then(res => {
            let status = res.status
            if (status === 204) {
                setIsLoading(true)
                toast.success('Sikeresen töröltük a dolgozót!')
                getData()
            } else {
                toast.error('A dolgozó törlése sikertelen!')
            }
        })
        .catch(console.warn)
        .finally()
    }

    return (
        <>
            <div className="tableWrapper">
                <Table className="responsive table-striped table-hover">
                    <caption style={{captionSide: 'top', textAlign: 'center', color: 'black', fontWeight: 'bold'}}>Dolgozók listája</caption>
                    <thead>
                        <tr>
                            <th className="align-middle">ID</th>
                            <th className="align-middle">Felhasználónév</th>
                            <th className="align-middle">E-mail cím</th>
                            <th className="align-middle">Típus</th>
                            <th className="align-middle">Dolgozó törlése</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            workers.map((element, idx) => (
                                <tr key={idx}>
                                    <td className="align-middle" style={{textAlign: 'left'}}>{element.id}</td>
                                    <td className="align-middle" style={{textAlign: 'left'}}>{element.username}</td>
                                    <td className="align-middle" style={{textAlign: 'left'}}>{element.email}</td>
                                    <td className="align-middle" style={{textAlign: 'left'}}>{element.tipus}</td>
                                    <td className="align-middle" style={{textAlign: 'center'}}><button value={element.id} type="button" onClick={handleOpenModal} id="workerDeleteButton"><i className="fa-solid fa-trash fa-lg"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                
            </div>

            {showModal && <ConfrimWorkerModal onConfirm={handleDelete} onShow={handleCloseModal} data={deleteWorker}/>}
            {isLoading && <Spinner />}
            <ToastContainer position="top-center"/>
        </>
    )
}