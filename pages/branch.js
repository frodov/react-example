import { Container } from 'react-bootstrap';
import Branch from '../components/Branch'
import Link from 'next/link'

const BranchPage = () => {
    return (
        <Container>
            <Branch />
            <Link href="/"><a>Volver al inicio</a></Link>
        </Container>
    )
}

export default BranchPage;