import {
  messaging,
  onMessageListener,
  requestPermission,
} from "@base/components/firebase";
import { KEY_LOCAL_STORAGE_FCM_TOKEN } from "@base/config/constants";
import { useSnackBar } from "@base/hooks/useSnackBar";
import Drives from "@home/container/Drives";
import Form from "@home/container/Form";
import useFcmTokenMutation from "@home/hooks/useFcmTokenMutation";
import { DirectionsCarFilledOutlined, FeedOutlined } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { MessagePayload, onMessage } from "firebase/messaging";
import _ from "lodash";
import React, { useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const theme = useTheme();
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      width="100%"
      sx={{
        background: theme.palette.background.paper,
        p: 2,
        flex: 1,
      }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ListPage = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { enqueueSuccess } = useSnackBar();

  const mFcmTokenMutate = useFcmTokenMutation();
  // get Token firebase
  useEffect(() => {
    const getFCMtoken = async () => {
      const fcmToken = await requestPermission();
      const params = {
        token: fcmToken,
      };
      mFcmTokenMutate.mutate(params);
    };

    getFCMtoken();

    const unsubscribe = onMessageListener().then((payload) => {
      console.log("payload: ", payload);
    });

    return () => {
      unsubscribe.catch((err: any) => console.log("err: ", err));
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row" spacing={2} width={"100%"}>
      <Box
        sx={{
          background: theme.palette.background.paper,
          padding: 2,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            icon={<FeedOutlined />}
            iconPosition="start"
            label="Form"
            sx={{ justifyContent: "flex-start" }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<DirectionsCarFilledOutlined />}
            iconPosition="start"
            label="Drives"
            sx={{ justifyContent: "flex-start" }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Drives />
      </TabPanel>
    </Stack>
  );
};

export default ListPage;
