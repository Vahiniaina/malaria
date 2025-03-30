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
  } = useForm();

  const onSubmit = async (values) => {
    console.log("values:", values)
    values = transformKnowledge(values)
    console.log("values 2:", values)
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString()// Create mode: add both created_at and updated_at
    };
    try {
      await axiosInstance.post(`/case/add_case_to_knowledge_base/${case_id}`, formattedValues);

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
        ADD CASE TO KNOWLEDGE BASE:
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
            <ModalHeader textAlign="center">KNOWLEGDE</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                <Box>
                  <FormLabel fontSize="xl">Diagnostique</FormLabel>

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

                  {/* <FormControl>
                    <FormLabel>Suggestion</FormLabel>
                    <Textarea {...register("suggestion")} placeholder="Suggestion ou remarque..." />
                  </FormControl> */}
                </Box>

                {/* Section: Traitement */}
                {/* <Box>
                  <FormLabel fontSize="xl">Section Traitement</FormLabel>

                  <FormControl>
                    <FormLabel>Médicament</FormLabel>
                    <Input {...register("medicament")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Dose</FormLabel>
                    <Input {...register("dose")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Durée (en jours)</FormLabel>
                    <NumberInput min={1}>
                      <NumberInputField {...register("duree", { valueAsNumber: true })} />
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Surveillance</FormLabel>
                    <Input {...register("surveillance")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Effets secondaires</FormLabel>
                    <Input {...register("effets_secondaires")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Recommandations</FormLabel>
                    <Input {...register("recommandations")} />
                  </FormControl>
                  </Box> */}
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
                  ADD TO KNOWLEDGE BASE
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
