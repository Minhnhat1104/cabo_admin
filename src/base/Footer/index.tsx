import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{ backgroundColor: theme.palette.grey[800] }}
      width={"100%"}
      p={1}
    >
      <Typography textAlign="center" color={theme.palette.common.white}>
        Copyright @GroupJ - TKPM
      </Typography>
    </Stack>
  );
};

export default Footer;
