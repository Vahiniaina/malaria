import React from 'react';
import { Box, Container, Center, Spinner, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

export const Welcome = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { user_id } = useParams();

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

    <Box
      w="100%"
      h="80%"
      maxW="container.lg"
      p={10}
      my={50}
      bg={bgColor}
      borderRadius="lg"
      shadow="2xl"
      textAlign="center"
      borderWidth="1px"
      alignContent="center"
    // borderColor={useColorModeValue('gray.200', 'gray.600')}
    >
      <Heading as="h2" size="xl" mb={6} color={textColor}>
        Hello, {user.username}! <br /> Welcome to Malaria Expert System
      </Heading>
      <Text fontSize="lg" mb={8} color={textColor}>
        We help with diagnosis, treatment with fuzzy rule-based decision making for malaria.
        Explore our expert system to create new cases and enhance malaria disease management.
      </Text>
    </Box>
  );
};

export default Welcome;
