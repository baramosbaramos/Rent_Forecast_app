import "./Home.css";
import st_list from "../../st_list";
import { NavLink, Link } from "react-router-dom";

function Home() {
  const station_list = st_list;

  return (
    <div className="contents_box">
      <div className="home_block">
        <article>
          <h1>このサイトについて</h1>
          <p>
            都内地下鉄の賃貸物件情報を収集し、AIによって一般的な相場より賃料が安い、割安な物件を算出しています。毎日午前9時に更新しています。
          </p>
        </article>
        <article>
          <h1>CONTACT</h1>
          <p>連絡先はこちら → sousou@gmail.com</p>
          <p>当サイトに関しまして要望などがありましたらご連絡ください。</p>
        </article>
      </div>

      <div className="st_list_block_home">
        <ul className="ul_st-list_home">
          {/* {station_list.map((station) => (
            <li className="li_st-list_home">
              <NavLink
                className="a_st-list_home"
                to={`/properties/tozaisen/${station.id}`}
              >
                {station.name}駅の物件一覧
              </NavLink>
            </li>
          ))} */}
          <li className="li_st-list_home">
              <NavLink
                className="a_st-list_home"
                to={"/properties/tozaisen/ek_27280"}
              >
                東西線沿線の物件一覧
              </NavLink>
              </li>
              <li className="li_st-list_home">
              <NavLink
                className="a_st-list_home"
                to={"/properties/hanzomonsen/ek_07240"}
              >
                半蔵門線沿線の物件一覧
              </NavLink>
              </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
