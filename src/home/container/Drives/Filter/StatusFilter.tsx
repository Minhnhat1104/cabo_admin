import { theme } from "@base/theme";
import { LabelValue } from "@base/types";
import { DRIVER_STATUS_OPTIONS } from "@home/config/constants";
import { Filter, TuneOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface StatusFilterProps {
  value?: any;
}

const StatusFilter = (props: StatusFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleToggleCheck = (nVal: string) => {
    if (selectedValue.includes(nVal)) {
      setSelectedValue(
        selectedValue.filter((_value: string) => _value !== nVal)
      );
    } else {
      setSelectedValue([...selectedValue, nVal]);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-describedby={id}>
        <TuneOutlined />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList
          autoFocusItem={open}
          id="composition-menu"
          aria-labelledby="composition-button"
          // onKeyDown={handleListKeyDown}
          sx={{ p: 0 }}
        >
          {DRIVER_STATUS_OPTIONS.map((_option: LabelValue) => (
            <MenuItem
              key={_option.value}
              onClick={() => handleToggleCheck(_option.value)}
              sx={{ pr: 1, pl: 0 }}
            >
              <Checkbox checked={selectedValue.includes(_option.value)} />
              <Typography>{_option.label}</Typography>
            </MenuItem>
          ))}
        </MenuList>
        <Box
          width="100%"
          display="flex"
          p={1}
          borderTop={`1px solid ${theme.palette.divider}`}
        >
          <Button sx={{ margin: "auto" }} variant="contained">
            Submit
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default StatusFilter;
