import {
  Box,
  Button,
  Checkbox,
  Tooltip,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
  Text,
  Switch,
  SimpleGrid,
  Select,
  HStack,
  RadioGroup,
  Radio
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { motion, AnimatePresence } from "framer-motion"

const analyseList = [
  ["TDR", "Le test de diagnostic rapide (TDR) a-t-il été effectué ?"],
  ["goutte_epais", "Une goutte épaisse a-t-elle été réalisée ?"],
  ["frotti_sanguin", "Un frottis sanguin a-t-il été effectué ?"],
  ["PCR", "Un test PCR a-t-il été effectué ?"],
  ["HRP2", "Le test HRP2 est-il positif ?"],
  ["HRP3", "Le test HRP3 est-il positif ?"],
  ["pLDH", "Le test pLDH est-il positif ?"],
  ["analyse_parasitaire", "Quel est le type de parasite identifié ? (falciparum, vivax, malariae, ovale)"],
  ["stade_parasitaire", "Quel est le stade parasitaire observé ?"]
];






const transformAnalyses = (analyses) => {
  return {
    analyses: Object.fromEntries(
      Object.entries(analyses).map(([key, value]) => [key, value ? "TRUE" : "FALSE"])
    )
  };
};




export const AddUpdateAnalysesModal = ({


  editable = false,
  defaultValues = {},
  onSuccess = () => { },
  ...rest
}) => {



  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { case_id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (values) => {
    console.log("values:", values)
    values = transformAnalyses(values)
    console.log("values 2:", values)
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString()// Create mode: add both created_at and updated_at
    };
    try {
      await axiosInstance.put(`/case/update_analyses/${case_id}`, formattedValues);

      onSuccess();
      onClose();
    } catch (err) {
      console.log("error on submit")
      console.error(err.response?.data);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        ADD POSITVE ANALYSE:
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">ANALYSES</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                
                {analyseList.map(([key, question]) => (
                  <Box key={key}>
                    <Tooltip label={question} hasArrow placement="top" bg="gray.700" color="white" fontSize="sm">
                      <Text cursor="help">{key.replaceAll("_", " ")}</Text>
                    </Tooltip>
                    <Switch size="md" colorScheme="green" {...register(key)} />
                  </Box>
                ))}
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={"Updating"}
                >
                  UPDATE
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
