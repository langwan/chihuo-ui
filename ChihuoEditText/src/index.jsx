import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const start = "start";
const editing = "editing";
const end = "end";

export const ChihuoEditText = ({
  TextProps,
  name,
  isEdit,
  content,
  onSave,
  onStart,
  onStop,
  ...props
}) => {
  const ref = useRef();
  const [value, setValue] = useState(start);
  const [editState, setEditState] = useState(end);

  useEffect(() => {
    switch (editState) {
      case start:
        ref.current.select();
        ref.current.focus();
        setValue(content);
        setEditState(editing);
        break;
    }
  }, [editState]);

  useEffect(() => {
    if (isEdit) {
      setEditState(start);
      onStart(name);
    }
  }, [isEdit]);

  useEffect(() => {
    setValue(content);
  }, [content]);

  return (
    <Box
      className={"ChihuoEditText-root"}
      sx={{ overflow: "hidden", flexGrow: 1 }}
    >
      {editState != end ? (
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          onBlur={(event) => {
            setEditState(end);
            onSave(name, value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setEditState(end);
              onSave(name, value);
            } else if (event.key === "Escape") {
              setEditState(end);
              onStop(name, value);
            }
          }}
          inputRef={ref}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
              pl: 1,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
            "& .MuiOutlinedInput-input": {
              padding: 0,
              p: 1,
              border: "none",
            },
          }}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      ) : (
        <Box
          component={"div"}
          onDoubleClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setEditState(start);
            onStart(name);
          }}
        >
          <Typography {...TextProps}>{content}</Typography>
        </Box>
      )}
    </Box>
  );
};

ChihuoEditText.defaultProps = {
  onStart: (name) => {},
  onStop: (name, value) => {},
};
