import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Pagination from '../pagination/Pagination'

let PageSize = 4

const ListKeysVacancies = ({
  vacancies,
  keys,
  selected,
  activeKey,
  checkedKey,
}) => {
  if (keys) {
    return keys.map((item, i) => (
      <Container key={`${i}-${item.key}`}>
        <Button
          onClick={(e) => checkedKey(i, item.key)}
          disabled={!item.isChecked}
        >
          test
        </Button>

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
          {!item.key ? 'не указано' : item.key}
          <Badge bg="primary" pill>
            {vacancies.get(keys[i].key).length}
          </Badge>
        </ListGroup.Item>
      </Container>
    ))
  }

  return null
}

const VacanciesByKey = ({
  activeKey,
  vacancies,
  currentPage,
  selectedPage,
}) => {
  if (activeKey) {
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
        <Row className="row mt-4">
          <Pagination
            currentPage={currentPage}
            totalCount={vacancies.get(activeKey).length}
            pageSize={PageSize}
            onPageChange={(page) => selectedPage(page)}
          />
        </Row>
      </Container>
    )
  }

  return null
}

const Search = (props) => {
  const [value, setValue] = React.useState('')
  const [activeKey, setActiveKey] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)

  const searchVacancies = (searchText) => {
    setValue(searchText)
    setActiveKey('')
    setCurrentPage(1)
  }

  const selectedActiveKey = (value) => {
    setActiveKey(value)
    setCurrentPage(1)
  }

  const selectedPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search vacancies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12}>
              <Form.Control
                autoFocus
                placeholder="Write a vacancy or a skill"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={value}
                onChange={(e) => searchVacancies(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="row mt-4">
            <Col sm={4}>
              <ListGroup>
                <ListKeysVacancies
                  vacancies={props.data[0]}
                  keys={
                    value
                      ? props.data[1].filter((vacancy) => vacancy === value)
                      : props.data[1]
                  }
                  selected={selectedActiveKey}
                  checkedKey={props.checkedKey}
                  activeKey={activeKey}
                />
              </ListGroup>
            </Col>
            <Col sm={8}>
              <VacanciesByKey
                activeKey={activeKey}
                vacancies={props.data[0]}
                currentPage={currentPage}
                selectedPage={selectedPage}
              ></VacanciesByKey>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Search
