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
      console.log(values)
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
          UPDATE USER
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
              <ModalHeader>Update User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
  
                <FormControl isInvalid={errors.email}>
                  <Input
                    placeholder="email ...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="email"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("email", {
                      required: "This is required field",
                      minLength: {
                        value: 5,
                        message: "Title must be at least 5 characters",
                      },
                      maxLength: {
                        value: 55,
                        message: "Title must be at most 55 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.first_name}>
                  <Input
                    placeholder="User first_name...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("first_name", {
                      required: "This is required field",
                      minLength: {
                        value: 5,
                        message: "first_name must be at least 5 characters",
                      },
                      maxLength: {
                        value: 55,
                        message: "first_name must be at most 55 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.first_name && errors.first_name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.last_name}>
                  <Input
                    placeholder="User last_name...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("last_name", {
                      required: "This is required field",
                      minLength: {
                        value: 5,
                        message: "last_name must be at least 5 characters",
                      },
                      maxLength: {
                        value: 55,
                        message: "last_name must be at most 55 characters",
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
                    Close
                  </Button>
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={ "Updating" }
                  >
                    Update
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    );
  };
  