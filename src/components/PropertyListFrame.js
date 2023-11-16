import { Outlet } from "react-router-dom";
import "./Home/Home.css";

function PropertyListFrame() {
  return (
    <div className="contents_box">
      <Outlet />
      <h1>frame</h1>
    </div>
  );
}

export default PropertyListFrame;
