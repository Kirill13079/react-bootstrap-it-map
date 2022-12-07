import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

const Info = (props) => {
  if (props.visible) {
    return (
      <div class="overlay">
        <Card style={{ height: '100%' }}>
          <Card.Body style={{ height: '0px', overflowY: 'auto' }}>
            <Card.Title>Project Information</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Non-commercial project
            </Card.Subtitle>
            <Card.Text>
              This is project aimed at simplifying the job search. All vacancies
              are marked with markers on the map.
              <ListGroup as="ol" numbered variant="flush">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Group markers</div>
                    <Row>
                      <Col xs={2}>
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/pin.png`}
                          height="30px"
                        />
                      </Col>
                      <Col xs={10}>
                        Click and we will zoom in on the map. And if there is
                        nowhere to bring it closer, then we will tell you about
                        all the vacancies in the group.
                      </Col>
                    </Row>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">One marker</div>
                    <Row>
                      <Col xs={2}>
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/pin.png`}
                          height="30px"
                        />
                      </Col>
                      <Col xs={10}>
                        Click here and we will tell you more about the vacancy.
                      </Col>
                    </Row>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Text>
            <Card.Link href="http://kzhen.ru/">Contact</Card.Link>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </div>
    )
  }

  return null
}

export default Info
