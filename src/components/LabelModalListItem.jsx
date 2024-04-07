import { useState } from "react";
import { CollectionsBookmarkOutlined, Delete } from "@mui/icons-material";
import { TextField, InputAdornment, ListItem, Button } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import PropTypes from "prop-types";
LabelModalList.propTypes = {
  editLabel: PropTypes.func.isRequired,
  label:{},
  index:PropTypes.number,
  deleteLabel: PropTypes.func.isRequired,
};
export default function LabelModalList({ label, index, editLabel, deleteLabel }) {
    const originalKey = label.key;
    const [overLabel, setOverLabel] = useState(false);
    const [labelKey, setLabelKey] = useState(label.key)
    console.log(label._id)
    
    return (
        <ListItem
            onMouseEnter={() => setOverLabel(true)}
            onMouseLeave={() => setOverLabel(false)}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {(!overLabel) ? <CollectionsBookmarkOutlined /> : <Delete onClick={()=>deleteLabel(label._id)} className="label-delete"/>}
                        </InputAdornment>
                    ), endAdornment: (
                        <InputAdornment position="end">
                            <Button color="success" onClick={() => editLabel(originalKey, labelKey)}>
                                <DoneIcon></DoneIcon>
                            </Button>
                        </InputAdornment>
                    )
                }}
                key={index}
                value={labelKey}
                onChange={(e) => setLabelKey(e.target.value)}
                color="info"
                variant="standard"
                fullWidth
            >
            </TextField>
        </ListItem>
    )
}