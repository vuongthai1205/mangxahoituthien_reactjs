import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import cookie from "react-cookies";
import Form from "react-bootstrap/Form";
import { MyUserContext } from "../../App";
import apiConfig, { authApi, endpoints } from "../../config/apiConfig";
function Login() {
  const [user, dispatch] = useContext(MyUserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await apiConfig.post(endpoints["login"], {
        username,
        password,
      });
      cookie.save("token", response.data.token);
      let { data } = await authApi().get(endpoints["current-user"]);
      cookie.save("user", data);

      dispatch({
        type: "login",
        payload: data,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (user !== null)
        return <Navigate to="/" />

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Nhập tên đăng nhập"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </Form.Group>
        <Button onClick={handleLogin} variant="primary">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
