import React, { useState, useEffect } from "react";
import "./Properties.css";
import axios from "axios";
import st_list from "../../st_list";
import PropertyList from "../PropertyList/PropertyList";
import StationList from "../StationList";
import { useParams } from "react-router-dom";

function PropetiesByStation() {
  const { stationID = "" } = useParams();

  const [property_list, setProperty_list] = useState([]);
  const [station_name, setStation_name] = useState("中野");

  const [station_code, setStation_code] = useState(stationID);
  const [search_code, setSearch_code] = useState("");

  const [total_cost, setTotal_cost] = useState("1");
  const [search_cost, setSearch_cost] = useState("1");
  const [station, setStation] = useState({});

  const station_list = st_list;

  const total_cost_list = [
    ["10万円以下", "1"],
    ["10万円以上20万円以下", "2"],
    ["20万円以上", "3"],
  ];

  const name = "";

  function handleChangeStationCode(e) {
    setSearch_code(e.target.value);
  }

  function handleChangeTotalCost(e) {
    setSearch_cost(e.target.value);
  }

  // .get(baseURL, {
  //   params: {
  //     code: station_code,
  //     cost: total_cost,
  //   },
  // })

  const baseURL = "/search";

  function handleSubmit(e) {
    e.preventDefault();

    if (search_code !== "") setStation_code(search_code);
    if (search_cost !== "") setTotal_cost(search_cost);
    console.log("handle submited");
    console.log("search_code > " + search_code);
    // axios
    //   .get(baseURL + `?code=${station_code}&cost=${total_cost}`)
    //   .then((response) => {
    //     setProperty_list(response.data);
    //     const station = station_list.filter(
    //       (station) => station.id == station_code
    //     );
    //   })
    //   .catch((error) => console.error(error));

    // station_list.map((station) => {
    //   if (station.id === station_code) {
    //     setStation_name(station.name);
    //   }
    // });
  }

  useEffect(() => {
    setStation_code(stationID);
  }, [stationID]);

  
  useEffect(() => {
    axios
      .get(baseURL + `?code=${station_code}&cost=${total_cost}`)
      .then((response) => {
        setProperty_list(response.data);
      })
      .catch((error) => console.error(error));
    station_list.map((station) => {
      if (station.id === station_code) {
        setStation_name(station.name);
      }
    });
  }, [station_code, total_cost]);

  if (!property_list) return "No post!";

  return (
    <div>
      <div className="contents_box">
        <div className="search_block2">
          <p className="search_title">検索条件変更</p>

          <form method="get" onSubmit={handleSubmit}>
            <div className="station_block">
              <p className="block_title">最寄駅</p>
              <label class="selectbox-002">
                <select onChange={handleChangeStationCode}>
                  {station_list.map((station) => {
                    if (station.id === station_code) {
                      return (
                        <option value={station.id} selected>
                          {station.name}
                        </option>
                      );
                    } else {
                      return <option value={station.id}>{station.name}</option>;
                    }
                  })}
                  ;
                </select>
              </label>
            </div>

            <div className="access_time_block">
              <p className="block_title"> 賃料</p>
              <label class="selectbox-002">
                <select onChange={handleChangeTotalCost}>
                  {total_cost_list.map((cost) => (
                    <option value={cost[1]}>{cost[0]}</option>
                  ))}
                  ;
                </select>
              </label>
            </div>

            <button className="search_button" type="submit">
              この条件で検索する
            </button>
          </form>
        </div>

        <div className="properties_content">
          <PropertyList
            property_list={property_list}
            station_name={station_name}
          />
        </div>

        <div className="right_div">
          <div className="search_block1">
            <p className="search_title">検索条件変更</p>

            <form method="get" onSubmit={handleSubmit}>
              <div className="station_block">
                <p className="block_title">最寄駅</p>
                <label class="selectbox-002">
                  <select onChange={handleChangeStationCode}>
                    {station_list.map((station) => {
                      if (station.id === station_code) {
                        return (
                          <option value={station.id} selected>
                            {station.name}
                          </option>
                        );
                      } else {
                        return (
                          <option value={station.id}>{station.name}</option>
                        );
                      }
                    })}
                    ;
                  </select>
                </label>
              </div>

              <div className="access_time_block">
                <p className="block_title"> 賃料</p>
                <label class="selectbox-002">
                  <select onChange={handleChangeTotalCost}>
                    {total_cost_list.map((cost) => (
                      <option value={cost[1]}>{cost[0]}</option>
                    ))}
                    ;
                  </select>
                </label>
              </div>

              <button className="search_button" type="submit">
                この条件で検索する
              </button>
            </form>
          </div>

          <div className="website_block">
            <p className="website_title">このサイトについて</p>
            <p className="website_explain">
              東京メトロ東西線沿線の賃貸物件情報を収集し、AIによって一般的な相場より賃料が安い、割安な物件を算出しています。毎日午前9時に更新しています。
            </p>
          </div>
          <StationList station_list={station_list} />
          
        </div>
      </div>
    </div>
  );
}

export default PropetiesByStation;
