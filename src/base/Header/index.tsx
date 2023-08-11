import React, { useContext } from "react";

import {
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../App";
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
import LogoImg from "../assets/AppLogo.png";
import { UserContext } from "@base/App";
import Star from "@mui/icons-material/Star";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { AccountCircle, Notifications, Search } from "@mui/icons-material";
const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickLogo = () => {
    navigate("/", {
      replace: true,
    });
  };

  const handleClickUserInfo = () => {
    navigate("/auth/user-info", {
      replace: true,
    });
  };

  const handleCickManageUser = () => {
    navigate("/auth/user-store", {
      replace: true,
    });
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/auth/sign-in", {
      replace: true,
    });
    handleClose();
  };

  // ================ handle not login ===========

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: theme.palette.background.paper }}
        px={4}
        pt={1}
        pb={1}
        borderBottom={border}
      >
        <img
          src={LogoImg}
          srcSet={LogoImg}
          alt={"Logo"}
          loading="lazy"
          // width={"160px"}
          height={"60px"}
        />

        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          size="small"
          placeholder="Tìm kiếm"
          sx={{ flex: 0.6 }}
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              bgcolor: theme.palette.error.main,
              borderRadius: 999,
              p: 1,
              height: "fit-content",
              display: "flex",
            }}
          >
            <Star
              sx={{
                color: theme.palette.warning.light,
              }}
              fontSize="small"
            />
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.info.light,
              borderRadius: 999,
              p: 1,
              height: "fit-content",
              display: "flex",
            }}
          >
            <WbSunnyIcon
              sx={{ color: theme.palette.warning.light }}
              fontSize="small"
            />
          </Box>

          <Badge
            badgeContent={4}
            color="primary"
            sx={{ display: "flex", height: "fit-content" }}
            overlap="circular"
          >
            <Notifications fontSize="large" />
          </Badge>
          {!user ? (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/auth/sign-up", {
                    replace: true,
                  });
                }}
              >
                Sign up
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/auth/sign-in", {
                    replace: true,
                  });
                }}
              >
                Sign in
              </Button>
            </Stack>
          ) : (
            <Box
              aria-describedby={id}
              onClick={handleClick}
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <BackgroundLetterAvatars name={user?.username || ""} />
              </Stack>
              {open ? (
                <ArrowDropUpIcon sx={{ color: theme.palette.primary.main }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: theme.palette.primary.main }} />
              )}
            </Box>
          )}
        </Stack>
      </Stack>

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
        >
          <MenuItem onClick={handleClickUserInfo}>Thông tin cá nhân</MenuItem>
          {user?.isAdmin && (
            <MenuItem onClick={handleCickManageUser}>
              Quản lý người dùng
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleClickLogo}>Xem khóa học</MenuItem>

          {user?.isAdmin && (
            <MenuItem
              onClick={() => {
                navigate("/course/store", {
                  replace: true,
                });
                handleClose();
              }}
            >
              Quản lý khóa học
            </MenuItem>
          )}
          {user?.isAdmin && (
            <MenuItem
              onClick={() => {
                navigate("/course/trash", {
                  replace: true,
                });
                handleClose();
              }}
            >
              Thùng rác
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default Header;
