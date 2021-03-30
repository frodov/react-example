import { Container } from 'react-bootstrap'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <h2>Meat Example</h2>
      <ul>
        <li>
          <Link href="/branch">
            <a>Ver sucursales</a>
          </Link>
        </li>
        <li>
          <Link href="/employee">
            <a>Ver mecanicos</a>
          </Link>
        </li>
        <li>
          <Link href="/schedule">
            <a>Agendar cita</a>
          </Link>
        </li>
      </ul>
    </Container>
  )
}
