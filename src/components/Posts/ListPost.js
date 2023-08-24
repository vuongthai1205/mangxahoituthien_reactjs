import Row from "react-bootstrap/Row";
import { authApi, endpoints } from "../../config/apiConfig";
import { useContext } from "react";
import { MyUserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ItemPost from "./ItemPost";

function ListPost(props) {
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();
  const [showLikesModal, setShowLikesModal] = useState(false);
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
  const openLikesModal = () => {
    setShowLikesModal(true);
  };

  const closeLikesModal = () => {
    setShowLikesModal(false);
  };

  useEffect(() => {
    if (user) {
      // Check if the user is authenticated
      const fetchLikes = async (id) => {
        try {
          const response = await authApi().get(
            `${endpoints["get-like-post"]}${id}/`
          );
          // Update the like status for the specific post
          setPostLikeStatus(id, response.data);
        } catch (error) {
          console.error("An error occurred while fetching likes:", error);
        }
      };

      props.posts.forEach((post) => {
        fetchLikes(post.id);
      });
    }
  }, [props.posts, user]);

  // A state to store like status for each post
  const [postLikes, setPostLikes] = useState({});

  // Function to update the like status for a specific post
  const setPostLikeStatus = (postId, status) => {
    setPostLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: status,
    }));
  };

  

  return (
    <Row xs={1} className="g-4">
      {props.posts.map((post, idx) => {
        const isLiked =postLikes[post.id] || false;
        return (
          <ItemPost
            key={idx}
            post={post}
            isLiked={isLiked}
            xuLyThichBaiViet={xuLyThichBaiViet}
            openLikesModal={openLikesModal}
            showLikesModal={showLikesModal}
            closeLikesModal={closeLikesModal}
          />
        );
      })}
    </Row>
  );
}

export default ListPost;
