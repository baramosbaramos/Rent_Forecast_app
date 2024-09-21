import "./Header.css";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <NavLink className="header_a" to={"/"}>
          {/* --- */}
          <span class="header_kai">毎日更新！東京２３区の</span>
          <span class="header_kai">穴場賃貸物件をまとめるサイト</span>
        </NavLink>
      </h1>
      <nav class="pc-nav">
        <ul>
          <li className="header_b contact" href="#">
            <NavLink className="a_st-list contact" to={"/contact"}>
              運営者情報
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
