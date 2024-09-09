import "./PropertyList.css";

function PropertyList(props) {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (props.property_list.length == 0) {
    // APIリクエストで取得した件数が０件の場合、ダミーデータを１件格納する。
    const dammy_data = {
      access_time: "××",
      bill_type: "××××××",
      construction_age: "××",
      deviation_rate: "",
      difference: "",
      floor_space: 0,
      index: "××",
      kai: "×",
      projected_rent: "××××",
      property_name: "条件に該当する物件はありません",
      rank: "××",
      room_type: "××××",
      shikikin_reikin: "××××",
      total_fee: "××××",
      url: "/",
    };
    props.property_list["0"] = dammy_data;
  }

  const listItems = props.property_list.map((property) => {
    let kai = "-";

    if (property.kai < 0) {
      // 階数が地下の場合、クローラーでは”-”マイナスでDBに格納したため元に戻す
      let kai_temp = property.kai * -1;
      kai = "B" + String(kai_temp);
    } else if (property.kai !== 0) {
      // 異常値の場合0で格納
      kai = property.kai;
    }
    let bill_type = property.bill_type;
    if (property.bill_type === "テラス・タウンハウス") {
      bill_type = "タウンハウス";
    }
    return (
      <tr>
        <td className="osusume"> {property.rank}位 </td>
        <td className="text-right"> {property.construction_age}年</td>
        <td className="text-right"> {bill_type}</td>
        <td className="text-right">{kai}階</td>
        <td className="text-right">
          　{Math.floor(property.floor_space * 10) / 10}㎡
        </td>
        <td className="text-right">　{property.room_type}</td>
        <td className="text-right">　{property.access_time}分</td>
        <td className="text-right">{property.shikikin_reikin}万円</td>
        <td className="text-right total_fee">
          　{property.total_fee.toLocaleString()}円
        </td>
        <td className="text-right projected_rent">
          {" "}
          {property.projected_rent.toLocaleString()}円
        </td>
        <td className="bukken_url">
          　
          <a href={property.url} target="_blank" className="text-center">
            {property.property_name}
          </a>
          　
        </td>
      </tr>
    );
  });

  return (
    <>
      <p className="properties_title">
        <h2>
          <span class="deco">
            <span class="header_kai">
              {props.rosen_name} {props.station_name}駅
            </span>
          </span>
          <span class="header_kai">のお得な賃貸物件情報</span>
        </h2>
        <h4>
          （更新：{year}年{month}月{day}日）
        </h4>
      </p>
      <table className="property_table">
        <tr>
          <th>
            おすすめ
            <br />
            <br />
            順位
          </th>
          <th>築年数</th>
          <th>種別</th>
          <th>階数</th>
          <th>面積</th>
          <th>間取</th>
          <th>徒歩</th>
          <th>
            敷金
            <br />＋<br />
            礼金
          </th>
          <th>家賃</th>
          <th>
            AIが算出した
            <br />
            適正家賃
          </th>
          <th className="bukken_url">物件名/URL</th>
        </tr>
        {listItems}
      </table>
    </>
  );
}

export default PropertyList;
