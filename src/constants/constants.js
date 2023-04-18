export const MESSAGE_CONSTANT = {
  GATEWAY_CREATE: "Gateway created successfully",
  STORE_MSG_ERROR: "Something went wrong",
  STORE_TYPE_SUCCESSFUL: "success",
  STORE_TYPE_ERROR: "error",
  GATEWAY_UPDATE : "Gateway updated successfully",
  GATEWAY_ADD_DEVICE : "Added the device successfully",
  GATEWAY_REMOVE_DEVICE : "Removed the device successfully",
  GATEWAY_DELETE : "Gateway deleted successfully",

  DEVICE_CREATE: "successfully created the devices",
  DEVICE_UPDATE : "successfully updated the device",
  DEVICE_DELETE : "Device deleted",

  CREATE_NEW_GATEWAY : "Create New Gateway",
  CREATE_NEW_DEVICE : "Create New Device"

};

export const REGULAR_EXPRESSIONS = {
  IPV4ADDRESS_PATTEN : /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  SERIAL_NUMBER_PATTEN : /^[A-Za-z0-9]*$/,

}

export const WARNING_MESSAGE = {
  UPDATE_WARNING_MSG : "Remove all devices before editing Gateway",
  DEVICE_COUNT : "Only 10 devices can be connected",
  ALREADY_ADDED : "This device is already added to the gateway"
}
