import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      toast({
        title: "Email ou mot de passe invalide",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Connexion</Heading>
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
          <FormControl isInvalid={errors.password}>
            <Input
              placeholder="Mot de passe"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "Ce champ est requis",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Connexion en cours..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Connexion
          </Button>
        </form>
        <Button
          onClick={() => navigate("/register", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          S'inscrire
        </Button>
      </Flex>
    </Flex>
  );
};

