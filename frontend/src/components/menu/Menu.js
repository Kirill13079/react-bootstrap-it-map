import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Search from '../modal/Search'

const Menu = (props) => {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" bg="white" variant="white">
      <Container>
        <Navbar.Brand href="#home">it-map.by</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Navbar.Text>
            <Button onClick={() => setModalShow(true)}>Search</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <Search show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>
  )
}

export default Menu
