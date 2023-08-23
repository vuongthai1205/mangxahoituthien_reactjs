import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { authApi, endpoints } from "../../config/apiConfig";

function ListPost(props) {
  const xuLyThichBaiViet = async (id) => {
    try {
      const response = await authApi().post(`${endpoints["like-post"]}${id}/`);

      if (response.status === 201) {
        // Liked successfully
        console.log("Liked");
      } else {
        // Couldn't like the post
        console.log("Failed to like");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
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
                <Row lg={3}>
                  <Col>
                    <Button
                      onClick={() => xuLyThichBaiViet(post.id)}
                      className="mr-3"
                      variant="info">
                      Thích
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="secondary">Bình luận</Button>
                  </Col>
                  <Col>
                    <Button variant="success">Chia sẻ</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default ListPost;
