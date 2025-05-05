import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  useDisclosure,
  Container,
  Text,
  Flex,
  VStack,
  HStack,
  Badge,
  useColorModeValue
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useRef } from "react";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const UserAdmin = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
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
              <Box  >uuu
              </Box>
            </DrawerHeader>

            <DrawerBody overflowY="scroll">
              ll
            </DrawerBody>

            <DrawerFooter>ff
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
          uu
        </Box>
        <Box flex="1" overflowY="scroll" p={2}>
          ll
        </Box>
        <Box
          bg="blackAlpha.100"
          color="blackAlpha.900"
          p={2}
          overflowY="hidden"
        >ff
        </Box>
      </Flex>

      {/* Main content: Welcome */}
      <Box
        flex="1"
        overflowY="scroll"
        p={4}
      >ww
      </Box>
    </Flex>
  );
};
