import { useState } from "react";
import { CollectionsBookmarkOutlined, Delete } from "@mui/icons-material";
import { TextField, InputAdornment, ListItem } from "@mui/material";

export default function LabelModalList({ label, index }) {
    const [overLabel, setOverLabel] = useState(false);
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
                    ),
                }}
                key={index}
                value={label.key}
                color="info"
                variant="standard"
                fullWidth
            >
            </TextField>
        </ListItem>
    )
}