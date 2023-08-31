import { Button, Modal } from "react-bootstrap";

function ListAuction({ listAuction, showPopup, closePopup }) {
  return (
    <>
      <Modal show={showPopup} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Danh sách người đã đấu giá </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listAuction.map((element, id) => {
            return <h6 key={id}>{element.username} : {element.price}</h6>;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePopup}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListAuction;
