import {
  Box,
  Button,
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

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const UserAdmin = () => {
  const background = useColorModeValue("gray.100", "gray.700");

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cas détectés",
        data: [5, 12, 9, 15, 7, 10],
        backgroundColor: "#3182CE"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Évolution des cas par mois"
      }
    }
  };

  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Box
        w="250px"
        bg={useColorModeValue("gray.200", "gray.800")}
        p={5}
        boxShadow="md"
      >
        <VStack spacing={4} align="stretch">
          <Button colorScheme="blue" variant="solid" isActive>
            📊 Tableau de bord
          </Button>
          <Button colorScheme="gray" variant="outline" justifyContent="space-between">
            <HStack justify="space-between" w="full">
              <Text>✅ Confirmation médecin</Text>
              <Badge colorScheme="red">4</Badge>
            </HStack>
          </Button>
          <Button colorScheme="gray" variant="outline">
            👥 Liste des utilisateurs
          </Button>
        </VStack>
      </Box>

      {/* Main content */}
      <Box flex="1" p={6} bg={background} overflowY="auto">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Tableau de bord - Aperçu
        </Text>

        {/* KPI Section */}
        <Box bg="whiteAlpha.900" p={5} borderRadius="lg" shadow="md" mb={6}>
          <HStack spacing={6} justify="space-around">
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Utilisateurs</Text>
              <Text fontSize="2xl" fontWeight="bold">35</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Médecins</Text>
              <Text fontSize="2xl" fontWeight="bold">10</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Simples</Text>
              <Text fontSize="2xl" fontWeight="bold">25</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Total des cas</Text>
              <Text fontSize="2xl" fontWeight="bold">58</Text>
            </Box>
          </HStack>
        </Box>

        {/* Chart Section */}
        <Box bg="whiteAlpha.900" p={5} borderRadius="lg" shadow="md">
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Flex>
  );
};
