import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  Select
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

export const Register = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post("/users/create", values);
      toast({
        title: "Compte créé avec succès.",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      toast({
        title: `${err.response.data.detail}`,
        status: "error",
        isCloseable: true,
        duration: 1500,
      });
    }
  };

  const role = watch("role", "");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Inscription</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Adresse e-mail"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              {...register("email", {
                required: "Ce champ est requis",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="Nom d'utilisateur"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "Ce champ est requis",
                minLength: {
                  value: 5,
                  message: "Le nom d'utilisateur doit contenir au moins 5 caractères",
                },
                maxLength: {
                  value: 24,
                  message: "Le nom d'utilisateur doit contenir au maximum 24 caractères",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.role}>
            <Select
              {...register("role", { required: "La sélection d'un rôle est requise" })}
              placeholder="Sélectionnez un rôle"
              background={useColorModeValue("gray.300", "gray.600")}
              size="lg"
              mt={6}
              sx={{
                option: {
                  background: useColorModeValue("gray.300", "gray.600"),
                },
              }}
            >
              <option value="simple">Utilisateur simple</option>
              <option value="doctor">Médecin</option>
            </Select>
            <FormErrorMessage>
              {errors.role && errors.role.message}
            </FormErrorMessage>
          </FormControl>

          {/* Code visible seulement si Médecin est sélectionné */}
          {role === "doctor" && (
            <FormControl isInvalid={errors.code}>
              <Input
                placeholder="Code médecin"
                type="text"
                backdropBlur="gray.600"
                size="lg"
                mt={6}
                {...register("code", {
                  required: role === "doctor" ? "Le code médecin est requis" : false,
                  minLength: {
                    value: 4,
                    message: "Le code doit contenir au moins 4 caractères",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.code && errors.code.message}
              </FormErrorMessage>
            </FormControl>
          )}

          <FormControl isInvalid={errors.password}>
            <Input
              placeholder="Mot de passe"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "Ce champ est requis",
                minLength: {
                  value: 5,
                  message: "Le mot de passe doit contenir au moins 5 caractères",
                },
                maxLength: {
                  value: 24,
                  message: "Le mot de passe doit contenir au maximum 24 caractères",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            isLoading={isSubmitting}
            loadingText="Création du compte..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            S'inscrire
          </Button>
        </form>

        <Button
          onClick={() => navigate("/login", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          Se connecter
        </Button>
      </Flex>
    </Flex>
  );
};
