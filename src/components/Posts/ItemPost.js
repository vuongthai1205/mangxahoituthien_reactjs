
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function ItemPost({
  post,
  isLiked,
  xuLyThichBaiViet,
  openLikesModal,
  showLikesModal,
  closeLikesModal,
}) {
  const [like, setLike] = useState(isLiked);

  useEffect(() => {
    // Update the state when the prop changes
    setLike(isLiked);
  }, [isLiked]);

  const handleLikeClick = () => {
    setLike((prevLike) => !prevLike);
    // Toggle the like status for the post
    xuLyThichBaiViet(post.id);// Toggle the state using the previous state
    
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
              <Button className="mt-3" variant="info" onClick={openLikesModal}>
                Danh sách người đã thích bài viết
              </Button>
              <Modal show={showLikesModal} onHide={closeLikesModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Danh sách người đã thích bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Display the list of users who liked the post here */}
                  {/* You can map through the list and render user information */}
                </Modal.Body>
              </Modal>
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
