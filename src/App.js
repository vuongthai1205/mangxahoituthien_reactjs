import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Fragment, createContext } from "react";
import cookie from "react-cookies"
import { DefaultLayout } from "./components/Layout";
import MyUserReducer from "./reducers/MyUserReducer";
import { useReducer } from "react";

export const MyUserContext = createContext();
function App() {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </MyUserContext.Provider>
  );
}

export default App;
