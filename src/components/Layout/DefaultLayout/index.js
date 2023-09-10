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
          <Col lg="3">
            <Sidebar />
          </Col>
          <Col lg="9">
            <div className="content">{children}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DefaultLayout;
