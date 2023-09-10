import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../config/firebase";
import Image from "react-bootstrap/Image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { authApi, endpoints } from "../../config/apiConfig";
import { useContext } from "react";
import { MyUserContext } from "../../App";
import { useEffect } from "react";

function CreateAndUpdatePost({
  onPostCreated,
  showPopup,
  closePopup,
  post,
  onPostUpdate,
}) {
  const [error, setError] = useState("");
  const [user, dispatch] = useContext(MyUserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [checkAuction, setCheckAuction] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    startPrice: "",
    auctionStatus: checkAuction === true ? 2 : 1 ,
    auctionStartTime: "",
    auctionEndTime: ""
  }); 
  useEffect(() => {
    if (post !== undefined) {
      setFormData((prevData) => ( {
        ...prevData,
        title: post.title,
        content: post.content,
        image: post.image,
        startPrice: checkAuction ?  post.startPrice : 0,
        auctionStatus: checkAuction ? 2 : 1,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        auctionStatus: checkAuction ? 2 : 1,
      }));
    }
  }, [post, checkAuction]);
  

  const isFormDataValid = (data) => {
    if (
      data.title.trim() === "" ||
      data.content.trim() === "" ||
      data.image === ""
    ) {
      setError("Vui lòng điền thông tin");
      return true;
    } else if (data.title.trim() === "") {
      setError("Vui lòng điền tiêu đề");
      return true;
    } else {
      return false;
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const storageRef = getStorage(appFirebase);
      const imageRef = ref(storageRef, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");

              break;
            case "running":
              setLoading(true);
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false);
            setFormData((prevData) => ({
              ...prevData,
              image: downloadURL,
            }));
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // Người dùng chưa xác thực, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return;
    }

    if (isFormDataValid(formData)) {
      // Do not submit if all fields are empty
      return;
    }

    if (post !== undefined) {
      try {
        const response = await authApi().put(
          `${endpoints["posts"]}${post.id}/`,
          formData
        );
        if (response.status === 200) {
          onPostUpdate();
          closePopup();
          setFormData({
            title: "",
            content: "",
            image: "",
            startPrice: "",
          });
          console.log("Post updated successfully");
        } else if (response.status === 500) {
          console.log("Failed to add or update pos");
        } else {
          console.log("You can not permission to edit the post");
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      try {
        const response = await authApi().post(endpoints["posts"], formData);

        if (response.status === 201) {
          onPostCreated();
          closePopup();
          setFormData({
            title: "",
            content: "",
            image: "",
            startPrice: "",
          });
          setError("");
        } else {
          // Xử lý lỗi khi đăng bài viết
        }
      } catch (error) {
        // Xử lý lỗi từ Axios
      }
    }
  };

  const handleCheckAuctionChange = () => {
    setCheckAuction((prevCheck) => !prevCheck);
    
    setFormData((prevData) => ({
      ...prevData,
      startPrice: checkAuction ?  0 : formData.startPrice,
      auctionStatus: checkAuction === true ? 2 : 1,
    }));
  };

  console.log(checkAuction)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={showPopup} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>{post ? "Sửa bài viết" : "Đăng bài viết"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-5 popup_post">
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label>{error}</Form.Label>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    name="title"
                    value={formData.title || ""}
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content || ""}
                    rows={3}
                    placeholder="Nhập nội dung..."
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control required onChange={handleImageChange} type="file" />
                  <Image height={200} src={formData.image} />
                </Form.Group>
                <Form.Group>
                  <Form.Check // prettier-ignore
                    type="switch"
                    className="mb-3"
                    label="Có đấu giá"
                    checked={checkAuction}
                    onChange={handleCheckAuctionChange}
                  />
                </Form.Group>
                {checkAuction === true ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Giá khởi điểm</Form.Label>
                      <Form.Control
                        value={formData.startPrice || ""}
                        onChange={handleInputChange}
                        type="text"
                        name="startPrice"
                        placeholder="Nhập giá khởi điểm"
                      />
                      <Form.Label>Thời gian bắt đầu</Form.Label>
                      <Form.Control 
                        name="auctionStartTime"
                        value={formData.auctionStartTime || ""}
                        onChange={handleInputChange}
                        type="date"
                      />
                      <Form.Label>Thời gian kết thúc</Form.Label>
                      <Form.Control 
                        name="auctionEndTime"
                        value={formData.auctionEndTime || ""}
                        onChange={handleInputChange}
                        type="date"
                      />
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}

                <Button type="submit" disabled={loading}>
                  {loading === true ? "Đang tải" : "Đăng"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateAndUpdatePost;
