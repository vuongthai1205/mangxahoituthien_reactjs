import React, { useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import CreateAndUpdatePost from "../../components/Posts/CreateAndUpdatePost";
import ListPost from "../../components/Posts/ListPost";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../config/apiConfig";

function Profile() {
  const [count, setCount] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [q] = useSearchParams();
  const [user , setUser] = useState({})
  let idUser = q.get("iduser")
  console.log(idUser)
  const handlePostCreated = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (idUser !== null && idUser !== "") {
      const handleGetUser = async () => {
        const response = await authApi().get(`${endpoints["user"]}${idUser}/`)
        setUser(response.data)

      }
      handleGetUser()
    }
    
  }, [idUser])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <h2>Trang cá nhân</h2>
        <div>
          {user ? (
            <>
              <img height={200} src={user.avatar} alt="User Avatar" />
              <p>
                Họ và tên:  {user.lastName ? user.lastName : "Chưa cập nhật"} {user.firstName?user.firstName: "Chưa cập nhật"}
              </p>
              <p>
                Ngày sinh: {user.dateOfBirth ? user.dateOfBirth :"Chưa cập nhật"}
              </p>
              <p>
                Giới tính: {user.gender ?user.gender === 1 ?"Nam"  : "Nữ" : "Chưa cập nhật"}
              </p>
              <p>
               Email: {user.email? user.email : "Chưa cập nhật"}
              </p>
              <p>
               Điện thoại: {user.phone? user.phone : "Chưa cập nhật"}
              </p>
            </>
          ) : (
            <>
              <p>Hãy đăng nhập</p>
            </>
          )}
        </div>
      </div>
      <Button
        className="my-4"
        variant="primary"
        onClick={() => {
          handleShow();
          setIsCreatingPost(true); // Set isEditing to true when the button is clicked
        }}>
        Tạo bài viết
      </Button>

      {isCreatingPost && (
        <CreateAndUpdatePost
          onPostCreated={handlePostCreated}
          showPopup={show}
          closePopup={handleClose}
        />
      )}

      <ListPost onPostCreated={handlePostCreated} onCount={count} />
    </>
  );
}

export default Profile;
