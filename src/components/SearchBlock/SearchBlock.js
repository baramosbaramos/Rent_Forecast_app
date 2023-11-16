// import React, { useState, useEffect } from "react";
// import st_list from "../st_list";
// import axios from "axios";

// function SearchBlock() {
//   const [station_code, setStation_code] = useState("ek_07710");
//   const [total_cost, setTotal_cost] = useState("1");

//   const station_list = st_list;

//   const total_cost_list = [
//     ["10万円以下", "1"],
//     ["10万円以上20万円以下", "2"],
//     ["20万円以上", "3"],
//   ];

//   const baseURL = "/search";

//   function handleChangeStationCode(e) {
//     setStation_code(e.target.value);
//   }

//   function handleChangeTotalCost(e) {
//     setTotal_cost(e.target.value);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     axios
//       .get(baseURL, {
//         params: {
//           code: station_code,
//           cost: total_cost,
//         },
//       })
//       .then((response) => {
//         setProperty_list(response.data);
//       })
//       .catch((error) => console.error(error));
//   }

//   return (
//     <div className="search_block">
//       <form method="get" onSubmit={handleSubmit}>
//         <div className="station_block">
//           <p className="block_title">○最寄駅</p>

//           <label class="selectbox-002">
//             <select onChange={handleChangeStationCode}>
//               {station_list.map((pair) => (
//                 <option value={pair[1]}>{pair[0]}</option>
//               ))}
//             </select>
//           </label>
//         </div>

//         <div className="access_time_block">
//           <p className="block_title">○賃料</p>
//           <label class="selectbox-002">
//             <select onChange={handleChangeTotalCost}>
//               {total_cost_list.map((cost) => (
//                 <option value={cost[1]}>{cost[0]}</option>
//               ))}
//             </select>
//           </label>
//         </div>
//         <button className="search_button" type="submit">
//           この条件で検索する
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SearchBlock;
