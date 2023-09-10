import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <h4 className="item-sidebar">
        <NavLink
          to={"/post-auction"}>
          Bài viết từ thiện
        </NavLink>
      </h4>
      <h4 className="item-sidebar">
        <NavLink to={"/project-auction"}>Dự án từ thiện</NavLink>
      </h4>
    </>
  );
}

export default Sidebar;
