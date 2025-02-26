import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          h="10vh"
          wrap="wrap"
          padding="1rem"
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")} // Softer dark mode navbar
          color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")} // Softer text color
          width={"100%"}
          zIndex={10}
        >
          <Text
            as="h2"
            fontSize={24}
            fontWeight="bold"
            onClick={() => navigate(`/home`, { replace: true })}
          >
            MalarIA
          </Text>

          <Stack direction="row" align="center" spacing={4}>
            <ThemeToggler size="md" />

            <Button
              onClick={() => navigate(`/`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}
            >
              My cases
            </Button>

            <Button
              onClick={() => navigate(`/user`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}
            >
              My account
            </Button>

            <Button
              onClick={() => navigate(`/home`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}
            >
              Home
            </Button>

            <Button
              onClick={logout}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}
            >
              Logout
            </Button>
          </Stack>
        </Flex>
        <Outlet />
      </Box>
    </>
  );
};
