import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Table } from "react-bootstrap";

export default function WorkersComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [workers, setWorkers] = useState([])

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

    const handleDelete = e => {
        // TODO - DELETE
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
                                    <td className="align-middle" style={{textAlign: 'center'}}><button value={element.id} type="button" onClick={handleDelete} id="workerDeleteButton"><i className="fa-solid fa-trash fa-lg"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

            {isLoading && <Spinner />}
        </>
    )
}