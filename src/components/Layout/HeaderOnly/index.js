import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function HeaderOnly({ children }) {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <Row>
          <Col>
            <div className="content">{children}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HeaderOnly;
