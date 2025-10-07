import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
  };

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [clientData, setClientData] = useState(initialClientState);
  const [errors, setErrors] = useState({});

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!clientData.firstName) nextErrors.firstName = "First name is required";
    if (!clientData.lastName) nextErrors.lastName = "Last name is required";
    if (!clientData.username) nextErrors.username = "Username is required";
    if (!clientData.phone) nextErrors.phone = "Phone is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    dispatch(
      createClient(clientData, () => {
        setOpen(false);
        setClientData(initialClientState);
      })
    );
  };

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => {
      if (!prevErrors[field]) return prevErrors;
      const { [field]: _removed, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setErrors({});
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={clientData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="tel"
                    size="small"
                    value={clientData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClient;
