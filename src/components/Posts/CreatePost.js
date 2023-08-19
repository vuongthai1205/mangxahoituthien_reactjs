import { Button, Col, Form, Row } from "react-bootstrap";
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
function CreatePost({ onPostCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

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

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("image", formData.image);
    try {
      const response = await authApi().post(
        endpoints["create-post"],
        formDataToSend
      );

      if (response.status === 201) {
        onPostCreated(formDataToSend);
        console.log("oke");
        // Handle successful registration
        navigate("/");
      } else {
        // Handle registration error
      }
    } catch (error) {
      // Handle Axios error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Row className="mb-5">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                type="text"
                placeholder="Nhập tiêu đề..."
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={formData.content}
                rows={3}
                placeholder="Nhập nội dung..."
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control onChange={handleImageChange} type="file" />
              <Image height={200} src={formData.image} roundedCircle />
            </Form.Group>
            <Button type="submit">Đăng bài</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CreatePost;
