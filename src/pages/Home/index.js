import CreatePost from "../../components/Posts/CreatePost";
import ListPost from "../../components/Posts/ListPost";
import { useEffect, useState } from "react";
import  { endpoints } from "../../config/apiConfig";
import apiConfig from "../../config/apiConfig";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    apiConfig
      .get(endpoints["posts"])
      .then((response) => {
        const reversedPosts = response.data.reverse();
        setPosts(reversedPosts);
      });
  }, [posts]);

  const handlePostCreated = (newPost) => {
    // Thêm bài viết mới vào danh sách bài viết
    setPosts([newPost, ...posts]);
  };
  return (
    <>
      <CreatePost  onPostCreated={handlePostCreated}/>
      <ListPost posts={posts} />
    </>
  );
}

export default Home;
