import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import HeaderOnly from "../components/Layout/HeaderOnly";
import Register from "../pages/Register";
import PostDetail from "../components/Posts/PostDetail";
const publicRoutes = [
  { path: "/", component: Home, title: "Trang chủ" },
  
  { path: "/login", component: Login, layout: HeaderOnly, title: "Đăng nhập" },
  { path: "/register", component: Register, layout: HeaderOnly, title: "Đăng ký" },
];

const privateRoutes = [{ path: "/post/:postId", component: PostDetail, layout: HeaderOnly, },{ path: "/profile", component: Profile, title: "Trang cá nhân" },];

export { publicRoutes, privateRoutes };
