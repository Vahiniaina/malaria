import { Flex, Spinner } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Authenticated } from "./components/Auth/Authenticated";
import { Login } from "./components/Auth/Login";
import { Home } from "./components/Home/Home";
import { Data } from "./components/Data/Data";
import { Layout } from "./components/Layout/Layout";
import { Footer } from "./components/Layout/Footer";
import { Documentation } from "./components/Documentation/Documentation";
import { HowTo } from "./components/Documentation/HowTo";
import { PublicRoute } from "./components/Auth/PublicRoute";
import { Register } from "./components/Auth/Register";
import { NavBar } from "./components/Navbar/NavBar";
import { CaseDetail } from "./components/Case/CaseDetail";
import { UserDetail } from "./components/User/UserDetail";
import { UserAdmin } from "./components/User/UserAdmin";
import { CaseList } from "./components/Case/CaseList";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";
import { NavBarPublic } from "./components/Navbar/NavBarPublic";
import { Welcome } from "./components/Case/Welcome";
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? (
                <Flex
                  height="100vh"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="green.200"
                    color="green.500"
                    size="xl"
                  />
                </Flex>
              ) : (
                <Routes>

                  <Route path="/home" element={<Layout />}>
                    <Route index element={<Home />} /> {/* Default route */}

                    <Route path="data" element={<Data />} />

                    <Route path="documentation" element={<Documentation />} />

                    <Route path="how_to" element={<HowTo />} />
                  </Route>

                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <NavBarPublic />
                        <Login />
                      </PublicRoute>
                    }
                  />

                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <NavBarPublic />
                        <Register />
                      </PublicRoute>
                    }
                  />


                  <Route path="/" element={<NavBar />}>
                    <Route index element={<Navigate to="cases" replace />} />
                    <Route
                      path="cases"
                      element={
                        <Authenticated>
                          <Grid
                            templateAreas={`"nav main" 
                                            "footer main" 
                                          `}
                            gridTemplateRows={'80vh 10vh '}
                            gridTemplateColumns={'30vw 1fr'}
                            h="90vh"
                            w="100vw"
                            gap='1'
                            fontWeight='bold'
                            overflow="hidden"
                          >
                            <GridItem pl='2' bg="blackAlpha.100" color="blackAlpha.900" overflowY="scroll" area={'nav'}>
                              <CaseList />
                            </GridItem>
                            <GridItem pl='2' bg="blackAlpha.100" placeItems="center" overflowY="scroll" area={'main'}>
                              <Welcome />
                            </GridItem>
                            <GridItem pl='2' bg="blackAlpha.100" color="blackAlpha.900" overflowY="hidden" area={'footer'}>
                              <Footer />
                            </GridItem>
                          </Grid>
                        </Authenticated>
                      }
                    />
                    <Route
                      path="cases/:case_id"
                      element={
                        <Authenticated>
                          <Grid
                            templateAreas={`"nav main""footer main"`}
                            gridTemplateRows={'80vh 1fr '}
                            gridTemplateColumns={'30vw 1fr'}
                            h="90vh"
                            w="100vw"
                            gap='1'
                            fontWeight='bold'
                          >
                            <GridItem pl='2' area={'nav'} overflowY="scroll">
                              <CaseList />
                            </GridItem>
                            <GridItem pl='2' area={'main'} overflowY="scroll">
                              <CaseDetail />
                            </GridItem>
                            <GridItem pl='2' bg="blackAlpha.100" color="blackAlpha.900" overflowY="hidden" area={'footer'}>
                              <Footer />
                            </GridItem>
                          </Grid>
                        </Authenticated>
                      }
                    />
                    <Route
                      path="user"
                      element={
                        <Authenticated>
                          <UserDetail />
                        </Authenticated>
                      }
                    />

                    <Route
                      path="administration"
                      element={
                        <Authenticated>
                          <UserAdmin />
                        </Authenticated>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>

                </Routes>
              )
            }
          </AuthConsumer>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
