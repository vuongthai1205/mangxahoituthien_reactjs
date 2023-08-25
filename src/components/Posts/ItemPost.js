import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MyUserContext } from "../../App";

function ItemPost({ post, xuLyThichBaiViet }) {
  const [user, dispatch] = useContext(MyUserContext);
  const [like, setLike] = useState(false);

  useEffect(() => {
    // Check if the user is not null and their username is in the list of likes
    if (user !== null && post.likePost.some(item => item.username === user.username)) {
      setLike(true);
    }
  }, [user, post.likePost]); // Depend on user and post.likePost

  const handleLikeClick = () => {
    setLike((prevLike) => !prevLike);
    xuLyThichBaiViet(post.id);
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Row lg={3}>
            <Col>
              <Button
                onClick={handleLikeClick}
                className="mr-3"
                variant={like ? "success" : "info"}>
                {like ? "Đã Thích" : "Thích"}
              </Button>
              <Button className="mt-3" variant="info">
                Danh sách người đã thích bài viết
              </Button>
              {post.likePost.map((item, id) => (
                <h1 key={id}>{item.username}</h1>
              ))}
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
}

export default ItemPost;
