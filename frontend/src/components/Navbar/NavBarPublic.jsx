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
} from "@chakra-ui/react";

import { MdHome, MdDataset, MdWork } from "react-icons/md";

import {  useNavigate, useLocation } from "react-router-dom";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBarPublic = () => {

  const location= useLocation()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("whiteAlpha 900", "blackAlpha 50");
  const textColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha 300");


  const navigate = useNavigate();

  return (
    <>
      <Box
        bg={bgColor} // Softer dark mode navbar
        color={textColor} // Softer text color
        border="1px solid"
        borderColor="gray.300"
        position={'relative'}
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
                fontWeight={(location.pathname === '/home') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdHome />}
              >
                Home
              </Button>

              <Button onClick={() => navigate(`/home/data`, { replace: true })}
                variant="ghost"
                fontWeight={(location.pathname === '/home/data') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home/data') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home/data') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdDataset />}
              >
                Data
              </Button>

              <Button onClick={() => navigate(`/home/documentation`, { replace: true })}

                variant="ghost"
                fontWeight={(location.pathname === '/home/documentation') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home/documentation') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home/documentation') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdDataset />}
              >
                Documentaion
              </Button>

              <Button onClick={() => navigate(`/`, { replace: true })}
                variant="ghost"
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdWork />}
              >
                Expert System
              </Button>
            </HStack>

          </Flex>

          <Flex mr="2vh" mt={'2vh'} mb={'2vh'} align="flex-start" flexShrink={0} flexGrow={0} width="auto" height="auto">
            <ThemeToggler m={"1vh"} size="md" showLabel={false} />
          </Flex>
        </Flex>

        {isOpen ? (
          <Flex pb={4} mt={4} direction="column" flex={{ base: 0 }}>
            <Stack as={'nav'} spacing={4} >
              <Button
                onClick={() => navigate(`/home`, { replace: true })}
                variant="ghost"
                fontWeight={(location.pathname === '/home') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdHome />}
              >
                Home
              </Button>

              <Button onClick={() => navigate(`/home/data`, { replace: true })}
                variant="ghost"
                fontWeight={(location.pathname === '/home/data') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home/data') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home/data') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdDataset />}
              >
                Data
              </Button>

              <Button onClick={() => navigate(`/home/documentation`, { replace: true })}

                variant="ghost"
                fontWeight={(location.pathname === '/home/documentation') ? "bold" : "normal"}
                borderBottom={(location.pathname === '/home/documentation') ? "2px solid" : "2px solid transparent"}
                borderColor={(location.pathname === '/home/documentation') ? textColor : "transparent"}
                bg="transparent"
                borderRadius="0"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdDataset />}
              >
                Documentaion
              </Button>

              <Button onClick={() => navigate(`/`, { replace: true })}
                variant="ghost"
                bg="transparent"
                color="inherit"
                _hover={{ color: hoverTextColor }}
                leftIcon={<MdWork />}
              >
                Expert System
              </Button>
            </Stack>

          </Flex>
        ) : null}
      </Box >

    </>
  );
};
