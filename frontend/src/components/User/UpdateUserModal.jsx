import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
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
  } from "@chakra-ui/react";
  import {  useForm } from "react-hook-form";
  import axiosInstance from "../../services/axios";
  
  export const UpdateUserModal = ({
    editable = false,
    defaultValues = {},
    onSuccess = () => {},
    ...rest
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm({
      defaultValues: { ...defaultValues },
    });
  
    const onSubmit = async (values) => {
      console.log(values);
      try {
        await axiosInstance.post(`/users/update/`, values);
  
        toast({
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
        <Button w="100%" colorScheme="green" onClick={onOpen}>
          MODIFIER UTILISATEUR
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
              <ModalHeader>Modifier l'utilisateur</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={errors.email}>
                  <Input
                    placeholder="Adresse e-mail..."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="email"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("email", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 5,
                        message: "L’e-mail doit contenir au moins 5 caractères",
                      },
                      maxLength: {
                        value: 55,
                        message: "L’e-mail doit contenir au maximum 55 caractères",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.first_name}>
                  <Input
                    placeholder="Prénom de l'utilisateur..."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("first_name", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 5,
                        message: "Le prénom doit contenir au moins 5 caractères",
                      },
                      maxLength: {
                        value: 55,
                        message: "Le prénom doit contenir au maximum 55 caractères",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.first_name && errors.first_name.message}
                  </FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.last_name}>
                  <Input
                    placeholder="Nom de l'utilisateur..."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("last_name", {
                      required: "Ce champ est requis",
                      minLength: {
                        value: 5,
                        message: "Le nom doit contenir au moins 5 caractères",
                      },
                      maxLength: {
                        value: 55,
                        message: "Le nom doit contenir au maximum 55 caractères",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.last_name && errors.last_name.message}
                  </FormErrorMessage>
                </FormControl>
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
  