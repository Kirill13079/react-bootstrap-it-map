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

const ListKeysVacancies = ({ keys }) => {
  if (keys) {
    return keys.map((item, i) => (
      <ListGroup.Item key={i} action href={'#' + item}>
        {item}
      </ListGroup.Item>
    ))
  }
}

const Test = ({ vacancies, keys }) => {
  if (keys) {
    return keys.map((item, i) => (
      <Tab.Pane key={i} eventKey={'#' + item}>
        {vacancies.get(keys[i]).map((key) => (
          <label>{key.name}</label>
        ))}
      </Tab.Pane>
    ))
  }
}

const Search = (props) => {
  var vacanciesGroupBy = props.vacancies
    ? groupBy(props.vacancies, (item) => item.keySkill)
    : null
  var vacanciesKeys = props.vacancies
    ? Array.from(vacanciesGroupBy.keys()).map((key) => key)
    : null

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
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
                placeholder="Write a vacancy or a skill"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </Col>
          </Row>
          <Row>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row>
                <Col sm={4}>
                  <ListGroup>
                    <ListKeysVacancies keys={vacanciesKeys} />
                  </ListGroup>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Test vacancies={vacanciesGroupBy} keys={vacanciesKeys} />
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
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
