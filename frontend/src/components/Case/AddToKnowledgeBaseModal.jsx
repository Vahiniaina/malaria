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
  NumberInput,
  NumberInputField,
  Textarea,
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







const transformKnowledge = (knowledges) => {
  return {
    diagnostic: Object.fromEntries(
      Object.entries(knowledges).map(([key, value]) => [key, (typeof value === "boolean")?(value? "TRUE":"FALSE"):value])
    )
  };
};




export const AddToKnowledgeBaseModal = ({
  editable = false,
  onSuccess = () => {},
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
  } = useForm();

  const onSubmit = async (values) => {
    values = transformKnowledge(values);
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString()
    };
    try {
      await axiosInstance.post(`/case/add_case_to_knowledge_base/${case_id}`, formattedValues);
      onSuccess();
      onClose();
    } catch (err) {
      console.log("Erreur lors de la soumission");
      console.error(err.response?.data);
      toast({
        title: "Une erreur est survenue. Veuillez réessayer.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        AJOUTER CE CAS À LA BASE DE CONNAISSANCES
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
            <ModalHeader textAlign="center">BASE DE CONNAISSANCES</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                <Box>
                  <FormLabel fontSize="xl">Diagnostic</FormLabel>

                  <FormControl>
                    <FormLabel>Paludisme</FormLabel>
                    <Select placeholder="Sélectionnez" {...register("paludisme")}>
                      <option value="non_confirme">Non confirmé</option>
                      <option value="confirme">Confirmé</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Degré</FormLabel>
                    <Select placeholder="Sélectionnez" {...register("degre")}>
                      <option value="simple">Simple</option>
                      <option value="grave">Grave</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Type de parasite</FormLabel>
                    <Select placeholder="Sélectionnez" {...register("parasite")}>
                      <option value="falciparum">Falciparum</option>
                      <option value="vivax">Vivax</option>
                      <option value="malariae">Malariae</option>
                      <option value="ovale">Ovale</option>
                      <option value="knowlesi">Knowlesi</option>
                    </Select>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Hospitalisation</FormLabel>
                    <Switch {...register("hospitalisation")} />
                  </FormControl>

                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Réanimateur</FormLabel>
                    <Switch {...register("reanimateur")} />
                  </FormControl>
                </Box>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Fermer
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={"Mise à jour..."}
                >
                  Ajouter à la base de connaissances
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
