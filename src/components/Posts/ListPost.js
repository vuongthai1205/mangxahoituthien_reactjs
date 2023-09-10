import Row from "react-bootstrap/Row";
import { authApi, endpoints } from "../../config/apiConfig";
import { useContext } from "react";
import { MyUserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import iconLoading from "../../assets/images/Loading_icon.gif";
import ItemPost from "./ItemPost";
import { Card, Col, Pagination, Placeholder } from "react-bootstrap";

import { useEffect, useState } from "react";

import apiConfig from "../../config/apiConfig";
import { useSearchParams } from "react-router-dom";

function ListPost(props) {
  const [loading, setLoading] = useState(true);
  const [q] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const renderListPost = () => {
      try {
        let e = endpoints["posts"];
        let page = q.get("page");
        let kw = q.get("kw");
        let iduser= q.get("iduser")
        if (page !== null && page !== "") {
          e = `${e}?page=${page}`;
        } else if (kw !== null && kw !== "") {
          e = `${e}?kw=${kw}`;
        }else if (iduser !== null && iduser !== "") {
          e = `${e}?iduser=${iduser}`;
        } else {
          e = `${e}?page=1`;
        }

        apiConfig.get(`${e}`).then((response) => {
          setLoading(false);
          setPosts(response.data);
        });
      } catch (ex) {
        console.log(ex);
      }
    };
    const renderPageSize = () => {
      apiConfig.get(endpoints["get-count-pages"]).then((response) => {
        const pagesReponse = response.data;
        setPages(pagesReponse);
      });
    };
    renderPageSize();
    renderListPost();
  }, [props.onCount, q]);

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
  for (let number = 1; number <= pages; number++) {
    let h = `/post-auction/?page=${number}`;
    items.push(
      <Link
        key={number}
        className={`item-pagination ${
          number === parseInt(q.get("page")) ? "active" : ""
        }`}
        to={h}>
        {number}
      </Link>
    );
  }

  if (loading === true) {
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
      {posts.map((post, idx) => {
        return (
          <ItemPost
            onPostUpdate={props.onPostCreated}
            key={idx}
            post={post}
            xuLyThichBaiViet={xuLyThichBaiViet}
          />
        );
      })}
      <Col>
        <Pagination>{items}</Pagination>
      </Col>
    </Row>
  );
}

export default ListPost;
