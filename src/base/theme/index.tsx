import { PaletteColorOptions, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#FFC6BC",
      main: "#FFC6BC",
      dark: "#FFC6BC",
      contrastText: "#fff",
    },
    secondary: {
      light: "#D9D9D9",
      main: "#D9D9D9",
      dark: "#D9D9D9",
      contrastText: "#D9D9D9",
    },
    background: {
      default: "#403949",
      paper: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiAvatar: {
      defaultProps: {
        sx: { width: 120, height: 120 },
      },
    },
  },
});
