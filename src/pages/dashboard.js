import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsData, fetchSingleItemData } from "../store/reducers/gateway";

const Dashboard = () => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchAllItemsData());
  }, [dispatch]);

  console.log(items);
  return (
    <div>
      <div>
        <input type="text" placeholder="Serial Number"/>
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="IPV4 Address"/>
        <button>Add Gateway</button>
      </div>
      {/* <div>
        {gatewayList.map((gateway) => {
          return <h1>{gateway.name}</h1>
        })}
      </div> */}
    </div>
  );
};

export default Dashboard;
