import { Container } from "react-bootstrap";
import Schedule from "../components/Schedule";
import Link from 'next/link'

const SchedulePage = () => {
    return (
        <Container>
            <Schedule />
            <Link href="/"><a>Volver al inicio</a></Link>
        </Container>
    )
}

export default SchedulePage;