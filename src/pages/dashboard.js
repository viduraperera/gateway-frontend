import React, { useState } from "react";
import GatewayCards from "../components/gateway/all-gateways";
import ModalPopup from "../components/common/modal";
import CreateGateWay from "../components/gateway/create-gateway";
import { MESSAGE_CONSTANT } from "../constants/constants";

const Dashboard = () => {
  const [openGatewayModal, setOpenGatewayModal] = useState(false);
  const handleClose = () => setOpenGatewayModal(false);
  return (
    <div>
      <GatewayCards
        openAddModal={openGatewayModal}
        setOpenAddModal={setOpenGatewayModal}
      />
      <ModalPopup
        open={openGatewayModal}
        onClose={handleClose}
        title={MESSAGE_CONSTANT.CREATE_NEW_GATEWAY}
      >
        <CreateGateWay />
      </ModalPopup>
    </div>
  );
};

export default Dashboard;
