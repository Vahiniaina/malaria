import {
    Button,
    Center,
    Container,
    Spinner,
    Text,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axiosInstance from "../../services/axios";
  import { UpdateUserModal } from "./UpdateUserModal";
  
  export const UserAdmin = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const { user_id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");
  
    useEffect(() => {
      if (isMounted.current) return;
      fetchUser();
      isMounted.current = true;
    }, [user_id]);
  
    const fetchUser = () => {
      setLoading(true);
      axiosInstance
        .get(`/users/me`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    };
  
   
  
    if (loading) {
      return (
        <Container mt={6}>
          <Center mt={6}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="green.200"
              color="green.500"
              size="xl"
            />
          </Center>
        </Container>
      );
    }
  
    return (
      <>
        <Container mt={6}>
          <Button
            colorScheme="gray"
            onClick={() => navigate("/", { replace: true })}
          >
            Back
          </Button>
        </Container>
        <Container
          bg={background}
          minHeight="7rem"
          my={3}
          p={3}
          rounded="lg"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={22} fontWeight="bold">
            {user.username}
          </Text>
  
          <Text fontSize={18} fontWeight="semibold" mt={2}>
            email:
          </Text>
          <Text bg="gray.500" p={2} rounded="lg">
            {user.email}
          </Text>
  
          <Text fontSize={18} fontWeight="semibold" mt={2}>
             Name:
          </Text>
          <Text bg="gray.500" p={2} rounded="lg">
            {user.first_name}       {user.last_name}
          </Text>
  
          
  
        
          <UpdateUserModal
            my={3}
            editable={true}
            defaultValues={{
              email: user.email,
              last_name: user.last_name,
              firt_name: user.firt_name,
            }}
            onSuccess={fetchUser}
          />
          
        </Container>
      </>
    );
  };
  