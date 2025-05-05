import {
  Button,
  Center,
  Container,
  Spinner,
  Box,
  Flex,
  Text,
  useColorModeValue,
  useToast,
  SimpleGrid
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateCaseModal } from "./AddUpdateCaseModal";
import { AddUpdateSymptomsModal } from "./AddUpdateSymptomsModal";
import { AddUpdatePatientDetailsModal } from "./AddUpdatePatientDetailsModal";
import { AddUpdateAnalysesModal } from "./AddUpdateAnalysesModal";
import { AddToKnowledgeBaseModal } from "./AddToKnowledgeBaseModal";
import { DeleteIcon } from "@chakra-ui/icons";

export const CaseDetail = () => {
  const [user, setUser] = useState({});
  const [cas, setCase] = useState({});
  const [loading, setLoading] = useState(true);
  const { case_id } = useParams();
  // const { user_id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const colors = {
    background: useColorModeValue("blackAlpha.50", "blackAlpha.200"),
    cardBg: useColorModeValue("whiteAlpha.900", "blackAlpha.300"),
    borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    titleColor: useColorModeValue("blackAlpha.800", "whiteAlpha.900"),
    descriptionBg: useColorModeValue("whiteAlpha.700", "blackAlpha.400"),
    descriptionColor: useColorModeValue("blackAlpha.700", "whiteAlpha.800"),
    labelColor: useColorModeValue("blackAlpha.600", "whiteAlpha.700"),
    textColor: useColorModeValue("blackAlpha.900", "whiteAlpha.900"),
    statusBg: cas.status ? "green.400" : "purple.400",
    buttonBg: useColorModeValue("blackAlpha.100", "blackAlpha.500"),
    buttonHover: useColorModeValue("blackAlpha.200", "blackAlpha.400"),
    symptomsBg: useColorModeValue("blackAlpha.100", "blackAlpha.500"),
  };

  useEffect(() => {
    fetchCase();
    fetchUser();
    console.log("user effct", user, cas.diagnostic)
  }, [case_id]);

  const fetchUser = () => {
    setLoading(true);
    axiosInstance
      .get(`/users/me`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCase = () => {
    setLoading(true);
    axiosInstance
      .get(`/case/${case_id}`)
      .then((res) => {
        setCase(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCase = () => {
    setLoading(true);
    axiosInstance
      .delete(`/case/${case_id}`)
      .then(() => {
        toast({
          title: "Case deleted successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could'nt delete case",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  const getDiagnostic = () => {
    setLoading(true);
    axiosInstance
      .get(`/case/get_diagnostic/${case_id}`)
      .then(() => {
        toast({
          title: "Diag got successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate(`/cases/${case_id}`, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could'nt get Diag",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      })
      .finally(() => setLoading(false));
    fetchCase();
  };


  const getTreatment = () => {
    setLoading(true);
    axiosInstance
      .get(`/case/get_treatment/${case_id}`)
      .then(() => {
        toast({
          title: "Treat got successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate(`/cases/${case_id}`, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could'nt get Treat",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      })
      .finally(() => setLoading(false));
    fetchCase();
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Box bg={colors.background} minHeight="7rem" my={3} p={3} rounded="lg" alignItems="center" justifyContent="space-between" overflowY="scroll" textAlign="center">

        {/* Case Information */}
        <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor}>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacingY={3} spacingX={6}>
            <Box extAlign="left">
              <Text fontSize="xs" color="gray.500">Cas</Text>
              <Text fontWeight="semibold">
                {cas.title}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">Patient</Text>
              <Text fontWeight="semibold">{cas.patient_name}</Text>
            </Box>

            <Box>
              <Text fontSize="xs" color="gray.500">Statut</Text>
              <Text fontWeight="medium">{cas.status ? "Guéri" : "En cours"}</Text>
            </Box>
          </SimpleGrid>


          <Box mt={4} textAlign="left">
            <Text fontSize="sm" color="gray.500" mb={1}>
              Description
            </Text>
            <Text lineHeight="tall">
              {cas.description}
            </Text>
          </Box>

          <Box mt={4} textAlign="left">
            <Flex align="center" gap={2}>
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                Dernière mise à jour :
              </Text>
              <Text fontSize="sm">
                {new Date(cas.updated_at).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Flex>
          </Box>

          <Box mt={4} textAlign="left">
            <Flex align="center" gap={2}>
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                Créer à :
              </Text>
              <Text fontSize="sm">
                {new Date(cas.created_at).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Flex>
          </Box>




          <Flex gap={4} my={3}>
            <Box flex="1">
              <AddUpdateCaseModal
                editable={true}
                defaultValues={{
                  title: cas.title,
                  description: cas.description,
                  symptoms: cas.symptoms,
                  patient_name: cas.patient_name,
                  status: cas.status
                }}
                onSuccess={fetchCase}
              />
            </Box>

            <Button
              isLoading={loading}
              colorScheme="red"
              flex="1"
              onClick={deleteCase}
              leftIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
          </Flex>


        </Box>

        {/* Patient details  Section */}
        <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor} mt={4}>
          <Text fontSize={20} fontWeight="semibold" color={colors.descriptionColor} letterSpacing={0.3} mb={2}>
            Patient details:
          </Text>

          <Box as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
            {Object.entries(cas.patient_details || {}).map(([key, value]) =>
            (
              <Box key={key} bg={colors.symptomsBg} m={2} p={2} rounded="xl" shadow="sm" color={colors.textColor}>
                {key} : {value}
              </Box>
            )
            )}
          </Box>

          <AddUpdatePatientDetailsModal my={3} onSuccess={fetchCase} />
        </Box>

        {/* Symptoms Section */}
        <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor} mt={4}>
          <Text fontSize={20} fontWeight="semibold" color={colors.descriptionColor} letterSpacing={0.3} mb={2}>
            Symptoms:
          </Text>

          <Box as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
            {Object.entries(cas.symptoms || {}).map(([key, value]) =>
              value === "TRUE" && (
                <Box key={key} bg={colors.symptomsBg} m={2} p={2} rounded="xl" shadow="sm" color={colors.textColor}>
                  {key}
                </Box>
              )
            )}
          </Box>

          <AddUpdateSymptomsModal my={3} onSuccess={fetchCase} />
        </Box>

        {/* Analyse Section */}
        {user.role !== "simple" && (
          <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor} mt={4}>
            <Text fontSize={20} fontWeight="semibold" color={colors.descriptionColor} letterSpacing={0.3} mb={2}>
              Analyses:
            </Text>

            <Box as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
              {Object.entries(cas.analyses || {}).map(([key, value]) =>
                value === "TRUE" && (
                  <Box key={key} bg={colors.symptomsBg} m={2} p={2} rounded="xl" shadow="sm" color={colors.textColor}>
                    {key}
                  </Box>
                )
              )}
            </Box>

            <AddUpdateAnalysesModal my={3} onSuccess={fetchCase} />
          </Box>

        )}
        {/* Diagnostic Section */}
        <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor} mt={4}>
          <Text fontSize={20} fontWeight="semibold" color={colors.descriptionColor} letterSpacing={0.3} mb={2}>
            Diagnostic:
          </Text>

          <Box  >
            {Object.entries(cas.diagnostic || {}).map(([key, value]) => (
              <Box key={key} bg={colors.symptomsBg} m={2} p={2} size="sm" rounded="xl" shadow="sm" color={colors.textColor}>
                {key} : {value}
              </Box>
            ))}
          </Box>

          <Button isLoading={loading} colorScheme="blue" width="100%" onClick={getDiagnostic}>
            Recevoir le diagnostic
          </Button>
        </Box>






        {user.role !== "simple" && (
          <Box bg={colors.cardBg} p={5} rounded="2xl" shadow="lg" borderWidth={1} borderColor={colors.borderColor} mt={4}>
            <Text fontSize={20} fontWeight="semibold" color={colors.descriptionColor} letterSpacing={0.3} mb={2}>
              Traitement:
            </Text>

            <Box  >
              {Object.entries(cas.treatment || {}).map(([key, value]) => (
                <Box key={key} bg={colors.symptomsBg} m={2} p={2} size="sm" rounded="xl" shadow="sm" color={colors.textColor}>
                  {key} : {value}
                </Box>
              ))}
            </Box>

            <Button isLoading={loading} colorScheme="blue" width="100%" onClick={getTreatment}>
              Recevoir le traitement
            </Button>
          </Box>


        )}
        {user.role !== "simple" && (
          <Box>
            <AddToKnowledgeBaseModal my={3} onSuccess={fetchCase} />
          </Box>
        )}
      </Box>
    </>
  );
};
