import { useEffect, useState } from "react";
import useDeviceStore from "../../store/devices";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModalPopup from "../common/modal";
import ConfirmationPopup from "../common/confiramation-popup";
import ViewDeviceDetails from "./edit-device";
import HoverButton from "../common/hover-button";
import "../../styles/hover-button.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 2000,
    margin: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function DevicesCards({ openDevicesAddModal, setDevicesOpenAddModal }) {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [openDevicesDeleteModal, setOpenDevicesDeleteModal] = useState({
    status: false,
    _id: undefined,
    name: undefined,
  });
  const [openDevicesViewModal, setOpenDevicesViewModal] = useState({
    status: false,
    _id: undefined,
    name: undefined,
  });

  const { fetchAllDevices, deleteDevice, devices } = useDeviceStore(
    (state) => ({
      fetchAllDevices: state.fetchAllDevices,
      deleteDevice: state.deleteDevice,
      devices: state.devices,
    })
  );

  useEffect(() => {
    fetchAllDevices();
  }, []);

  useEffect(() => {
    setTableData(devices.data);
  }, [devices]);

  const onOpenDeleteModal = (id, vendor) => {
    setOpenDevicesDeleteModal({ status: true, _id: id, name: vendor });
  };

  const onCloseDeleteModal = () =>
    setOpenDevicesDeleteModal({
      status: false,
      _id: undefined,
      name: undefined,
    });

  const deleteSelectedDevice = () => {
    deleteDevice(openDevicesDeleteModal._id);
    setOpenDevicesDeleteModal({
      status: false,
      _id: undefined,
      name: undefined,
    });
  };

  const onOpenViewModal = (id, vendor) => {
    setOpenDevicesViewModal({ status: true, _id: id, name: vendor });
  };

  const onCloseViewModal = () =>
    setOpenDevicesViewModal({ status: false, _id: undefined, name: undefined });



  const filteredDateFunction = (date) =>{
    const filteredDate = date.substring(0, 10);

    return filteredDate
  }

  return (
    <>
      <Box sx={{ display: "flex", mb: 5 }}>
        <Typography variant="h5"></Typography>
      </Box>
      <div>
        {tableData.map((item, index) => (
          <Card key={index} className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Status: {item.vendor}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Vendor: {item.status}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Created Date: {filteredDateFunction(item.createdDate)}
              </Typography>
            </CardContent>
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => onOpenViewModal(item._id, item.vendor)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => onOpenDeleteModal(item._id, item.vendor)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
        ))}

        <div className="bottom-right">
          <Button onClick={() => setDevicesOpenAddModal(true)}>
            <HoverButton />
          </Button>
        </div>
      </div>
      <ModalPopup
        open={openDevicesViewModal.status}
        onClose={onCloseViewModal}
        title={openDevicesViewModal.name}
      >
        <ViewDeviceDetails
          selectedDeviceId={openDevicesViewModal._id}
          onClose={onCloseViewModal}
        />
      </ModalPopup>
      <ConfirmationPopup
        open={openDevicesDeleteModal.status}
        onClose={onCloseDeleteModal}
        title={openDevicesDeleteModal.name}
        onProceed={deleteSelectedDevice}
      />
    </>
  );
}

export default DevicesCards;
