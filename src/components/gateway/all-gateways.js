import { useEffect, useState } from "react";
import useGatewayStore from "../../store/gateway";
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
import DialogModal from "../common/dialog-modal";
import ConfirmationPopup from "../common/confiramation-popup";
import HoverButton from "../common/hover-button";
import "../../styles/hover-button.css";
import ViewGatewayDetails from "./edit-gateway";

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

function GatewayCards({ openAddModal, setOpenAddModal }) {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [openViewModal, setOpenViewModal] = useState({
    status: false,
    _id: undefined,
    name: undefined,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState({
    status: false,
    _id: undefined,
    name: undefined,
  });

  const { gateway, fetchAllGateways, deleteGateway } = useGatewayStore(
    (state) => ({
      gateway: state.gateway,
      fetchAllGateways: state.fetchAllGateways,
      deleteGateway: state.deleteGateway,
    })
  );

  useEffect(() => {
    fetchAllGateways();
  }, []);

  const onCloseViewModal = () => {
    setOpenViewModal({ status: false, _id: undefined, name: undefined });
    setEditMode(false);
  };
  const onOpenViewModal = (id, gatewayName) => {
    setOpenViewModal({ status: true, _id: id, name: gatewayName });
  };

  const onCloseDeleteModal = () =>
    setOpenDeleteModal({ status: false, _id: undefined, name: undefined });

  const onOpenDeleteModal = (id, gatewayName) => {
    setOpenDeleteModal({ status: true, _id: id, name: gatewayName });
  };

  const deleteSelectedGateway = () => {
    deleteGateway(openDeleteModal._id);
    setOpenDeleteModal({ status: false, _id: undefined, name: undefined });
  };

  useEffect(() => {
    setTableData(gateway.data);
  }, [gateway]);

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
                Name: {item.name}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Serial Number: {item.serialNumber}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                IPv4 Address: {item.ipv4Address}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Connected Devices: {item.devices.length}
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
          <Button onClick={() => setOpenAddModal(true)}>
            <HoverButton />
          </Button>
        </div>
      </div>

      <DialogModal
        open={openViewModal.status}
        onClose={onCloseViewModal}
        title={!editMode ? "Gateway details" : "Update details"}
      >
        <ViewGatewayDetails
          selectedGatewayId={openViewModal._id}
          onClose={onCloseViewModal}
          setOpenViewModal={setOpenViewModal}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </DialogModal>
      <ConfirmationPopup
        open={openDeleteModal.status}
        onClose={onCloseDeleteModal}
        title={openDeleteModal.name}
        onProceed={deleteSelectedGateway}
      />
    </>
  );
}
export default GatewayCards;
