import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Employee = () => {
    const [employee, setEmployee] = useState();

    useEffect(() => {
        fetch('http://localhost:7071/api/getEmployee')
            .then((resp) => {
                if (resp.status !== 200) {
                    console.log('Error')
                }

                resp.json().then((data) => {
                    setEmployee(data);
                })
            })
    }, []);

    if (!employee) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>Mecanicos</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((branch, i) => {
                        return (
                            <tr key={i}>
                                <td>{branch.id}</td>
                                <td>{branch.name}</td>
                                <td>{branch.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default Employee;