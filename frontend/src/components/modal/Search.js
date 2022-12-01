import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import groupBy from '../../utils/groupBy'
import delay from '../../utils/delay'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import MyPagination from '../pagination/Pagination'

let PageSize = 4

const ListKeysVacancies = ({ vacancies, keys, selected }) => {
  if (keys) {
    return keys.map((item, i) => (
      <ListGroup.Item
        key={i}
        action
        href={'#' + item}
        className="d-flex justify-content-between align-items-start"
        onClick={(e) => selected(e.target.getAttribute('href'))}
      >
        <Image
          src={`${process.env.PUBLIC_URL}/images/pin_${item}.png`}
          height="20"
        />
        {!item ? 'не указано' : item}
        <Badge bg="primary" pill>
          {vacancies.get(keys[i]).length}
        </Badge>
      </ListGroup.Item>
    ))
  }
}

const ListDemo = ({ activeKey, vacancies, currentPage, selectedPage }) => {
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
              <Col>
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
              </Col>
            </Row>
          ))}
        <Row className="row mt-4">
          <MyPagination
            currentPage={currentPage}
            totalCount={vacancies.get(activeKey).length}
            pageSize={PageSize}
            onPageChange={(page) => selectedPage(page)}
          />
        </Row>
      </Container>
    )
  }
}

const Search = (props) => {
  const [value, setValue] = React.useState('')
  const [vacancies, setVacancies] = React.useState(null)
  const [activeKey, setActiveKey] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)

  const selectedActiveKey = (value) => {
    setActiveKey(value.substring(1, value.length))
    setCurrentPage(1)
  }

  const selectedPage = (page) => {
    setCurrentPage(page)
  }

  React.useEffect(() => {
    const getVacancies = async () => {
      await delay(1000)

      await fetch('http://localhost:5000/')
        .then((res) => res.json())
        .then((result) => {
          setVacancies(result)
        })
    }

    getVacancies()
  }, [])

  var vacanciesGroupBy = vacancies
    ? groupBy(
        value === ''
          ? vacancies
          : vacancies.filter((vacancy) => vacancy.keySkill === value),
        (item) => item.keySkill
      )
    : null
  var vacanciesKeys = vacancies
    ? Array.from(vacanciesGroupBy.keys()).map((key) => key)
    : null

  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter">
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
                onChange={(e) => setValue(e.target.value)}
              />
            </Col>
          </Row>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#ios">
            <Row className="row mt-4">
              <Col sm={4}>
                <ListGroup>
                  <ListKeysVacancies
                    vacancies={vacanciesGroupBy}
                    keys={vacanciesKeys}
                    selected={selectedActiveKey}
                  />
                </ListGroup>
              </Col>
              <Col sm={8}>
                <ListDemo
                  activeKey={activeKey}
                  vacancies={vacanciesGroupBy}
                  currentPage={currentPage}
                  selectedPage={selectedPage}
                ></ListDemo>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Search
