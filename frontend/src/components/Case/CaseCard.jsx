import { Badge, Flex, Text,Box,  useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CaseCard = ({ cas }) => {
  const navigate = useNavigate();
  return (
    <Flex
      bg={useColorModeValue("gray.300", "gray.600")}
      minHeight="5rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/cases/${cas.case_id}`, { replace: true })}
    >
      <Text>{cas.title}</Text>

      <Text>
         Modifié le <br/> {new Date(cas.updated_at ?cas.updated_at:cas.created_at).toLocaleDateString("fr-FR", {
                weekday: "long",  // e.g., Monday
                year: "numeric",  // e.g., 2025
                month: "long",    // e.g., February
                day: "numeric",   // e.g., 17
          })}
      </Text>
      <Badge colorScheme={cas.status ? "green" : "purple"}>
        {cas.status ? "Guerri" : "En cours"}
      </Badge>
    </Flex>
  );
};
