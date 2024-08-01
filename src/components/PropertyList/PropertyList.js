import "./PropertyList.css";

function PropertyList(props) {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // const floor = Math.floor(property.floor_space*10)/10

  const listItems = props.property_list.map((property) => {
    if ((property.projected_rent-property.total_fee)>0) {
    return (
      <tr>
        <td className="osusume"> {property.rank}位 </td>
        <td className="text-right"> {property.construction_age}年</td>
        <td className="text-right"> {property.bill_type}</td>
        <td className="text-right">{Math.floor(property.floor_space*10)/10}㎡</td>
        <td className="text-right">{property.room_type}</td>
        <td className="text-right">{property.access_time}分</td>
        <td className="text-right">{property.shikikin_reikin}万円</td>
        <td className="text-right total_fee">　{property.total_fee.toLocaleString()}円</td>
        <td className="text-right projected_rent"> {property.projected_rent.toLocaleString()}円</td>
        <td>
          　
          <a href={property.url} target="_blank" className="text-center">
            {property.property_name}
          </a>
          　
        </td>
      </tr>
    );
  }
  });


  return (
    <>
      <p className="properties_title">
        <h2>{props.station_name}駅の割安物件一覧</h2>
        <h4>
          {year}年{month}月{day}日午前9時更新
        </h4>
      </p>
      <table className="property_table">
        <tr>
          <th>おすすめ<br /><br />順位</th>
          <th>築年数</th>
          <th>種別</th>
          <th>面積</th>
          <th>間取</th>
          <th>徒歩</th>
          <th>敷金<br />＋<br />礼金</th>
          <th>家賃</th>
          <th>AIが算出した<br />適正家賃</th>
          <th>物件名/URL</th>
        </tr>
        {listItems}
      </table>
    </>
  );
}

export default PropertyList;
