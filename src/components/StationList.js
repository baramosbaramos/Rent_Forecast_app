// import "./Home.css";
import { NavLink, Link } from "react-router-dom";

function StationList(props) {
  return (
    <>
      <div className="st_list_block">
        <ul className="ul_st-list">
          {props.station_list.map((station) => (
            <li className="li_st-list">
              <NavLink
                className="a_st-list"
                to={`/properties/tozaisen/${station.id}`}
              >
                {station.name}駅の物件一覧
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default StationList;
