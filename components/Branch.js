import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Branch = () => {
    const [branch, setBranch] = useState();

    useEffect(() => {
        fetch('http://localhost:7071/api/getBranch')
            .then((resp) => {
                if (resp.status !== 200) {
                    console.log('Error')
                }

                resp.json().then((data) => {
                    setBranch(data);
                })
            })
    }, []);

    if (!branch) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>Sucursales</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sucursal</th>
                    </tr>
                </thead>
                <tbody>
                    {branch.map((branch, i) => {
                        return (
                            <tr key={i}>
                                <td>{branch.id}</td>
                                <td>{branch.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default Branch;