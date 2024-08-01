import "./Header.css";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <NavLink className="header_a" to={"/"}>
          毎日更新！都内地下鉄の穴場物件情報をまとめるサイト
        </NavLink>
      </h1>
      <nav class="pc-nav">
        <ul>
          <li className="header_b" href="#">
            <NavLink className="a_st-list" to={"/contact"}>
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
