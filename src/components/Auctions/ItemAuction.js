import { Button, Spinner } from "react-bootstrap";
import { authApi, endpoints } from "../../config/apiConfig";
import { useState } from "react"; // Import useState hook

function ItemAuction(auction) {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleWinnerAuction = async (id) => {
    setIsLoading(true); // Set loading to true while waiting for the response
    try {
      const response = await authApi().put(`${endpoints["auction"]}${id}/`);
      console.log(response.data);
      setIsLoading(false); // Set loading back to false after the response is received
    } catch (ex) {
      console.log(ex);
      setIsLoading(false); // Set loading back to false in case of an error
    }
  };

  console.log(auction.winner);

  return (
    <>
      <h6>
        {auction.username}: {auction.price}
      </h6>
      <Button
        className="mb-2"
        onClick={() => {
          handleWinnerAuction(auction.id);
        }}
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? (
          <Spinner animation="border" size="sm" /> // Display a loading spinner
        ) : !auction.winner ? (
          "Chọn người chiến thắng"
        ) : (
          "Người chiến thắng"
        )}
      </Button>
    </>
  );
}

export default ItemAuction;
