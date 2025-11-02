import { useState } from "react"
import { Modal, Button } from 'react-bootstrap'

export default function ConfrimWorkerModal(props) {
    const [showModal, setShowModal] = useState(true)
    
    const title = props.data.title
    const message = props.data.message
    const list = props.data.items

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
              <Modal.Title>{title} megerősítése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message}
              <ul>
                {
                  list.map((element, idx) => (
                    <li key={idx}><strong>{element.label}</strong> {element.value}</li>
                  ))
                }
              </ul>
              
              
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