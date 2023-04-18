import React, { useState } from "react";
import ModalPopup from "../components/common/modal";
import CreateDevice from "../components/device/create-device";
import { MESSAGE_CONSTANT } from "../constants/constants";
import DevicesCards from "../components/device/all-devices";

export default function Devices() {
  const [openDevicesModal, setOpenDevicesModal] = useState(false);
  const handleClose = () => setOpenDevicesModal(false);
  return (
    <div>
      <DevicesCards
        openDevicesAddModal={openDevicesModal}
        setDevicesOpenAddModal={setOpenDevicesModal}
      />
      <ModalPopup
        open={openDevicesModal}
        onClose={handleClose}
        title={MESSAGE_CONSTANT.CREATE_NEW_DEVICE}
      >
        <CreateDevice />
      </ModalPopup>
    </div>
  );
}
