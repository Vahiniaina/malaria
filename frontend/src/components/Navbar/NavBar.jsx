import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Avatar
} from "@chakra-ui/react";

import { MdHome, MdFolder, MdBarChart, MdAdminPanelSettings, MdAccountCircle, MdLogout, MdHelp } from "react-icons/md";

import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBar = () => {

  const location = useLocation();
  console.log(location)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("whiteAlpha 900", "blackAlpha 50");
  const textColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha 300");


  const [user, setUser] = useState({});

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user_id } = useParams();

  useEffect(() => {
    fetchUser();
  }, [user_id]);

  const fetchUser = () => {
    axiosInstance
      .get(`/users/me`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
      });
  };

  return (
    <>
      <Box
        bg={bgColor} // Softer dark mode navbar
        color={textColor} // Softer text color
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex
          px={4}
          minH="10vh"
          zIndex={100}
          // alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Flex display={{ md: "none" }} flex={{ base: 0 }}>

            <IconButton
              size={'md'}
              mt={"2vh"}
              mb={'2vh'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              // display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />

          </Flex>

          <Flex
            as="h2"
            fontSize={24}
            justify="center"
            fontWeight="bold"
            mt={'2vh'}
            flex={{ base: 1, md: "unset" }}
            // position={{base: "center", md: "unset"}}
            onClick={() => navigate(`/home`, { replace: true })}
          >
            MalarIA
          </Flex>
          <Flex flex={{ base: 0, md: "1" }} ml="2vh" mt={'2vh'} mb={{ base: "auto", md: '2vh' }} justify="center">

            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Button
                onClick={() => navigate(`/home`, { replace: true })}
                variant="ghost"
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdHome />}
              >
                Acceuil
              </Button>

              <Button
                onClick={() => navigate(`/`, { replace: true })}
                variant="ghost"
                fontWeight={location.pathname.startsWith('/cases') ? "bold" : "normal"}
                borderBottom={location.pathname.startsWith('/cases') ? "2px solid" : "2px solid transparent"}
                borderColor={location.pathname.startsWith('/cases') ? textColor : "transparent"}
                borderRadius="0" 
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdFolder />}
              >
                Mes consultations
              </Button>

              <Button
                onClick={() => navigate(`/statistics`, { replace: true })}
                variant="ghost"
                fontWeight={(location.pathname === '/statistics') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/statistics') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/statistics') ? textColor : "transparent"}
                borderRadius="0" 
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdBarChart />}
              >
                Statistiques
              </Button>

              {user.role === "Admin" && (
                <Button
                  onClick={() => navigate(`/administration`, { replace: true })}
                  variant="ghost"
                fontWeight={(location.pathname === '/administration') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/administration') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/administration') ? textColor : "transparent"}
                borderRadius="0" 
                bg="transparent"
                  color="inherit"
                  _hover={{ color: hoverTextColor }}
                  leftIcon={<MdAdminPanelSettings />}
                >
                  Admministration
                </Button>
              )}
            </HStack>

          </Flex>

          <Flex mr="2vh" mt={'2vh'} mb={'2vh'} align="flex-start" flexShrink={0} flexGrow={0} width="auto" height="auto">
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    '/home/memoire/infra/v0/docker_malarIA/frontend/assets_test/image.png'
                  }
                />
              </MenuButton>
              <MenuList m={"1vh"} justify={'center'}>
                <MenuItem _hover={{ bg: "transparent" }}>
                  <Button
                    onClick={() => navigate(`/user`, { replace: true })}
                    m={"1vh"}
                    variant="ghost"
                    bg="transparent"
                    color="inherit"
                    _hover={{ color: hoverTextColor }}
                    leftIcon={<MdAccountCircle />}
                  >
                    Mon compte
                  </Button>
                </MenuItem>

                <MenuItem color="inherit" _hover={{ bg: "transparent" }}>
                  <ThemeToggler m={"1vh"} size="md" showLabel={true} />
                </MenuItem>

                <MenuItem _hover={{ bg: "transparent" }}>
                  <Button
                    onClick={() => navigate(`/home/how_to`, { replace: true })}
                    m={"1vh"}
                    variant="ghost"
                    bg="transparent"
                    color="inherit"
                    _hover={{ color: hoverTextColor }}
                    leftIcon={<MdHelp />}
                  >
                    Aide
                  </Button>
                </MenuItem>

                <MenuItem _hover={{ bg: "transparent" }}>
                  <Button
                    onClick={logout}
                    m={"1vh"}
                    variant="ghost"
                    bg="transparent"
                    color="inherit"
                    _hover={{ color: hoverTextColor }}
                    leftIcon={<MdLogout />}
                  >
                    Deconnexion
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

        </Flex>



        {isOpen ? (
          <Flex pb={4} mt={4} direction="column" flex={{ base: 0 }}>
            <Stack as={'nav'} spacing={4} >
              <Button
                onClick={() => navigate(`/home`, { replace: true })}
                variant="ghost"
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdHome />}
              >
                Acceuil
              </Button>

              <Button
                onClick={() => navigate(`/`, { replace: true })}
                variant="ghost"
                fontWeight={location.pathname.startsWith('/cases') ? "bold" : "normal"}
                borderBottom={location.pathname.startsWith('/cases') ? "2px solid" : "2px solid transparent"}
                borderColor={location.pathname.startsWith('/cases') ? textColor : "transparent"}
                borderRadius="0" 
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdFolder />}
              >
                Mes consultations
              </Button>

              <Button
                onClick={() => navigate(`/statistics`, { replace: true })}
                variant="ghost"
                fontWeight={(location.pathname === '/statistics') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/statistics') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/statistics') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdBarChart />}
              >
                Statistiques
              </Button>

              {user.role === "admin" && (
                <Button
                  onClick={() => navigate(`/administration`, { replace: true })}
                  variant="ghost"
                fontWeight={(location.pathname === '/administration') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/administration') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/administration') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                  color="inherit"
                  _hover={{ color: hoverTextColor }}
                  leftIcon={<MdAdminPanelSettings />}
                >
                  Admministration
                </Button>
              )}
            </Stack>

          </Flex>
        ) : null}

      </Box >

      <Outlet />
    </>
  );
};
