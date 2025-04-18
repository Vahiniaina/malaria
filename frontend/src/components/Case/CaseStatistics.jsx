import {
    Box,
    Center,
    SimpleGrid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axiosInstance from "../../services/axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js setup
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export const CaseStatistics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        fetchData();
        isMounted.current = true;
    }, []);

    const fetchData = () => {
        setLoading(true);
        axiosInstance
            .get("/case/get_statistic_data")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Count helpers
    const countByKey = (arr, key, subkey = null) => {
        const count = {};
        arr.forEach((item) => {
            const val = subkey ? item?.[key]?.[subkey] : item?.[key];
            if (val) {
                count[val] = (count[val] || 0) + 1;
            }
        });
        return count;
    };

    const totalActive = data.filter((c) => c.status === false).length;
    const totalHealed = data.filter((c) => c.status === true).length;

    const severityData = countByKey(data, "diagnostic", "Severite");
    const locationData = countByKey(data, "symptoms", "domicile");

    const parasiteData = countByKey(data, "diagnostic", "parasite");

    const symptomCounts = {};
    data.forEach((item) => {
        const symptoms = item.symptoms || {};
        Object.entries(symptoms).forEach(([k, v]) => {
            if (v === "TRUE") {
                symptomCounts[k] = (symptomCounts[k] || 0) + 1;
            }
        });
    });
    const sortedSymptomKeys = Object.keys(symptomCounts).sort(
        (a, b) => symptomCounts[b] - symptomCounts[a]
    );

    const isMobile = useBreakpointValue({ base: true, md: false });

    const chartBoxStyle = {
        p: 4,
        shadow: "md",
        borderWidth: "1px",
        borderRadius: "lg",
        bg: useColorModeValue("white", "gray.700"),
    };

    return (
        <Box
            mt={9}
            px={isMobile ? 4 : 12}
            py={6}
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("blackAlpha.900", "whiteAlpha.800")}
            borderRadius="md"
            w="100%"
        >
            {loading ? (
                <Center mt={6}>
                    <Spinner size="xl" color="green.500" />
                </Center>
            ) : (
                <>
                    {/* Indicateurs Clés (KPIs) */}
                    <Center mb={10}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                            <Stat textAlign="center">
                                <StatLabel fontSize="lg">Cas Actifs</StatLabel>
                                <StatNumber color="green.600" fontSize="3xl">
                                    {totalActive}
                                </StatNumber>
                            </Stat>
                            <Stat textAlign="center">
                                <StatLabel fontSize="lg">Cas Guéris</StatLabel>
                                <StatNumber color="blue.500" fontSize="3xl">
                                    {totalHealed}
                                </StatNumber>
                            </Stat>
                        </SimpleGrid>
                    </Center>

                    {/* Graphiques */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>

                        {/* Localisation */}
                        <Box {...chartBoxStyle}>
                            <Text fontSize="xl" mb={4} fontWeight="semibold">
                                📍 Localisation des Cas
                            </Text>
                            <Bar
                                data={{
                                    labels: Object.keys(locationData),
                                    datasets: [
                                        {
                                            label: "Nombre de cas",
                                            data: Object.values(locationData),
                                            backgroundColor: "#4299E1",
                                        },
                                    ],
                                }}
                            />
                        </Box>

                        {/* Symptômes */}
                        <Box {...chartBoxStyle}>
                            <Text fontSize="xl" mb={4} fontWeight="semibold">
                                🩺 Symptômes Fréquents
                            </Text>
                            <Bar
                                data={{
                                    labels: sortedSymptomKeys,
                                    datasets: [
                                        {
                                            label: "Occurrences",
                                            data: sortedSymptomKeys.map((k) => symptomCounts[k]),
                                            backgroundColor: "#F6AD55",
                                        },
                                    ],
                                }}
                            />
                        </Box>

                        {/* Gravité */}
                        <Box {...chartBoxStyle}>
                            <Text fontSize="xl" mb={4} fontWeight="semibold">
                                📊 Gravité des Cas
                            </Text>
                            <Pie
                                data={{
                                    labels: Object.keys(severityData),
                                    datasets: [
                                        {
                                            data: Object.values(severityData),
                                            backgroundColor: ["#FEB2B2", "#90CDF4", "#68D391"],
                                        },
                                    ],
                                }}
                            />
                        </Box>

                        {/* Distribution des Parasites */}
                        <Box {...chartBoxStyle}>
                            <Text fontSize="xl" mb={4} fontWeight="semibold">
                                🧬 Distribution des Parasites
                            </Text>
                            <Pie
                                data={{
                                    labels: Object.keys(parasiteData),
                                    datasets: [
                                        {
                                            data: Object.values(parasiteData),
                                            backgroundColor: ["#63b3ed", "#f6ad55", "#f56565", "#48bb78"],
                                        },
                                    ],
                                }}
                            />
                        </Box>
                    </SimpleGrid>

                </>
            )}
        </Box>
    );
};
