import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MyUserContext } from "../../App";
import CreateAndUpdatePost from "./CreateAndUpdatePost";
import apiConfig, { authApi, endpoints } from "../../config/apiConfig";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";
import ListAuction from "../Auctions/ListAuction";

function ItemPost({ onPostUpdate, post, xuLyThichBaiViet }) {
  const [user, dispatch] = useContext(MyUserContext);
  const [like, setLike] = useState(false);
  const [action, setAction] = useState(false);
  const [listAuction, setListAuction] = useState([])
  const [formPrice, setFormPrice] = useState({
    idPost: post.id,
    price: "",
  });
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

  const [showAuction, setShowAuction] = useState(false);
  const handleCloseAuction = () => {
    setShowAuction(false);
  };

  const handleShowAuction = async (id) => {
    try{
      const response = await authApi().get(`${endpoints["auction"]}${id}/`)
      setListAuction(response.data)
    }
    catch(ex){
      console.log(ex)
    }
    
    setShowAuction(true);
  };

  const handleSubmitStartPrice = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi().post(endpoints["auction"], formPrice);

      if (response.status === 201) {
        console.log("oke");
      } else {
        console.log("khong thanh cong");
      }
    } catch (ex) {
      if (ex.response.status === 409) {
        console.log("xung dot");
      } else {
        console.log("khong thanh cong");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPrice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

            <Button variant="info" onClick={() => {
              handleShowAuction(post.id)
            }}>
              Danh sách người đã đấu giá
            </Button>

            <ListAuction listAuction={listAuction} showPopup={showAuction}
              closePopup={handleCloseAuction} />
          </div>
        ) : (
          <></>
        )}

        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
          {user != null && post.auctionStatus.id == 2 ? (
            <>
              <Card.Text>Giá Khởi điểm: {post.startPrice}</Card.Text>
              <Form onSubmit={handleSubmitStartPrice} className="my-3">
                <Form.Group>
                  <Form.Control
                    pattern="[0-9]*"
                    type="text"
                    value={formPrice.price}
                    name="price"
                    onChange={handleInputChange}
                    placeholder="Nhập giá bạn muốn đấu giá (Vui lòng lớn hơn giá khởi điểm)"
                  />
                </Form.Group>
                <Button className="mt-2" type="submit">
                  Gửi
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}

          <Row lg={3}>
            <Col>
              <Button
                onClick={handleLikeClick}
                className="mr-3"
                variant={like ? "success" : "info"}>
                {like ? "Đã Thích" : "Thích"}
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
