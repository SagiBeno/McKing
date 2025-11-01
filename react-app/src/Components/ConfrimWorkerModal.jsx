import { useState } from "react"
import { Modal, Button } from 'react-bootstrap'

export default function ConfrimWorkerModal(props) {
    const [showModal, setShowModal] = useState(true)
    const worker  = props.data

    const handleCloseModal = () => {
        setShowModal(false)
        props.onShow()
    }

    const handleDelete = () => {
        setShowModal(false)
        props.onConfirm()
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Törlés megerősítése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Szeretné törölni az alábbi dolgozót: 
              {worker.map((element, idx) => (
                <ul key={idx}>
                  <li><strong>Felhasználónév: </strong>{element.username}</li>
                  <li><strong>E-mail cím: </strong>{element.email}</li>
                  <li><strong>Munkakör: </strong>{element.tipus}</li>
                </ul>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Mégse
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Törlés
              </Button>
            </Modal.Footer>
        </Modal>
    )
}