import React, { useState } from "react";
import { LabelValue } from "@base/types";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectBoxProps {
  value?: any;
  onChange?: (nVal: any) => void;
  options: LabelValue[];
  ref?: any;
  sx?: SxProps;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const SelectBox = (props: SelectBoxProps, ref: any) => {
  const { value, onChange, options, sx } = props;

  const theme = useTheme();

  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(value);
  };

  return (
    <FormControl ref={ref} fullWidth sx={sx}>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple={false}
        value={selectedValue || ""}
        onChange={handleChange}
        placeholder="Select car type"
        size="small"
        fullWidth
      >
        {options.map((_option: LabelValue) => (
          <MenuItem
            key={_option?.value}
            value={_option?.value}
            //   style={getStyles(name, personName, theme)}
          >
            {_option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.forwardRef(SelectBox);
