import useListPlace from "@home/hooks/useListPlace";
import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  SxProps,
  TextField,
} from "@mui/material";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";

interface LocationAutocomplete {
  value?: any;
  onChange?: any;
  sx?: SxProps;
  [x: string]: any;
}

const LocationAutocomplete = (props: LocationAutocomplete, ref: any) => {
  const { value, onChange, sx, ...restProps } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const params = {
    searchLocation: searchValue,
  };
  const { data, isLoading } = useListPlace(params, {
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      if (!_.isEqual(data, options)) {
        setOptions(data);
      }
    } else {
      setOptions([]);
    }
  }, [data]);

  const handleOnChange = (nVal: any) => {
    onChange && onChange(nVal);
  };

  const setSearchDebound = useCallback(
    _.debounce((searchText: string) => {
      setSearchValue(searchText);
    }, 1000),
    []
  );

  return (
    <FormControl fullWidth sx={sx}>
      <Autocomplete
        ref={ref}
        disablePortal
        id="combo-box-demo"
        options={options}
        //   sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter text to search location..."
          />
        )}
        getOptionLabel={(option: any) => option?.address}
        value={value}
        //   onChange={ (event: React.SyntheticEvent<Element, Event>) => handleOnChange(event.target.value)}
        onChange={(event: any, newValue: string | null) => {
          handleOnChange(newValue);
        }}
        isOptionEqualToValue={(option: any, value: any) =>
          option?.location?.latitude === value?.location?.latitude &&
          option?.location?.longitude === value?.location?.longitude
        }
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setSearchDebound.cancel();
          setSearchDebound(newInputValue);
        }}
        {...restProps}
      />
    </FormControl>
  );
};

export default React.forwardRef(LocationAutocomplete);
