import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import groupBy from '../../utils/groupBy'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Pagination from '../pagination/Pagination'

let PageSize = 4

const ListKeysVacancies = ({ vacancies, keys, selected, activeKey }) => {
  if (keys) {
    return keys.map((item, i) => (
      <ListGroup.Item
        key={i}
        action
        id={item}
        className="d-flex justify-content-between align-items-start"
        onClick={(e) => selected(e.target.getAttribute('id'))}
        active={activeKey === item}
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
}

const Search = (props) => {
  const [value, setValue] = React.useState('')
  const [vacanciesGroupBy, setVacanciesGroupBy] = React.useState(null)
  const [vacanciesKeys, setVacanciesKeys] = React.useState(null)
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

  React.useEffect(() => {
    const getVacancies = () => {
      fetch('http://localhost:5000/')
        .then((res) => res.json())
        .then((result) => {
          setVacanciesGroupBy(
            result ? groupBy(result, (item) => item.keySkill) : null
          )
          setVacanciesKeys(
            result
              ? Array.from(groupBy(result, (item) => item.keySkill).keys()).map(
                  (key) => key
                )
              : null
          )
        })
    }

    getVacancies()
  }, [])

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
                onChange={(e) => searchVacancies(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="row mt-4">
            <Col sm={4}>
              <ListGroup>
                <ListKeysVacancies
                  vacancies={vacanciesGroupBy}
                  keys={
                    value
                      ? vacanciesKeys.filter((vacancy) => vacancy === value)
                      : vacanciesKeys
                  }
                  selected={selectedActiveKey}
                  activeKey={activeKey}
                />
              </ListGroup>
            </Col>
            <Col sm={8}>
              <VacanciesByKey
                activeKey={activeKey}
                vacancies={vacanciesGroupBy}
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
