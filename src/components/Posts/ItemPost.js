import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MyUserContext } from "../../App";
import CreateAndUpdatePost from "./CreateAndUpdatePost";
import apiConfig, { endpoints } from "../../config/apiConfig";
import DeletePost from "./DeletePost";

function ItemPost({ onPostUpdate, post, xuLyThichBaiViet }) {
  const [user, dispatch] = useContext(MyUserContext);
  const [like, setLike] = useState(false);
  const [action, setAction] = useState(false);

  useEffect(() => {
    const handleLike = () => {
      if (
        user !== null &&
        post.likePost.map((element) => element.username).includes(user.username)
      ) {
        setLike(true);
      } else {
        setLike(false);
      }
    };

    const handleShowAction = () => {
      if (user !== null && post.user.username === user.username) {
        setAction(true);
      } else {
        setAction(false);
      }
    };

    handleShowAction();
    handleLike();
  }, [user, post]);

  const handleLikeClick = () => {
    setLike((prevLike) => !prevLike);
    xuLyThichBaiViet(post.id);
  };

  const [show, setShow] = useState(false);
  const [postItem, setPostItem] = useState({});
  const handleClose = () => setShow(false);

  const handleShow = async (id) => {
    try {
      const response = await apiConfig.get(`${endpoints["posts"]}${id}/`);
      const data = response.data;
      setPostItem(data);
      if (response.status === 200) {
        console.log("getPostById oke");
      } else {
        console.log("error");
      }
    } catch (ex) {
      console.log(ex);
    }
    setShow(true);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  return (
    <Col>
      <Card>
        {action ? (
          <div className="action_post">
            <Button
              variant="success"
              onClick={() => {
                handleShow(post.id);
              }}>
              Sửa
            </Button>
            <CreateAndUpdatePost
              onPostUpdate={onPostUpdate}
              post={postItem}
              showPopup={show}
              closePopup={handleClose}
            />

            <Button variant="danger" onClick={handleShowDelete}>
              Xóa
            </Button>

            <DeletePost
              onPostUpdate={onPostUpdate}
              post={post.id}
              showPopup={showDelete}
              closePopup={handleCloseDelete}
            />
          </div>
        ) : (
          <></>
        )}

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
