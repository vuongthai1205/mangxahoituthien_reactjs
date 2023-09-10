import { Button } from "react-bootstrap";
import CreateAndUpdatePost from "../../components/Posts/CreateAndUpdatePost";
import ListPost from "../../components/Posts/ListPost";
import { useState } from "react";

function PostAuction() {
  const [count, setCount] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handlePostCreated = () => {
    setCount(count + 1);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
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

export default PostAuction;
