import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Info from '../modal/Info'

import { BsFillGearFill, BsInfoLg } from 'react-icons/bs'

const Menu = (props) => {
  return (
    <Container fluid>
      <Navbar.Text>
        <Button onClick={() => props.search('search')} variant="primary">
          <BsFillGearFill />
        </Button>{' '}
        <Button variant="primary" onClick={() => props.search('info')}>
          <BsInfoLg />
        </Button>{' '}
      </Navbar.Text>
    </Container>
  )
}

export default Menu
