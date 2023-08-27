import { Button, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../config/apiConfig";
import { useState } from "react";

function DeletePost({onPostUpdate, post, showPopup, closePopup }) {
  const [error, setError] = useState("")
  const handleDeletePost = async (id) => {
    try{

      const response = await authApi().delete(`${endpoints["posts"]}${id}/`)
      if(response.status === 200){
        onPostUpdate()
        console.log("delete oke")
        closePopup()
      }
      else {
        setError("Có lỗi xảy ra bạn chưa xóa được bài viết")
        console.log("delete not oke")
      }
    }
    catch(ex){
      console.log(ex)
    }

  }

  return (
    <>
      <Modal show={showPopup} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body> <span>{error}</span>
          Bạn hãy xác nhận lại lần nữa là có chắn chắn xóa bài viết không</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePopup}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() =>{handleDeletePost(post)}}>
            Xóa bài viết
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePost;
