import { Box, Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
// import { AddUpdateCaseModal } from "./AddUpdateCaseModal";
import { CaseCard } from "./CaseCard";

export const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { case_id } = useParams();

  useEffect(() => {
    if (isMounted.current) return;
    console.log("fetch case use effect")
    fetchCases();
    isMounted.current = true;
  }, []);

  const fetchCases = () => {
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
          {cases?.map((cas) => (
            <CaseCard cas={cas} key={cas.id} />
          ))}
        </Box>
      )}
    </Box>
  );
};
