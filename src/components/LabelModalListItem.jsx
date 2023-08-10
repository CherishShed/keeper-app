import { useState } from "react";
import { CollectionsBookmarkOutlined, Delete } from "@mui/icons-material";
import { TextField, InputAdornment, ListItem, Button } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
export default function LabelModalList({ label, index, editLabel }) {
    const originalKey = label.key;
    const [overLabel, setOverLabel] = useState(false);
    const [labelKey, setLabelKey] = useState(label.key)
    return (
        <ListItem
            onMouseEnter={() => setOverLabel(true)}
            onMouseLeave={() => setOverLabel(false)}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {(!overLabel) ? <CollectionsBookmarkOutlined /> : <Delete />}
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