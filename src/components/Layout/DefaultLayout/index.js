import Header from "../components/Header";
import Sidebar from "./Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DefaultLayout({ children }) {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <Row>
          <Col lg="4">
            <Sidebar />
          </Col>
          <Col lg="8">
            <div className="content">{children}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DefaultLayout;
