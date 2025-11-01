import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Table } from "react-bootstrap";

export default function WorkersComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch('http://localhost:3333/workers', {method: 'GET'})
        .then()
        .catch(console.warn)
        .finally()
    }

    const handleDelete = data => {

    }

    return (
        <>
            <div className="tableWrapper">
                <Table>
                    <thead>
                        <tr>
                            <th>Felhasználónév</th>
                            <th>E-mail cím</th>
                            <th>Típus</th>
                            <th>Dolgozó törlése</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>minta@gmail.com</td>
                            <td>Admin</td>
                            <td><button type="button" onClick={handleDelete} id="workerDeleteButton"><i className="fa-solid fa-trash fa-lg"></i></button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {isLoading && <Spinner />}
        </>
    )
}