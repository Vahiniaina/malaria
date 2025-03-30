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

const symptomsList = [
  ["fievre_48", "Avez-vous eu de la fièvre pendant plus de 48 heures ? (Température corporelle supérieure à 38°C depuis plus de 2 jours)"],
  ["fievre_cyclique_48", "Avez-vous une fièvre cyclique toutes les 48 heures ? (Fièvre qui revient régulièrement tous les deux jours)"],
  ["fievre_cyclique_72", "Avez-vous une fièvre cyclique toutes les 72 heures ? (Fièvre qui revient tous les trois jours)"],
  ["fievre", "Avez-vous de la fièvre ? (Température corporelle élevée au-dessus de 38°C)"],
  ["sueurs", "Avez-vous des sueurs excessives ? (Transpiration abondante, surtout la nuit)"],
  ["fatigue", "Vous sentez-vous anormalement fatigué ? (Épuisement persistant même après du repos)"],
  ["frissons", "Avez-vous des frissons ? (Sensation de froid intense malgré une température ambiante normale)"],
  ["sensation_de_froid", "Ressentez-vous une sensation de froid intense ? (Sensation de gelure sans raison apparente)"],
  ["maux_de_tete", "Avez-vous des maux de tête fréquents ? (Douleurs persistantes ou sévères dans la tête)"],
  ["douleurs_musculaires", "Ressentez-vous des douleurs musculaires ? (Douleurs dans les muscles sans raison évidente)"],
  ["vomissements", "Avez-vous des vomissements ? (Rejets alimentaires fréquents ou persistants)"],
  ["diarrhees", "Avez-vous de la diarrhée ? (Selles liquides fréquentes)"],
  ["toux", "Avez-vous une toux persistante ? (Toux qui dure plus de 2 semaines)"],
  ["deshydratation", "Montrez-vous des signes de déshydratation ? (Bouche sèche, soif intense, urines foncées, fatigue)"],
  ["troubles_respiratoires_graves", "Avez-vous des troubles respiratoires graves ? (Essoufflement, difficultés à respirer, oppression thoracique)"],
  ["defaillance_cardiaque", "Avez-vous des signes d’insuffisance cardiaque ? (Essoufflement au repos, gonflement des jambes, fatigue extrême)"],
  ["anemie_severe", "Avez-vous été diagnostiqué avec une anémie sévère ? (Fatigue extrême, essoufflement, peau pâle)"],
  ["hypoglycemie", "Avez-vous des symptômes d’hypoglycémie ? (Sueurs froides, tremblements, faim intense, confusion)"],
  ["hyperparasitemie", "Avez-vous été diagnostiqué avec une hyperparasitémie ? (Présence excessive de parasites dans le sang)"],
  ["acidose", "Présentez-vous des signes d’acidose ? (Respiration rapide, fatigue, confusion mentale)"],
  ["problemes_neurologiques", "Avez-vous des troubles neurologiques ? (Perte de conscience, convulsions, confusion)"],
  ["hemorragie", "Avez-vous des saignements anormaux ou des ecchymoses inexpliquées ? (Saignements fréquents du nez, gencives, ou bleus sans raison)"],
  ["insuffisance_renale", "Avez-vous une insuffisance rénale ou des problèmes urinaires ? (Urines rares, gonflement des jambes, fatigue extrême)"],
  ["ictere", "Votre peau ou vos yeux sont-ils jaunâtres ? (Jaunissement de la peau et des yeux, signe d’un problème du foie)"]
];





const transformSymptoms = (symptoms) => {
  return {
    symptoms: Object.fromEntries(
      Object.entries(symptoms).map(([key, value]) => [key, value ? "TRUE" : "FALSE"])
    )
  };
};




export const AddUpdateSymptomsModal = ({


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
    values = transformSymptoms(values)
    console.log("values 2:", values)
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString()// Create mode: add both created_at and updated_at
    };
    try {
      await axiosInstance.put(`/case/update_symptoms/${case_id}`, formattedValues);

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
        ADD SYMPTOM
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
            <ModalHeader textAlign="center">SYMPTOMES</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                
                {symptomsList.map(([key, question]) => (
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
