import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


function ListPost(props) {
  
  return (
    <Row xs={1} className="g-4">
      {props.posts.map((post, idx) => {
        return (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default ListPost;
