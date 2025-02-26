import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
} from "@chakra-ui/react";
import {
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Monthly malaria data for Madagascar (fictional, seasonally varied)
const monthlyData = [
  { month: "Jan", cases: 1800, deaths: 25 },
  { month: "Feb", cases: 1600, deaths: 20 },
  { month: "Mar", cases: 2200, deaths: 30 },
  { month: "Apr", cases: 3000, deaths: 45 },
  { month: "May", cases: 2800, deaths: 40 },
  { month: "Jun", cases: 3200, deaths: 50 },
  { month: "Jul", cases: 3500, deaths: 55 },
  { month: "Aug", cases: 3400, deaths: 50 },
  { month: "Sep", cases: 3100, deaths: 45 },
  { month: "Oct", cases: 2900, deaths: 40 },
  { month: "Nov", cases: 2500, deaths: 35 },
  { month: "Dec", cases: 2000, deaths: 28 },
];

// Regional distribution of malaria cases in Madagascar (fictional percentages)
const regionData = [
  { name: "Coastal", value: 65 },
  { name: "Eastern", value: 15 },
  { name: "Western", value: 10 },
  { name: "Highlands", value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Data = () => {
  return (
    <Container maxW="container.xl" py="10vh">
      <Heading as="h3" size="lg" mb={6}>
        Malaria Analytics in Madagascar
      </Heading>

      {/* Data Table */}
      <TableContainer mb={10}>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th isNumeric>Cases</Th>
              <Th isNumeric>Deaths</Th>
            </Tr>
          </Thead>
          <Tbody>
            {monthlyData.map((row, index) => (
              <Tr key={index}>
                <Td>{row.month}</Td>
                <Td isNumeric>{row.cases}</Td>
                <Td isNumeric>{row.deaths}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Composite Chart: Monthly Cases & Deaths */}
      <Box h="400px" mb={10}>
        <Heading as="h4" size="md" mb={3}>
          Monthly Malaria Cases & Deaths
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cases" fill="#3182CE" name="Cases" />
            <Line type="monotone" dataKey="deaths" stroke="#FF0000" name="Deaths" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      {/* Pie Chart: Regional Distribution */}
      <Box h="400px" mb={10}>
        <Heading as="h4" size="md" mb={3}>
          Regional Distribution of Malaria Cases
        </Heading>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={regionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {regionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default Data;
