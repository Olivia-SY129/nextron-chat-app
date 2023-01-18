import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../../lib/firebase/app";
import DrawerList from "./Drawer";
const anchor = "right";

export default function Nav() {
  const router = useRouter();
  const [state, setState] = useState(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const authState = !!auth.currentUser?.uid;
    setLogin(authState);

    if (!authState) {
      router.push("/login");
    }
  });

  useEffect(() => {
    if (!isLogin) {
      setState(false);
    }
  }, []);

  const toggleDrawer =
    (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(state);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DrawerList />
        </SwipeableDrawer>
      </React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Chat App
          </Typography>
          {isLogin ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Link href="/login">
              <Button variant="text" color="inherit">
                로그인
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
