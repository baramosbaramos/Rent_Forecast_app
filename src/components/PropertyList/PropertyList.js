// import "./Home.css";

function PropertyList(props) {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const listItems = props.property_list.map((property) => {
    return (
      <tr>
        <td> {property.rank} </td>
        <td> {property.construction_age}年</td>
        <td>　{property.floor_space}㎡　</td>
        <td> {property.access_time}分</td>
        <td> {property.total_fee.toLocaleString()}円</td>
        <td> {property.projected_rent.toLocaleString()}円</td>
        <td>
          　
          <a href={property.url} target="_blank">
            {property.property_name}
          </a>
          　
        </td>
      </tr>
    );
  });

  return (
    <>
      <p className="properties_title">
        <h2>{props.station_name}駅周辺の割安物件一覧</h2>
        <h4>
          {year}年{month}月{day}日午前9時更新
        </h4>
      </p>
      <table className="property_table">
        <tr>
          <th>　順位　</th>
          <th>　築年数　</th>
          <th>　広さ　</th>
          <th>　駅徒歩　</th>
          <th>　賃料(管理費込み)　</th>
          <th>　AI予測賃料　</th>
          <th>　物件名/URL　</th>
        </tr>
        {listItems}
      </table>
    </>
  );
}

export default PropertyList;
