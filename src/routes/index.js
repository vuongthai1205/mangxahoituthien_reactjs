import Home from "../pages/Home"
import Profile from "../pages/Profile";
import Login from "../pages/Login"
import HeaderOnly from   "../components/Layout/HeaderOnly"
import Register from "../pages/Register";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/login', component: Login , layout: HeaderOnly},
    { path: '/register', component: Register , layout: HeaderOnly},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };