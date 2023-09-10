import { Button, Modal } from "react-bootstrap";
import ItemAuction from "./ItemAuction";

function ListAuction({ listAuction, showPopup, closePopup }) {
  return (
    <>
      <Modal show={showPopup} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Danh sách người đã đấu giá </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listAuction.map((element, id) => {
            return (
              <ItemAuction
                key={id}
                id={element.id}
                winner={element.winnerAuctioned}
                username={element.username}
                price={element.price}
              />
            );
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
