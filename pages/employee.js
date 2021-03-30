import { Container } from "react-bootstrap";
import Employee from "../components/Employee";
import Link from 'next/link'

const EmployeePage = () => {
    return (
        <Container>
            <Employee />
            <Link href="/"><a>Volver al inicio</a></Link>
        </Container>
    )
}

export default EmployeePage;