import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import apiConfig, { endpoints } from '../../config/apiConfig';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  // Sử dụng postId để lấy thông tin chi tiết của bài viết từ API hoặc dữ liệu của bạn
  // Và hiển thị nội dung bài viết ở đây
  useEffect(() => {
    const handleShowPost = async () => {
      try {
        const response = await apiConfig.get(`${endpoints["posts"]}${postId}/`);
        const data = response.data;
        setPost({
          title: data.title,
          content: data.content,
          image: data.image,
        });
        if (response.status === 200) {
          console.log("getPostById oke");
        } else {
          console.log("error");
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    handleShowPost()
  }, [])


  return (
    <div>
      <h2>{post.title}</h2>
    </div>
  );
};

export default PostDetail;
