import { Box, Center, Spinner, useColorModeValue, Stack, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const navigate = useNavigate();



    const bgColor = useColorModeValue("whiteAlpha 900", "blackAlpha 50");
    const textColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
    const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha 300");

    useEffect(() => {
        if (isMounted.current) return;
        console.log("fetch case use effect")
        fetchConfirmation();
        isMounted.current = true;
    }, []);

    const fetchConfirmation = () => {
        setLoading(true);
        console.log("fetching cases");
        axiosInstance
            .get("/case/")
            .then((res) => {
                setCases(res.data);
                console.log(res.data, "on succes");
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box
            mt={9}
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")} // Softer dark mode navbar
            color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
        >
            {loading ? (
                <Center mt={6}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="green.200"
                        color="green.500"
                        size="xl"
                    />
                </Center>
            ) : (
                <Box mt={6}>

                    <Stack spacing={4} width="100%">
                        <Button
                            width="100%"
                            bg={bgColor}
                            color={textColor}
                            onClick={() => navigate("/administration/dashboard")}
                            _hover={{
                                color: hoverTextColor,
                                transform: "scale(1.02)",
                                transition: "all 0.2s",
                            }}
                        >
                            Tableau de bord
                        </Button>

                        <Button
                            width="100%"
                            bg={bgColor}
                            color={textColor}
                            onClick={() => navigate("/administration/medecin_management")}
                            _hover={{
                                color: hoverTextColor,
                                transform: "scale(1.02)",
                                transition: "all 0.2s",
                            }}
                        >
                            Confirmation médecin
                        </Button>

                        <Button
                            width="100%"
                            bg={bgColor}
                            color={textColor}
                            onClick={() => navigate("/administration/user_management")}
                            _hover={{
                                color: hoverTextColor,
                                transform: "scale(1.02)",
                                transition: "all 0.2s",
                            }}
                        >
                            Gestion utilisateur
                        </Button>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};
