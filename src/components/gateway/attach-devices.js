import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useGatewayStore from "../../store/gateway";
import useDeviceStore from "../../store/devices";
import { useEffect, useMemo, useState } from "react";
import ConfirmationPopup from "../common/confiramation-popup";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import { MESSAGE_CONSTANT, WARNING_MESSAGE } from "../../constants/constants";

function ConnectedDevices({ selectedGatewayId, editMode }) {
  const [tableData, setTableData] = useState([]);
  const [newDevice, setNewDevice] = useState("");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deviceId, setDeviceId] = useState();

  const handleInputChange = (e) => {
    setNewDevice(e.target.value);
  };

  const { fetchSingleGateway, removeDevice, attachDevice, gatewayDetails } =
    useGatewayStore((state) => ({
      removeDevice: state.removeDevice,
      attachDevice: state.attachDevice,
      fetchSingleGateway: state.fetchSingleGateway,

      gatewayDetails: state.gatewayDetails,
    }));
  const { fetchAllDevices, devices } = useDeviceStore((state) => ({
    fetchAllDevices: state.fetchAllDevices,
    devices: state.devices,
  }));
  const removeDevicesFromGateway = () => {
    const details = { type: "remove", devices: [deviceId] };
    removeDevice(selectedGatewayId, details);
    setOpenConfirmationModal(false);
  };

  const addDevicesToGateway = () => {
    if (gatewayDetails.data.devices.length < 10) {
      const details = { type: "add", devices: [newDevice] };
      attachDevice(selectedGatewayId, details);
      setNewDevice("");
    } else {
      toast(WARNING_MESSAGE.DEVICE_COUNT, {
        type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
      });
    }
  };

  const onCloseConfirmationModal = () => setOpenConfirmationModal(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
      },
      {
        accessorKey: "vendor",
        header: "Vendor",
      },
    ],
    []
  );

  useEffect(() => {
    fetchAllDevices();
    fetchSingleGateway(selectedGatewayId);
  }, []);

  const onOpenConfirmationModal = (deviceId) => {
    setDeviceId(deviceId);
    setOpenConfirmationModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setTableData(gatewayDetails?.data.devices || []);
    }, 2000);
  }, [gatewayDetails.data.devices]);

  console.log("newDevice", newDevice);
  console.log("tableData", tableData);

  const validateSameDevice = () =>{
    tableData?.map((item) => {
      if(item._id === newDevice){
        toast(WARNING_MESSAGE.ALREADY_ADDED, {
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
        });
        return false;
      }
      else {
        addDevicesToGateway();
      }
    })
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "50px" }}>
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Attach Device</InputLabel>
          <Select
            value={newDevice}
            label="currentDevices"
            onChange={handleInputChange}
            disabled={!editMode}
            sx={{
              "&.MuiOutlinedInput-root": {
                background: !editMode ? "#ECECEC" : "#fff",
                borderRadius: "10px",
              },
            }}
          >
            {devices.data.map((i, index) => (
              <MenuItem value={i._id} key={index}>
                {i.vendor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            mt: "30px",
            position: "relative",
            bottom: "23px",
            left: "300px",
          }}
        >
          <IconButton
            color="default"
            sx={{ ml: -1 }}
            onClick={validateSameDevice}
            disabled={!editMode}
          >
            <AddCircleIcon color="primary" style={{ fontSize: 35 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", mt: "50px" }}>
        <MaterialReactTable
          data={tableData}
          columns={columns}
          enableTopToolbar={false}
          enableSorting={false}
          enableColumnActions={false}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <Box sx={{ ml: "15px" }}>
              <Tooltip title="remove device">
                <IconButton
                  color="default"
                  sx={{ ml: -1 }}
                  onClick={() => onOpenConfirmationModal(row.original._id)}
                  disabled={!editMode}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </Box>

      <ConfirmationPopup
        open={openConfirmationModal}
        onClose={onCloseConfirmationModal}
        title="Remove device"
        onProceed={removeDevicesFromGateway}
      />
    </Box>
  );
}

export default ConnectedDevices;
