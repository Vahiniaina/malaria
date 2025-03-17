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
        title: "Account created successfully.",
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
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This is required field",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="username"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.role}>
            <Select
              {...register("role", { required: "Role selection is required" })}
              placeholder="Select role"
              background={useColorModeValue("gray.300", "gray.600")}
              size="lg"
              mt={6}
              sx={{
                option: {
                  background: useColorModeValue("gray.300", "gray.600")
                },
              }}
            >
              <option value="simple">Simple</option>
              <option value="doctor">Doctor</option>
            </Select>
            <FormErrorMessage>
              {errors.role && errors.role.message}
            </FormErrorMessage>
          </FormControl>

          {/* Code Input (Visible only if Doctor is selected) */}
          {role === "doctor" && (
            <FormControl isInvalid={errors.code}>
              <Input
                placeholder="Enter doctor code"
                type="text"
                backdropBlur="gray.600"
                size="lg"
                mt={6}
                {...register("code", {
                  required: role === "doctor" ? "Doctor code is required" : false,
                  minLength: {
                    value: 4,
                    message: "Code must be at least 4 characters",
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
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This is required field",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            isLoading={isSubmitting}
            loadingText="Creating account..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Register
          </Button>
        </form>
        <Button
          onClick={() => navigate("/login", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};
