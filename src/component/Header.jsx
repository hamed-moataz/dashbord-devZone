import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Brand href="#home" className='fs-3 fw-bold'>Dashbord</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto border fs-5 fw-semibold">
            <Nav.Link href="/products">Home</Nav.Link>
            <Nav.Link href="/">AddProduct</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header