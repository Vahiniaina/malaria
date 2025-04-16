import { Outlet } from "react-router-dom";
import { Help } from "../Help/Help";
import { NavBarPublic } from "../Navbar/NavBarPublic";
// import { Grid, GridItem } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <>
      <NavBarPublic mh="10vh" />
      <Outlet/>
      <Help />
    </>
  );
}