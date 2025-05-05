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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
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
import { useForm, Controller } from "react-hook-form";
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
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (values) => {
    values = transformSymptoms(values);
    const formattedValues = {
      ...values,
      updated_at: new Date().toISOString(),
    };
    try {
      await axiosInstance.put(`/case/update_symptoms/${case_id}`, formattedValues);
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
        AJOUTER DES SYMPTÔMES
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
            <ModalHeader textAlign="center">SYMPTÔMES</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {symptomsList.map(([key, question]) => (
                  <Box key={key}>
                    <Tooltip
                      label={question}
                      hasArrow
                      placement="top"
                      bg="gray.700"
                      color="white"
                      fontSize="sm"
                    >
                      <Text cursor="help" mb={2}>
                        {key.replaceAll("_", " ")}
                      </Text>
                    </Tooltip>

                    <Controller
                      name={key}
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <Slider
                          {...field}
                          min={0}
                          max={10}
                          step={1}
                          colorScheme="green"
                          onChange={(val) => field.onChange(val)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb boxSize={4} />
                        </Slider>
                      )}
                    />
                  </Box>
                ))}
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
