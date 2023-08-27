import CreateAndUpdatePost from "../../components/Posts/CreateAndUpdatePost";
import ListPost from "../../components/Posts/ListPost";
import {useState } from "react";
import { Button } from "react-bootstrap";
function Home() {
  const [count, setCount] = useState(0);

  const handlePostCreated = () => {
    setCount(count + 1);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="my-4" variant="primary" onClick={handleShow}>
        Tạo bài viết
      </Button>
      <CreateAndUpdatePost
        onPostCreated={handlePostCreated}
        showPopup={show}
        closePopup={handleClose}
      />
      <ListPost onPostCreated={handlePostCreated} onCount={count} />
    </>
  );
}

export default Home;
