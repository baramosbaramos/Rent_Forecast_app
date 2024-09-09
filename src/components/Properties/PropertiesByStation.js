import React, { useState, useEffect } from "react";
import "./Properties.css";
import axios from "axios";
import rs_list from "../../st_list";
import { MIN_COST_LIST, MAX_COST_LIST } from "./costList";
import { MIN_SPACE_LIST, MAX_SPACE_LIST } from "./spaceList";
import { MAX_CONSTRUCTION_AGE_LIST } from "./constructionAgeList";
import { MAX_ACCESS_TIME_LIST } from "./accessTimeList";

import PropertyList from "../PropertyList/PropertyList";
import StationList from "../StationList";
import { useParams } from "react-router-dom";

function PropetiesByStation(props) {
  // URLの末尾から切り出したstation_code
  const { stationID = "" } = useParams();

  const [station_name, setStation_name] = useState("中野");

  // プルダウン選択時に一時的に格納される変数
  const [rosen_temp_name, setRosen_temp_name] = useState(props.rosen);
  const [search_code, setSearch_code] = useState("");
  const [min_temp_cost, setMin_temp_cost] = useState("0");
  const [max_temp_cost, setMax_temp_cost] = useState("10000000");
  const [min_temp_space, setMin_temp_space] = useState("0");
  const [max_temp_space, setMax_temp_space] = useState("1000");
  const [max_temp_construction_age, setmax_temp_construction_age] =
    useState("100");
  const [max_temp_access_time, setMax_temp_access_time] = useState("100");

  // APIリクエスト時に使用される変数
  const [station_code, setStation_code] = useState(stationID);
  const [min_search_cost, setMin_search_cost] = useState("0");
  const [max_search_cost, setMax_search_cost] = useState("10000000");
  const [min_search_space, setMin_search_space] = useState("0");
  const [max_search_space, setMax_search_space] = useState("1000");
  const [max_search_construction_age, setMax_search_construction_age] =
    useState("100");
  const [max_search_access_time, setMax_search_access_time] = useState("100");
  const [rosen_name, setRosen_name] = useState(props.rosen);
  const [station_list, setStation_list] = useState([]);

  // APIから受け取ったデータを格納するリスト
  const [property_list, setProperty_list] = useState([]);

  const rosen_list = [
    "東京メトロ東西線",
    "東京メトロ丸ノ内線",
    "東京メトロ半蔵門線",
    "東京メトロ有楽町線",
    "東京メトロ銀座線",
    "東京メトロ千代田線",
    "東京メトロ日比谷線",
    "東京メトロ南北線",
    "東京メトロ副都心線",
  ];

  const min_cost_list = MIN_COST_LIST;
  const max_cost_list = MAX_COST_LIST;
  const min_space_list = MIN_SPACE_LIST;
  const max_space_list = MAX_SPACE_LIST;
  const max_construction_age_list = MAX_CONSTRUCTION_AGE_LIST;
  const max_access_time_list = MAX_ACCESS_TIME_LIST;
  // const name = "";

  function handleChangeRosenName(e) {
    setRosen_temp_name(e.target.value);
  }

  // ここでプルダウンを変更したときにsearch_codeを更新
  // →　検索ボタンを押したときに、handleChangeSubmit関数がsetStation_codeを実行する
  // →  useEffectが更新を検知しAPIリクエスト
  function handleChangeSearchCode(e) {
    setSearch_code(e.target.value);
  }

  // search_costを更新　→　検索ボタンを押したときにsetTotal_costを実行する　→ useEffectが更新を検知しAPIリクエスト
  // function handleChangeTotalCost(e) {
  //   setSearch_cost(e.target.value);
  // }

  function handleChangeMInCost(e) {
    setMin_temp_cost(e.target.value);
  }
  function handleChangeMaxCost(e) {
    setMax_temp_cost(e.target.value);
  }

  function handleChangeMInSpace(e) {
    setMin_temp_space(e.target.value);
  }
  function handleChangeMaxSpace(e) {
    setMax_temp_space(e.target.value);
  }

  function handleChangeMaxConstructionAge(e) {
    setmax_temp_construction_age(e.target.value);
  }

  function handleChangeMaxAccessTime(e) {
    setMax_temp_access_time(e.target.value);
  }

  const baseURL = "/search";

  // 検索ボタンを押下するとstation_codeとtotal_costを更新し、useEffectが更新を検知してAPIリクエストする。
  function handleSubmit(e) {
    e.preventDefault();
    if (rosen_temp_name !== "") setRosen_name(rosen_temp_name);
    if (search_code !== "") setStation_code(search_code);
    // if (search_cost !== "") setTotal_cost(search_cost);
    if (max_temp_cost !== "") setMax_search_cost(max_temp_cost);
    if (min_temp_cost !== "") setMin_search_cost(min_temp_cost);
    if (max_temp_space !== "") setMax_search_space(max_temp_space);
    if (min_temp_space !== "") setMin_search_space(min_temp_space);
    if (max_temp_construction_age !== "")
      setMax_search_construction_age(max_temp_construction_age);
    if (max_temp_access_time !== "")
      setMax_search_access_time(max_temp_access_time);
  }

  // 初回＋stationIDが更新されたら、station_codeを更新
  useEffect(() => {
    setStation_code(stationID);
  }, [stationID]);

  // 初回＋rosen_temp_nameが更新されたら、station_listとsearch_codeを更新
  useEffect(() => {
    let rs_obj = rs_list.find((rs) => rs.name === rosen_temp_name);
    setStation_list(rs_obj.stations);
    // console.log("ここです");
    // console.log(rs_obj.stations[0].id);
    setSearch_code(rs_obj.stations[0].id);
  }, [rosen_temp_name]);

  useEffect(() => {
    station_list.map((station) => {
      if (station.id === station_code) {
        setStation_name(station.name);
      }
    });
  }, [station_list]);

  // APIサーバーへのリクエスト（初回レンダリング時＋検索結果実行時）
  useEffect(() => {
    axios
      // .get(baseURL + `?code=${station_code}&cost=${total_cost}`)
      .get(
        baseURL +
          `?code=${station_code}&mincost=${min_search_cost}&maxcost=${max_search_cost}&minspace=${min_search_space}&maxspace=${max_search_space}&maxage=${max_search_construction_age}&maxtime=${max_search_access_time}`
      )
      .then((response) => {
        setProperty_list(response.data);
      })
      .catch((error) => console.error(error));
    station_list.map((station) => {
      if (station.id == station_code) {
        setStation_name(station.name);
      }
    });
  }, [
    station_code,
    min_search_cost,
    max_search_cost,
    min_search_space,
    max_search_space,
    max_search_construction_age,
    max_search_access_time,
  ]);

  
  if (!property_list) return "No post!";

  return (
    <div>
      <div className="contents_box">
        {/* 520px以上の時に表示する */}
        <div className="search_block3">
          <p className="search_title">検索条件変更</p>

          <form method="get" onSubmit={handleSubmit}>
            <p className="block_title">路線</p>
            <div className="station_block">
              <label class="selectbox-002">
                <select onChange={handleChangeRosenName}>
                  {rosen_list.map((rosen) => {
                    if (rosen === rosen_temp_name) {
                      return <option selected>{rosen}</option>;
                    } else {
                      return <option>{rosen}</option>;
                    }
                  })}
                  ;
                </select>
              </label>
            </div>
            <p className="block_title">最寄駅</p>
            <div className="station_block">
              <label class="selectbox-002">
                <select onChange={handleChangeSearchCode}>
                  {station_list.map((station) => {
                    if (station.id === search_code) {
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

            <div>
              <p className="sub_block_title">賃料</p>
              <div className="double_form_block">
                <label class="selectbox-003">
                  <select onChange={handleChangeMInCost}>
                    {min_cost_list.map((cost) => {
                      if (cost[1] == min_search_cost) {
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
                <label class="selectbox-003">
                  <select onChange={handleChangeMaxCost}>
                    {max_cost_list.map((cost) => {
                      if (cost[1] == max_search_cost) {
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
            </div>
            <p className="sub_block_title">占有面積</p>
            <div className="double_form_block">
              <label class="selectbox-003">
                <select onChange={handleChangeMInSpace}>
                  {min_space_list.map((space) => {
                    if (space[1] == min_search_space) {
                      return (
                        <option value={space[1]} selected>
                          {space[0]}
                        </option>
                      );
                    } else {
                      return <option value={space[1]}>{space[0]}</option>;
                    }
                  })}
                  ;
                </select>
              </label>
              <label class="selectbox-003">
                <select onChange={handleChangeMaxSpace}>
                  {max_space_list.map((space) => {
                    if (space[1] == max_search_space) {
                      return (
                        <option value={space[1]} selected>
                          {space[0]}
                        </option>
                      );
                    } else {
                      return <option value={space[1]}>{space[0]}</option>;
                    }
                  })}
                  ;
                </select>
              </label>
            </div>
            <p className="sub_block_title">築年数</p>
            <div className="double_form_block">
              <label class="selectbox-003">
                <select onChange={handleChangeMaxConstructionAge}>
                  {max_construction_age_list.map((age) => {
                    if (age[1] == max_search_construction_age) {
                      return (
                        <option value={age[1]} selected>
                          {age[0]}
                        </option>
                      );
                    } else {
                      return <option value={age[1]}>{age[0]}</option>;
                    }
                  })}
                  ;
                </select>
              </label>
            </div>

            <p className="sub_block_title">駅徒歩</p>
            <div className="double_form_block">
              <label class="selectbox-003">
                <select onChange={handleChangeMaxAccessTime}>
                  {max_access_time_list.map((time) => {
                    if (time[1] == max_search_access_time) {
                      return (
                        <option value={time[1]} selected>
                          {time[0]}
                        </option>
                      );
                    } else {
                      return <option value={time[1]}>{time[0]}</option>;
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
        {/* 840px以下の時に表示する */}
        <div className="search_block2">
          <p className="search_title">検索条件変更</p>

          <form method="get" onSubmit={handleSubmit}>
            <div class="mini_flex">
              <div className="station_block">
                <label className="block_title_mini rosen_title">路線</label>
                <label class="selectbox-002">
                  <select onChange={handleChangeRosenName}>
                    {rosen_list.map((rosen) => {
                      if (rosen === rosen_temp_name) {
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
                <label className="block_title_mini">最寄駅</label>
                <label class="selectbox-002">
                  <select onChange={handleChangeSearchCode}>
                    {station_list.map((station) => {
                      if (station.id === search_code) {
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
            </div>
            <div class="mini_flex">
              <div class="fee_block">
                <label className="sub_block_title_mini">賃料</label>
                <label class="selectbox-003">
                  <select onChange={handleChangeMInCost}>
                    {min_cost_list.map((cost) => {
                      if (cost[1] == min_search_cost) {
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
                <label class="selectbox-003">
                  <select onChange={handleChangeMaxCost}>
                    {max_cost_list.map((cost) => {
                      if (cost[1] == max_search_cost) {
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
              <div class="fee_two_block">
                <label className="sub_block_title_mini">築年数</label>
                <div className="double_form_block">
                  <label class="selectbox-003">
                    <select onChange={handleChangeMaxConstructionAge}>
                      {max_construction_age_list.map((age) => {
                        if (age[1] == max_search_construction_age) {
                          return (
                            <option value={age[1]} selected>
                              {age[0]}
                            </option>
                          );
                        } else {
                          return <option value={age[1]}>{age[0]}</option>;
                        }
                      })}
                      ;
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div class="mini_flex">
              <div class="fee_block">
                <label className="sub_block_title_mini">占有面積</label>
                <div className="double_form_block">
                  <label class="selectbox-003">
                    <select onChange={handleChangeMInSpace}>
                      {min_space_list.map((space) => {
                        if (space[1] == min_search_space) {
                          return (
                            <option value={space[1]} selected>
                              {space[0]}
                            </option>
                          );
                        } else {
                          return <option value={space[1]}>{space[0]}</option>;
                        }
                      })}
                      ;
                    </select>
                  </label>
                  <label class="selectbox-003">
                    <select onChange={handleChangeMaxSpace}>
                      {max_space_list.map((space) => {
                        if (space[1] == max_search_space) {
                          return (
                            <option value={space[1]} selected>
                              {space[0]}
                            </option>
                          );
                        } else {
                          return <option value={space[1]}>{space[0]}</option>;
                        }
                      })}
                      ;
                    </select>
                  </label>
                </div>
              </div>
              <div class="fee_two_block">
                <label className="sub_block_title_mini">駅徒歩</label>
                <div className="double_form_block">
                  <label class="selectbox-003">
                    <select onChange={handleChangeMaxAccessTime}>
                      {max_access_time_list.map((time) => {
                        if (time[1] == max_search_access_time) {
                          return (
                            <option value={time[1]} selected>
                              {time[0]}
                            </option>
                          );
                        } else {
                          return <option value={time[1]}>{time[0]}</option>;
                        }
                      })}
                      ;
                    </select>
                  </label>
                </div>
              </div>
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
            rosen_name={rosen_name}
          />
        </div>

        <div className="right_div">
          {/* 840px以上の時に表示する */}
          <div className="website_block box8">
            <p className="website_title">このサイトについて</p>
            <p className="website_explain">
              東京メトロ沿線のすべての賃貸物件情報をAIが自動で収集し、一般的な賃料相場より安くお得な物件を表示しています。毎日午前9時に更新しています。
            </p>
          </div>
          <div className="search_block1">
            <p className="search_title">検索条件変更</p>

            <form method="get" onSubmit={handleSubmit}>
              <div className="station_block">
                <p className="block_title">路線</p>
                <label class="selectbox-002">
                  <select onChange={handleChangeRosenName}>
                    {rosen_list.map((rosen) => {
                      if (rosen === rosen_temp_name) {
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
                  <select onChange={handleChangeSearchCode}>
                    {station_list.map((station) => {
                      if (station.id === search_code) {
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

              <div>
                <p className="sub_block_title">賃料</p>
                <div className="double_form_block">
                  <label class="selectbox-003">
                    <select onChange={handleChangeMInCost}>
                      {min_cost_list.map((cost) => {
                        if (cost[1] == min_search_cost) {
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
                  <label class="selectbox-003">
                    <select onChange={handleChangeMaxCost}>
                      {max_cost_list.map((cost) => {
                        if (cost[1] == max_search_cost) {
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
              </div>
              <p className="sub_block_title">占有面積</p>
              <div className="double_form_block">
                <label class="selectbox-003">
                  <select onChange={handleChangeMInSpace}>
                    {min_space_list.map((space) => {
                      if (space[1] == min_search_space) {
                        return (
                          <option value={space[1]} selected>
                            {space[0]}
                          </option>
                        );
                      } else {
                        return <option value={space[1]}>{space[0]}</option>;
                      }
                    })}
                    ;
                  </select>
                </label>
                <label class="selectbox-003">
                  <select onChange={handleChangeMaxSpace}>
                    {max_space_list.map((space) => {
                      if (space[1] == max_search_space) {
                        return (
                          <option value={space[1]} selected>
                            {space[0]}
                          </option>
                        );
                      } else {
                        return <option value={space[1]}>{space[0]}</option>;
                      }
                    })}
                    ;
                  </select>
                </label>
              </div>
              <p className="sub_block_title">築年数</p>
              <div className="double_form_block">
                <label class="selectbox-003">
                  <select onChange={handleChangeMaxConstructionAge}>
                    {max_construction_age_list.map((age) => {
                      if (age[1] == max_search_construction_age) {
                        return (
                          <option value={age[1]} selected>
                            {age[0]}
                          </option>
                        );
                      } else {
                        return <option value={age[1]}>{age[0]}</option>;
                      }
                    })}
                    ;
                  </select>
                </label>
              </div>

              <p className="sub_block_title">駅徒歩</p>
              <div className="double_form_block">
                <label class="selectbox-003">
                  <select onChange={handleChangeMaxAccessTime}>
                    {max_access_time_list.map((time) => {
                      if (time[1] == max_search_access_time) {
                        return (
                          <option value={time[1]} selected>
                            {time[0]}
                          </option>
                        );
                      } else {
                        return <option value={time[1]}>{time[0]}</option>;
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

          <StationList station_list={station_list} />
        </div>
      </div>
    </div>
  );
}

export default PropetiesByStation;
