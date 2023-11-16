import "./Header.css";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <NavLink className="header_a" to={"/"}>
          ーーーーーーーーーーーーー
          {/* 東西線沿線・割安物件研究所 */}
        </NavLink>
      </h1>
      <nav class="pc-nav">
        <ul>
          <li className="header_b" href="#">
            <NavLink className="a_st-list" to={"/contact"}>
              CONTACT
            </NavLink>
          </li>
          {/* <li>
            <a className="header_b" href="#">
              コンタクト
            </a>
          </li> */}
          {/* <li>
            <a className="header_b" href="#">
              COMPANY
            </a>
          </li>
          <li>
            <a className="header_b" href="#">
              CONTACT
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
