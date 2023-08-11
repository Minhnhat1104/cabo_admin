import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, IconButton, TextField, InputAdornment } from "@mui/material";
import { RefreshOutlined, SearchOutlined } from "@mui/icons-material";
import StatusFilter from "./StatusFilter";
import SelectBox from "@home/components/SelectBox";
import { KEY_SEARCH_OPTIONS } from "@home/config/constants";

interface FilterProps {
  refetch?: () => void;
}

const Filter = (props: FilterProps) => {
  const { refetch } = props;
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1} width="50%">
        <TextField
          placeholder="Search something..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 0.6 }}
        />
        <SelectBox options={KEY_SEARCH_OPTIONS} sx={{ flex: 0.4 }} />
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <StatusFilter />
        <DatePicker
          label="Pick a date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <IconButton size="small" onClick={() => refetch && refetch()}>
          <RefreshOutlined />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Filter;
