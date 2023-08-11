import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/useSignIn";
import { UserContext } from "../../../base/App";
import LogoImg from "@base/assets/CarLogo.svg";

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [getUser, setGetUser] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("On submit: ", data);
    const { username, password } = data;
    if (username === "admin" && password === "123456") {
      navigate("/Home", {
        replace: true,
      });
    } else {
      setError("Wrong credential");
    }
  };

  return (
    <Box
      sx={{ background: theme.palette.grey[300], borderRadius: 4 }}
      p={2}
      width="fit-content"
      margin="auto"
    >
      <Stack spacing={1} mb={1}>
        <Typography
          textAlign="center"
          fontSize={"1.2rem"}
          fontWeight={600}
          py={2}
        >
          Sign In
        </Typography>
        <img
          src={LogoImg}
          srcSet={LogoImg}
          alt={"Logo"}
          loading="lazy"
          style={{ display: "block", margin: "auto" }}
          // width={"160px"}
          height={"160px"}
        />
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Username
          </Typography>
          <TextField
            size="small"
            {...register("username")}
            variant="outlined"
            sx={{ width: 400 }}
            // rows={3}
          />
        </Box>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Password
          </Typography>
          <TextField
            size="small"
            {...register("password")}
            variant="outlined"
            sx={{ width: 400 }}
            type="password"

            // rows={3}
          />
        </Box>
        <Typography color={theme.palette.error.main}>{`*${error}`}</Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          borderRadius: "99px",
          textTransform: "capitalize",
          width: "100%",
        }}
        onClick={() => handleSubmit((data: any) => onSubmit(data))()}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
