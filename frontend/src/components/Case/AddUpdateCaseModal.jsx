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
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

export const AddUpdateCaseModal = ({
  editable = false,
  defaultValues = {},
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
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (values) => {
    const formattedValues = {
      ...values,
      ...(editable
        ? { updated_at: new Date().toISOString() }
        : { created_at: new Date().toISOString() }),
    };
    try {
      if (editable) {
        await axiosInstance.put(`/case/${case_id}`, formattedValues);
      } else {
        await axiosInstance.post(`/case/create/`, formattedValues).then((response) =>
          navigate(`/cases/${response.data.case_id}`, { replace: true })
        );
      }
      toast({
        title: editable ? "Consultation mis à jour" : "Nouveau Consultation ajouté",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
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
      <Button
        w="100%"
        px={10}
        bg={useColorModeValue("blackAlpha.400", "whiteAlpha.200")}
        onClick={onOpen}
      >
        {editable ? "MODIFIER LA CONSULATION" : "CREER UN NOUVEAU CONSULTATION"}
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
            <ModalHeader>
              {editable ? "Modifier la consulation" : "Creer un nouveau consuttalion"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.title}>
                <Input
                  placeholder="Titre du Consultation..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("title", {
                    required: "Ce champ est requis",
                    minLength: {
                      value: 5,
                      message: "Le titre doit contenir au moins 5 caractères",
                    },
                    maxLength: {
                      value: 55,
                      message: "Le titre doit contenir au maximum 55 caractères",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <Textarea
                  rows={5}
                  placeholder="Ajouter une description..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("description", {
                    required: "Ce champ est requis",
                    minLength: {
                      value: 5,
                      message: "La description doit contenir au moins 5 caractères",
                    },
                    maxLength: {
                      value: 200,
                      message: "La description doit contenir au maximum 200 caractères",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.patient_name}>
                <Input
                  placeholder="Nom du patient..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("patient_name", {
                    required: "Ce champ est requis",
                    minLength: {
                      value: 5,
                      message: "Le nom du patient doit contenir au moins 5 caractères",
                    },
                    maxLength: {
                      value: 55,
                      message: "Le nom du patient doit contenir au maximum 55 caractères",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.patient_name && errors.patient_name.message}
                </FormErrorMessage>
              </FormControl>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormControl mt={6} display="flex" alignItems="center">
                    <FormLabel htmlFor="is-done">Statut</FormLabel>
                    <Switch
                      onChange={(e) => field.onChange(e.target.checked)}
                      isChecked={field.value}
                      id="id-done"
                      size="lg"
                      name="status"
                      isDisabled={false}
                      isLoading={false}
                      colorScheme="green"
                      variant="ghost"
                    />
                  </FormControl>
                )}
              />
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
                  loadingText={editable ? "Mise à jour..." : "Création..."}
                >
                  {editable ? "Mettre à jour" : "Créer"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
