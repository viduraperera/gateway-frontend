import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsData } from "../../store/reducers/gateway";

export default function AllGateways() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.gateway?.data?.data);

  useEffect(() => {
    dispatch(fetchAllItemsData());
  }, [dispatch]);

  return (
    <div>
      {items?.map((gateway) => {
        return <h1>{gateway.name}</h1>;
      })}
    </div>
  );
}
