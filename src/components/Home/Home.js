import "./Home.css";
import st_list from "../../st_list";
import { NavLink, Link } from "react-router-dom";

function Home() {
  const station_list = st_list;

  return (
    <div className="contents_box">
      <div className="home_block">
        <div class="box25">
          <article>
            <h1>このサイトについて</h1>
            <p>
              東京メトロ沿線のすべての賃貸物件情報をAIが自動で収集し、一般的な賃料相場より安くお得な物件を表示しています。毎日午前9時に更新しています。
            </p>
          </article>
          <article>
            <h1>CONTACT</h1>
            <p>連絡先はこちら → sousou@gmail.com</p>
            <p>当サイトに関しましてご要望などがありましたらご連絡ください。</p>
          </article>
        </div>
      </div>

      <div className="st_list_block_home">
        <p className="st_list_block_title">▼路線から探す</p>
        <ul className="ul_st-list_home">
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/tozaisen/ek_27280"}
            >
              東京メトロ 東西線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/marunouchisen/ek_06640"}
            >
              東京メトロ 丸ノ内線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/hanzomonsen/ek_07240"}
            >
              東京メトロ 半蔵門線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/yurakuchosen/ek_41690"}
            >
              東京メトロ 有楽町線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/ginzasen/ek_17640"}
            >
              東京メトロ 銀座線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/chiyodasen/ek_41290"}
            >
              東京メトロ 千代田線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/hibiyasen/ek_27580"}
            >
              東京メトロ 日比谷線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/nanbokusen/ek_39110"}
            >
              東京メトロ 南北線の物件
            </NavLink>
          </li>
          <li className="li_st-list_home">
            <NavLink
              className="a_st-list_home"
              to={"/properties/hukutoshinsen/ek_41690"}
            >
              東京メトロ 副都心線の物件
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
