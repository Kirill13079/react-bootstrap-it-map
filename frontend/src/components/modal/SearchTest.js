import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Pagination from '../pagination/Pagination'
import Image from 'react-bootstrap/Image'

let PageSize = 4

const ListKeysVacancies = ({
  vacancies,
  keys,
  selected,
  activeKey,
  checkedKey,
  visible,
}) => {
  if (keys && visible) {
    return keys.map((item, i) => (
      <ListGroup.Item
        action
        key={`${i}-${item.key}`}
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
    ))
  }

  return null
}

const VacanciesByKey = ({
  activeKey,
  visible,
  back,
  vacancies,
  currentPage,
  selectedPage,
}) => {
  if (activeKey && !visible) {
    return (
      <Container fluid>
        <Button onClick={(e) => back(true)}>Назад</Button>
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

const SearchTest = (props) => {
  const [value, setValue] = React.useState('')
  const [activeKey, setActiveKey] = React.useState('')
  const [showListKeys, setShowListKeys] = React.useState(true)
  const [currentPage, setCurrentPage] = React.useState(1)

  const searchVacancies = (searchText) => {
    setValue(searchText)
    setActiveKey('')
    setCurrentPage(1)
  }

  const selectedActiveKey = (value) => {
    setActiveKey(value)
    setCurrentPage(1)

    setShowListKeys(false)
  }

  const selectedPage = (page) => {
    setCurrentPage(page)
  }

  if (props.visible) {
    return (
      <div class="overlay">
        <Card style={{ height: '100%' }}>
          <Card.Body style={{ height: '0px', overflowY: 'auto' }}>
            <Card.Title>Search vacancies</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <Form.Control
                autoFocus
                placeholder="Write a vacancy or a skill"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </Card.Subtitle>
            <ListGroup>
              <ListKeysVacancies
                vacancies={props.data[1]}
                keys={
                  value
                    ? props.data[2].filter((vacancy) => vacancy === value)
                    : props.data[2]
                }
                selected={selectedActiveKey}
                checkedKey={props.checkedKey}
                activeKey={activeKey}
                visible={showListKeys}
              />
            </ListGroup>
            <VacanciesByKey
              activeKey={activeKey}
              visible={showListKeys}
              back={setShowListKeys}
              vacancies={props.data[1]}
              currentPage={currentPage}
              selectedPage={selectedPage}
            ></VacanciesByKey>
          </Card.Body>
          <Card.Footer className="text-muted">
            Total vacancies: {props.data[0].length}
          </Card.Footer>
        </Card>
      </div>
    )
  }

  return null
}

export default SearchTest
