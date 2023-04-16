import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsData } from "../../store/reducers/devices";



export default function AllDevices() {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.device?.data?.data);
    console.log("device", items)
  
    useEffect(() => {
      dispatch(fetchAllItemsData());
    }, [dispatch]);
  
  return (
    <div>
    {items?.map((device) => {
      return <h1>{device.vendor}</h1>;
    })}
  </div>
  )
}
