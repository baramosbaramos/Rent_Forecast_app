import React, { useState, useEffect } from "react";
import "./Properties.css";
import axios from "axios";
import rs_list from "../../st_list";
import PropertyList from "../PropertyList/PropertyList";
import StationList from "../StationList";
import { useParams } from "react-router-dom";

function PropetiesByStation(props) {
  const { stationID = "" } = useParams();

  const [property_list, setProperty_list] = useState([]);
  const [station_name, setStation_name] = useState("中野");

  const [station_code, setStation_code] = useState(stationID);
  const [search_code, setSearch_code] = useState("");

  const [total_cost, setTotal_cost] = useState("3");
  const [search_cost, setSearch_cost] = useState("3");
  // const [station, setStation] = useState({});
  const [rosen_name, setRosen_name] = useState("東西線");
  const [station_list, setStation_list] = useState([]);

  const rosen_list = ["東西線", "半蔵門線"];

  // let rs_obj = rs_list.find((rs) => rs.name === props.rosen);
  // setStation_list(rs_obj.stations);

  const total_cost_list = [
    ["〜70,000円", "1"],
    ["70,000円〜100,000円", "2"],
    ["100,000円〜150,000円", "3"],
    ["150,000円〜200,000円", "4"],
    ["200,000円〜250,000円", "5"],
    ["250,000円〜300,000円", "6"],
    ["300,000円〜350,000円", "7"],
    ["350,000円〜400,000円", "8"],
    ["400,000円〜", "9"],
  ];

  const name = "";

  function handleChangeRosenName(e) {
    setRosen_name(e.target.value);
  }

  // search_codeを更新　→　検索ボタンを押したときにsetStation_codeを実行する　→ useEffectでAPIリクエスト
  function handleChangeStationCode(e) {
    setSearch_code(e.target.value);
  }

  // search_costを更新　→　検索ボタンを押したときにsetTotal_costを実行する　→ useEffectでAPIリクエスト
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
  }
  // 初回＋stationID更新時に実行
  useEffect(() => {
    setStation_code(stationID);
  }, [stationID]);

  // 初回＋rosen_name更新時に実行
  useEffect(() => {
    let rs_obj = rs_list.find((rs) => rs.name === rosen_name);
    setStation_list(rs_obj.stations);
  }, [rosen_name]);

  // 初回レンダリング時のみ実行
  useEffect(() => {
    setRosen_name(props.rosen);
    let rs_obj = rs_list.find((rs) => rs.name === props.rosen);
    setStation_list(rs_obj.stations);
    // console.log(props.rosen);
    // console.log(station_list);
  }, []);

  // APIサーバーへのリクエスト（初回レンダリング時＋検索結果実行時）
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
        {/* 1200px以下の時に表示する */}
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
                  {total_cost_list.map((cost) => {
                    if (cost[1] == total_cost) {
                      return (
                        <option value={cost[1]} selected>
                          {cost[0]}
                        </option>
                      );
                    } else {
                      return <option value={cost[1]}>{cost[0]}</option>;
                    }
                  })}
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
          {/* 1200px以上の時に表示する */}
          <div className="search_block1">
            <p className="search_title">検索条件変更</p>

            <form method="get" onSubmit={handleSubmit}>
              <div className="station_block">
                <p className="block_title">路線</p>
                <label class="selectbox-002">
                  <select onChange={handleChangeRosenName}>
                    {rosen_list.map((rosen) => {
                      if (rosen === rosen_name) {
                        return <option selected>{rosen}</option>;
                      } else {
                        return <option>{rosen}</option>;
                      }
                    })}
                    ;
                  </select>
                </label>
              </div>
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
                    {total_cost_list.map((cost) => {
                      if (cost[1] == total_cost) {
                        return (
                          <option value={cost[1]} selected>
                            {cost[0]}
                          </option>
                        );
                      } else {
                        return <option value={cost[1]}>{cost[0]}</option>;
                      }
                    })}
                    ;
                  </select>
                </label>
                <label class="selectbox-002">
                  <select onChange={handleChangeTotalCost}>
                    {total_cost_list.map((cost) => {
                      if (cost[1] == total_cost) {
                        return (
                          <option value={cost[1]} selected>
                            {cost[0]}
                          </option>
                        );
                      } else {
                        return <option value={cost[1]}>{cost[0]}</option>;
                      }
                    })}
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
