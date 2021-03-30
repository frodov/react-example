import { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Schedule = () => {
    const [branch, setBranch] = useState();
    const [schedule, setSchedule] = useState();
    const [branchInputName, setBranchInputName] = useState();
    const [branchInputDate, setBranchInputDate] = useState();
    const [branchInputHour, setBranchInputHour] = useState();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [employee, setEmployee] = useState();
    const [employeeInputName, setEmployeeInputName] = useState();
    const [mailInput, setMailInput] = useState();

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

        fetch('http://localhost:7071/api/getSchedule')
            .then((resp) => {
                if (resp.status !== 200) {
                    console.log('Error')
                }

                resp.json().then((data) => {
                    setSchedule(data);
                })
            })

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

    if (!schedule) {
        return <div>Loading...</div>
    }

    if (!branch) {
        return <div>Loading...</div>
    }

    if (!employee) {
        return <div>Loading...</div>
    }

    const onClick = (e) => {
        if (!branchInputName) {
            console.log("Debe seleccionar el nombre de la sucursal");
        } else if (!branchInputDate) {
            console.log("Debe seleccionar la fecha");
        } else {
            setSchedule([...schedule, { id: schedule.length + 1, name: branchInputName, email: mailInput , scheduledDate: [{ date: branchInputDate, hour: branchInputHour }] }]);
        }

    }


    const onchange = (e) => {
        switch (e.target.id) {
            case ("branchName"):
                setBranchInputName(e.target.value);
                break;
            case ("employeeName"):
                setEmployeeInputName(e.target.value);
                break;
            case ("email"):
                setMailInput(e.target.value);
                break;
        }
    }

    const onchangeDatePicker = (e) => {
        const month = e.getMonth() + 1;
        handleDateChange(e);
        setBranchInputDate(e.getFullYear() + "-" + month + "-" + e.getDate())
        setBranchInputHour(e.getHours() + ":" + e.getMinutes());
    }

    return (
        <>
            <h2>Agendar cita</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Sucursales</Form.Label>
                    <Form.Control as="select" id="branchName" onChange={onchange}>
                        <option>Seleccione una opcion</option>
                        {branch.map((branch, i) => {
                            return (<option key={i} value={branch.name}>{branch.name}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mecanicos</Form.Label>
                    <Form.Control as="select" id="employeeName" onChange={onchange}>
                        <option>Seleccione una opcion</option>
                        {employee.map((employee, i) => {
                            return (<option key={i} value={employee.name}>{employee.name}</option>)
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese un correo electronico" id="email" onChange={onchange} />
                </Form.Group>
                <Form.Group >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate} onChange={onchangeDatePicker} format="yyyy-MM-dd HH:mm" />
                    </MuiPickersUtilsProvider>
                </Form.Group>
                <Button variant="primary" onClick={onClick}>
                    Submit
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Cita agendada</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((schedule, i) => {
                        return (
                            <tr key={i}>
                                <td>{schedule.id}</td>
                                <td>{schedule.name}</td>
                                <td>{schedule.email}</td>
                                <td>{schedule.scheduledDate.map((date, d) => {
                                    return (date.date + " " + date.hour)
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default Schedule;