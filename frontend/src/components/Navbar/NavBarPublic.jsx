import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBarPublic = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Flex
          as="nav"
          align="center"
          h="10vh"
          justify="space-between"
          wrap="wrap"
          padding="1rem"
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")} // Softer dark mode navbar
          color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")} // Softer text color
          position={"fixed"}
          width={"100%"}
          zIndex={100}
        >
          <Text as="h2"  fontSize={24} fontWeight="bold" onClick={() => navigate(`/home`, { replace: true })} >
            MalarIA
          </Text>
          <Stack direction="row" align="center" spacing={4}>
            <ThemeToggler size="md" />

            <Button onClick={() => navigate(`/home/data`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}>
              Data
            </Button>

            <Button onClick={() => navigate(`/home/documentation`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}>
              Documentaion
            </Button>

            <Button onClick={() => navigate(`/`, { replace: true })}
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
              _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}>
              Expert System
            </Button>

          </Stack>
        </Flex>
      </Box>
    </>
  );
};
