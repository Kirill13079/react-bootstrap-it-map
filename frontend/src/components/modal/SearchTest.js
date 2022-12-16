import React from 'react'
import { Button, Col, Container, ListGroupItem, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Pagination from '../pagination/Pagination'
import Image from 'react-bootstrap/Image'

import './Search.css'

let PageSize = 4

const Keys = ({
  vacancies,
  keys,
  selected,
  activeKey,
  checkedKey,
  visible,
}) => {
  if (keys && visible) {
    return keys.map((item, i) => (
      <Container key={`${i}-${item.key}`}>
        <Row>
          <Col xs={1}>
            <Form.Check
              checked={item.isChecked}
              onChange={(e) => checkedKey(item.key)}
            />
          </Col>
          <Col xs={11}>
            <ListGroup.Item
              action
              id={item.key}
              className="d-flex justify-content-between align-items-start"
              onClick={(e) => selected(e.target.getAttribute('id'))}
              active={activeKey === item.key}
            >
              <Image
                src={`${process.env.PUBLIC_URL}/images/pin_${item.key}.png`}
                height="20"
              />
              {!item.key ? 'null' : item.key}
              <Badge bg="primary" pill>
                {vacancies.get(keys[i].key).length}
              </Badge>
            </ListGroup.Item>
          </Col>
        </Row>
      </Container>
    ))
  }

  return null
}

const VacanciesByKey = ({
  activeKey,
  visible,
  vacancies,
  currentPage,
  selectedPage,
}) => {
  if (activeKey && !visible) {
    return (
      <Container fluid>
        {vacancies
          .get(activeKey)
          .slice(
            (currentPage - 1) * PageSize,
            (currentPage - 1) * PageSize + PageSize
          )
          .map((item, i) => (
            <Row key={i}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Card.Link href={item.url} target="_blank">
                      {item.nameCompany}
                    </Card.Link>
                  </Card.Subtitle>
                  <Card.Text>{item.skill}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  {item.city} {item.street} {item.building}
                </Card.Footer>
              </Card>
            </Row>
          ))}
      </Container>
    )
  }

  return null
}

const Footer = (props) => {
  if (props.data['pagination'].list) {
    return (
      <Pagination
        currentPage={props.data['pagination'].currentPage}
        totalCount={props.data['pagination'].list.length}
        pageSize={PageSize}
        onPageChange={(page) => props.onPageChange(page)}
      />
    )
  } else {
    return (
      <Card.Footer className="text-muted">
        Total vacancies: {props.data['filtered'].length}
      </Card.Footer>
    )
  }
}

const Header = (props) => {
  if (props.active.key) {
    return (
      <Container>
        <Card.Title>{props.active.key}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Button onClick={(e) => props.back()}>Back</Button>
        </Card.Subtitle>
      </Container>
    )
  } else {
    return (
      <Container>
        <Card.Title>Search vacancies by skill</Card.Title>
      </Container>
    )
  }
}

const SearchTest = (props) => {
  const [activeKey, setActiveKey] = React.useState('')
  const [showListKeys, setShowListKeys] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  const [openVacancies, setOpenVacancies] = React.useState({
    key: '',
    isOpen: false,
  })

  const filtered = props.data['vacancies'].filtered
  const keys = props.data['keys'].list
  const groupBy = props.data['vacancies'].groupBy
  const vacanciesByKey = openVacancies.key
    ? props.data['vacancies'].groupBy.get(openVacancies.key)
    : null

  console.log(vacanciesByKey)

  const selectedActiveKey = (value) => {
    setActiveKey(value)
    setCurrentPage(1)

    setShowListKeys(false)

    setOpenVacancies({ key: value, isOpen: true })
  }

  const back = () => {
    setOpenVacancies({ key: '', isOpen: false })
    setShowListKeys(true)
  }

  if (props.visible) {
    return (
      <div class="overlay">
        <Card style={{ height: '100%' }}>
          <Header active={openVacancies} back={back}></Header>
          <Card.Body
            style={{ height: '0px', overflowY: 'auto', padding: '0px' }}
          >
            <ListGroup className="todo-list">
              <Keys
                vacancies={groupBy}
                keys={keys}
                selected={selectedActiveKey}
                checkedKey={props.checkedKey}
                activeKey={activeKey}
                visible={showListKeys}
              />
            </ListGroup>
            <VacanciesByKey
              activeKey={activeKey}
              visible={showListKeys}
              vacancies={props.data['vacancies'].groupBy}
              currentPage={currentPage}
              selectedPage={setCurrentPage}
            ></VacanciesByKey>
          </Card.Body>
          <Footer
            data={{
              filtered: filtered,
              pagination: {
                list: vacanciesByKey,
                currentPage: currentPage,
              },
            }}
            onPageChange={setCurrentPage}
          ></Footer>
        </Card>
      </div>
    )
  }

  return null
}

export default SearchTest
