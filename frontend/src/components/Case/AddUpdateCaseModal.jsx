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
    console.log(values)
    const formattedValues = {
      ...values,
      ...(editable
        ? { updated_at: new Date().toISOString() } // Update mode: only add updated_at
        : { created_at: new Date().toISOString() } // Create mode: add both created_at and updated_at
      ),
    };
    try {
      if (editable) {
        await axiosInstance.put(`/case/${case_id}`, formattedValues);
      } else {
        await axiosInstance.post(`/case/create/`, formattedValues).then((response) => navigate(`/cases/${response.data.case_id}`, { replace: true }));
      }
      toast({
        title: editable ? "Case Updated" : "Case Added",
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
    <Box {...rest} >
      <Button w="100%" 
              px={10}
              bg={useColorModeValue("blackAlpha.400", "whiteAlpha.200")} onClick={onOpen}>
        {editable ? "UPDATE CASE" : "ADD NEW CASE"}
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
            <ModalHeader>{editable ? "Update Case" : "ADD NEW CASE"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <FormControl isInvalid={errors.title}>
                <Input
                  placeholder="Case Title...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("title", {
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
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <Textarea
                  rows={5}
                  placeholder="Add description...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("description", {
                    required: "This is required field",
                    minLength: {
                      value: 5,
                      message: "Description must be at least 5 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description must be at most 200 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              
              <FormControl isInvalid={errors.patient_name}>
                <Input
                  placeholder="Case patient_name...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("patient_name", {
                    required: "This is required field",
                    minLength: {
                      value: 5,
                      message: "Patient_name must be at least 5 characters",
                    },
                    maxLength: {
                      value: 55,
                      message: "Patient_name must be at most 55 characters",
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
                    <FormLabel htmlFor="is-done">Status</FormLabel>
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
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={editable ? "Updating" : "Creating"}
                >
                  {editable ? "Update" : "Create"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
