import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import appFirebase from "../../config/firebase";
import Image from "react-bootstrap/Image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { endpoints } from "../../config/apiConfig";
import apiConfig from "../../config/apiConfig";
function Register() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const storageRef = getStorage(appFirebase);
      const imageRef = ref(storageRef, `avatars/${image.name}`);
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
              avatar: downloadURL,
            }));
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("avatar", formData.avatar);
    try {
      const response = await apiConfig.post(
        endpoints["register"],
        formDataToSend,{
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        }
      );

      if (response.status === 201) {
        setLoading(true);
        // Handle successful registration
        navigate("/login");
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
    <div className="container mt-4">
      <h2>Trang đăng ký</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Họ</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="avatar">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>
        <Form.Group controlId="avatar">
          <Image height={200} src={formData.avatar} />
        </Form.Group>

        <Button
          disabled={isLoading}
          className="mt-2"
          variant="primary"
          type="submit">
          {isLoading ? "Đang tải" : "Đăng ký"}
        </Button>
        <p>
          Nếu bạn đã có tài khoản <Link to="/login">hãy đăng nhập</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
