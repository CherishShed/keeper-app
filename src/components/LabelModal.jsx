import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button, InputAdornment } from "@mui/material";
import Modal from "@mui/material/Modal";
import { LabelModal, SnackText } from "../contexts/HomeContext";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import SnackFeed from "./SnackBarFeed";
import { LabelContext } from "../contexts/LabelContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddLabelModal() {
  const { modalOpen, setModalOpen } = useContext(LabelModal);
  const { dispatchSnack } = useContext(SnackText);
  const [labelKey, setLabelKey] = useState("");
  const { labels, setLabels } = useContext(LabelContext);
  const handleClose = () => setModalOpen(false);
  const addLabel = () => {
    axios.post("http://localhost:8081/newLabel", { key: labelKey }, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
        setLabels([...res.data.data])
        dispatchSnack({ type: "OPEN_SUCCESS_SNACK" });
      })
      .catch((err) => {
        dispatchSnack({ type: "OPEN_ERROR_SNACK" });
      });
  };
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="subtitle1" component="h2">
            Edit labels
          </Typography>
          <TextField
            value={labelKey}
            onChange={(e) => setLabelKey(e.target.value)}
            variant="standard"
            placeholder="Create new Label"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon></AddIcon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="success" onClick={addLabel}>
                    <DoneIcon></DoneIcon>
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="text"
            onClick={handleClose}
            size="small"
            style={{ right: "0", position: "absolute", bottom: "0" }}
            color="success"
          >
            Done
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
