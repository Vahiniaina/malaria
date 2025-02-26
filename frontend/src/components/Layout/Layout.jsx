import { Outlet } from "react-router-dom";
import { BotAgent } from "../BotAgent/BotAgent";
import { NavBarPublic } from "../Navbar/NavBarPublic";
import { Grid, GridItem } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <>
      <Grid
        templateAreas={`"nav "" main"`}
        gridTemplateRows={'10vh 1fr '}
        h="100vh"
        w="100vw"
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'nav'} >
          <NavBarPublic h="10vh" />
        </GridItem>
        <GridItem pl='2' area={'main'} overflowY="scroll">
          <Outlet />
        </GridItem>
      </Grid>
      <BotAgent />
    </>
  );
}