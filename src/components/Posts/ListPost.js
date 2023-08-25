import Row from "react-bootstrap/Row";
import { authApi, endpoints } from "../../config/apiConfig";
import { useContext } from "react";
import { MyUserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import iconLoading from "../../assets/images/Loading_icon.gif";
import ItemPost from "./ItemPost";
import { Card, Col, Pagination, Placeholder } from "react-bootstrap";

function ListPost(props) {
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();

  const xuLyThichBaiViet = async (id) => {
    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await authApi().post(
          `${endpoints["like-post"]}${id}/`
        );

        if (response.status === 201) {
          // Liked successfully
          console.log("Liked");
        } else {
          // Couldn't like the post
          console.log("Failed to like");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  let items = [];
  for (let number = 0; number <= props.pages; number++) {
    let h = `/?page=${number}`;
    items.push(
      <Link
        key={number}
        className={`item-pagination ${
          number === parseInt(props.numberPage) ? "active" : ""
        }`}
        to={h}>
        {number === 0 ? "Tất cả" : number}
      </Link>
    );
  }

  if (props.loading === true){
    return (
      <Row xs={1} className="g-4">
        
        <Col>
          <Card>
            <Card.Img alt="" src={iconLoading} />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row xs={1} className="g-4">
      <Col>
        <Pagination>{items}</Pagination>
      </Col>

      {props.posts.map((post, idx) => {
        return (
          <ItemPost key={idx} post={post} xuLyThichBaiViet={xuLyThichBaiViet} />
        );
      })}
    </Row>
  );

  
}

export default ListPost;
