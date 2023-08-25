import CreatePost from "../../components/Posts/CreatePost";
import ListPost from "../../components/Posts/ListPost";
import { useEffect, useState } from "react";
import { endpoints } from "../../config/apiConfig";
import apiConfig from "../../config/apiConfig";
import { useSearchParams } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q] = useSearchParams();
  useEffect(() => {
    const renderListPost = () => {
      try {
        let e = endpoints["posts"];
        let page = q.get("page");

        if (page !== null && page !== "") {
          e = `${e}?page=${page}`;
        } else {
          let kw = q.get("kw");
          if (kw !== null && kw !== "") e = `${e}?kw=${kw}`;
        }

        apiConfig.get(e).then((response) => {
          setLoading(false)
          const reversedPosts = response.data.reverse();
          setPosts(reversedPosts);
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
  }, [count, q]);

  const handlePostCreated = (newPost) => {
    // Thêm bài viết mới vào danh sách bài viết
    setPosts([newPost, ...posts]);
    setCount(count + 1);
  };
  return (
    <>
      <CreatePost onPostCreated={handlePostCreated} />
      <ListPost loading={loading} posts={posts} pages={pages} numberPage={q.get("page")} />
    </>
  );
}

export default Home;
