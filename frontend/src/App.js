import { Flex, Spinner } from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import { useRef } from "react";


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
import { CaseStatistics } from "./components/Case/CaseStatistics";
import { UserDetail } from "./components/User/UserDetail";
import { UserAdmin } from "./components/User/UserAdmin";
import { CaseList } from "./components/Case/CaseList";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";
import { NavBarPublic } from "./components/Navbar/NavBarPublic";
import { Welcome } from "./components/Case/Welcome";
import { AddUpdateCaseModal } from "./components/Case/AddUpdateCaseModal";

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

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
                          <Flex direction={{ base: "column", md: "row" }} h="90vh" w="100vw">
                            {/* Mobile: Bouton et Drawer visible en base seulement */}
                            <Box display={{ base: "block", md: "none" }} p={4}>
                              <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                                Open Case List
                              </Button>

                              <Drawer
                                closeOnInteractOutside={false}
                                isOpen={isOpen}
                                placement='left'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                                size="md" // ~30vw
                              >
                                <DrawerOverlay />
                                <DrawerContent>
                                  <DrawerCloseButton />
                                  <DrawerHeader>
                                    <Box  >
                                      <AddUpdateCaseModal/>
                                    </Box>
                                  </DrawerHeader>

                                  <DrawerBody overflowY="scroll">
                                    <CaseList />
                                  </DrawerBody>

                                  <DrawerFooter>
                                    <Footer />
                                  </DrawerFooter>
                                </DrawerContent>
                              </Drawer>
                            </Box>

                            {/* Sidebar visible en md+ */}
                            <Flex
                              direction="column"
                              w={{ md: "30vw" }}
                              display={{ base: "none", md: "flex" }}
                              bg="gray.50"
                              h="100%"
                            >
                              <Box>
                                <AddUpdateCaseModal />
                              </Box>
                              <Box flex="1" overflowY="scroll" p={2}>
                                <CaseList />
                              </Box>
                              <Box
                                bg="blackAlpha.100"
                                color="blackAlpha.900"
                                p={2}
                                overflowY="hidden"
                              >
                                <Footer />
                              </Box>
                            </Flex>

                            {/* Main content: Welcome */}
                            <Box
                              flex="1"
                              overflowY="scroll"
                              p={4}
                            >
                              <Welcome />
                            </Box>
                          </Flex>

                        </Authenticated>
                      }
                    />
                    <Route
                      path="cases/:case_id"
                      element={
                        <Authenticated>
                          <Flex direction={{ base: "column", md: "row" }} h="90vh" w="100vw">
                            {/* SIDEBAR: CaseList + Footer (visible md+) */}

                            <Box display={{ md: "none" }}>
                              <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                                Open Case List
                              </Button>

                              <Drawer closeOnInteractOutside={false}
                                isOpen={isOpen}
                                placement='left'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                                size="md" // equivalent to ~30vw
                              >
                                <DrawerOverlay />
                                <DrawerContent>
                                  <DrawerCloseButton />
                                  <DrawerHeader>
                                    <AddUpdateCaseModal />
                                  </DrawerHeader>

                                  <DrawerBody overflowY="scroll">
                                    <CaseList />
                                  </DrawerBody>

                                  <DrawerFooter>
                                    <Footer />
                                  </DrawerFooter>
                                </DrawerContent>
                              </Drawer>
                            </Box>
                            <Flex
                              display={{ base: "none", md: "flex" }}
                              direction="column"
                              w={{ md: "30vw" }}
                              h="100%"
                              bg="gray.50"
                            >
                              <Box>
                                <AddUpdateCaseModal />
                              </Box>
                              {/* CaseList en haut */}
                              <Box flex="1" overflowY="scroll" p={2}>
                                <CaseList />
                              </Box>

                              {/* Footer en bas */}
                              <Box
                                bg="blackAlpha.100"
                                color="blackAlpha.900"
                                p={2}
                                overflowY="hidden"
                              >
                                <Footer />
                              </Box>
                            </Flex>

                            {/* MAIN CONTENT: CaseDetail (visible always) */}
                            <Box
                              flex="1"
                              overflowY="scroll"
                              p={2}
                            >
                              <CaseDetail />
                            </Box>
                          </Flex>

                        </Authenticated>
                      }
                    />
                    <Route
                      path="user_or"
                      element={
                        <Authenticated>
                          <UserDetail />
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
                      path="statistics"
                      element={
                        <Authenticated>
                          <CaseStatistics />
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
