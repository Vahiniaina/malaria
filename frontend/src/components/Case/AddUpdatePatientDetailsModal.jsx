import {
  Box,
  Button,
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
  Select,
  useColorModeValue,
  useDisclosure,
  useToast,
  Switch,
  SimpleGrid,
  HStack,
  RadioGroup,
  Tooltip,
  Radio
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { motion, AnimatePresence } from "framer-motion"



const localisationList = [
  { region: "ANALAMANGA", facies: "HTC", district: "AntananarivoAtsimondrano" },
  { region: "ANALAMANGA", facies: "HTC", district: "AntananarivoAvaradrano" },
  { region: "ANALAMANGA", facies: "HTC", district: "AntananarivoRenivohitra" },
  { region: "ANALAMANGA", facies: "HTC", district: "Manjakandriana" },
  { region: "DIANA", facies: "OUEST", district: "AntsirananaI" },
  { region: "ITASY", facies: "HTC", district: "Soavinandriana" },
  { region: "VAKINANKARATRA", facies: "HTC", district: "Ambatolampy" },
  { region: "VAKINANKARATRA", facies: "HTC", district: "AntsirabeI" },
  { region: "VAKINANKARATRA", facies: "HTC", district: "Faratsiho" },
  { region: "AMORON'I MANIA", facies: "HTC", district: "Ambositra" },
  { region: "ATSINANANA", facies: "EST", district: "ToamasinaI" },
  { region: "BOENY", facies: "OUEST", district: "MahajangaI" },
  { region: "BOENY", facies: "OUEST", district: "MahajangaII" },
  { region: "BOENY", facies: "OUEST", district: "Marovoay" },
  { region: "BOENY", facies: "OUEST", district: "Mitsinjo" },
  { region: "ITASY", facies: "HTC", district: "Arivonimamo" },
  { region: "MENABE", facies: "OUEST", district: "BeloSurTsiribihina" },
  { region: "SAVA", facies: "EST", district: "Sambava" },
  { region: "SOFIA", facies: "OUEST", district: "Tsaratanana" },
  // ... ajoute les autres ici selon besoin
];




const transformPatientDetails = (values) => {
  console.log(values)
  return {
    patient_details: Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, (typeof value === "boolean")?(value? "TRUE":"FALSE"):value])
    )
  };
};


export const AddUpdatePatientDetailsModal = ({
  editable = false,
  defaultValues = {},
  onSuccess = () => { },
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { case_id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (values) => {
    values = transformPatientDetails(values);
    console.log(values)
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString()
    };

    try {
      await axiosInstance.put(`/case/update_patient_details/${case_id}`, formattedValues);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err.response?.data);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  const isEnceinte = watch("enceinte") === true || watch("enceinte") === "true";

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="teal" onClick={onOpen}>
        Modifier les informations du patient
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Détails du Patient</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2]} spacing={4}>
                <FormControl>
                  <FormLabel>Domicile</FormLabel>
                  <Select placeholder="Sélectionnez un district" {...register("domicile")}>
                    {localisationList.map(({ district, region, facies }) => (
                      <Tooltip
                        key={district}
                        label={`Région : ${region} | Facies : ${facies}`}
                        hasArrow
                        placement="top"
                        bg="gray.700"
                        color="white"
                      >
                        <option value={district}>{district}</option>
                      </Tooltip>
                    ))}
                  </Select>
                </FormControl>

                {/* <FormControl>
                  <FormLabel>Dernières localisations</FormLabel>
                  <Select multiple {...register("derniers_localisation")}>
                    {localisationList.map(({ district, region, facies }) => (
                      <Tooltip
                        key={district + "-multi"}
                        label={`Région : ${region} | Facies : ${facies}`}
                        hasArrow
                        placement="top"
                        bg="gray.700"
                        color="white"
                      >
                        <option value={district}>{district}</option>
                      </Tooltip>
                    ))}
                  </Select>
                </FormControl> */}

                <FormControl>
                  <FormLabel>Poids</FormLabel>
                  <Input {...register("poids")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Sexe</FormLabel>
                  <RadioGroup defaultValue="m">
                    <HStack spacing={4}>
                      <Radio value="m" {...register("sexe")}>Masculin</Radio>
                      <Radio value="f" {...register("sexe")}>Féminin</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Allaitement</FormLabel>
                  <Switch {...register("allaitement")} />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Enceinte</FormLabel>
                  <Switch {...register("enceinte")} />
                </FormControl>

                {isEnceinte && (
                  <FormControl>
                    <FormLabel>Trimestre de grossesse</FormLabel>
                    <Select placeholder="Sélectionnez" {...register("enceinte_trim")}>
                      <option value="1er">1er</option>
                      <option value="2em">2em</option>
                      <option value="3em">3em</option>
                    </Select>
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>Type de sang</FormLabel>
                  <Select placeholder="Choisir" {...register("type_de_sang")}>
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(blood => (
                      <option key={blood} value={blood}>{blood}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Antécédents médicaux</FormLabel>
                  <Input placeholder="ex: diabète, asthme" {...register("antecedents_medicaux")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Allergies</FormLabel>
                  <Input placeholder="ex: pénicilline, arachides" {...register("allergie")} />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Tension</FormLabel>
                  <Switch {...register("tension")} />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Diabète</FormLabel>
                  <Switch {...register("diabete")} />
                </FormControl>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Fermer
                </Button>
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting} loadingText="Mise à jour...">
                  Mettre à jour
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
