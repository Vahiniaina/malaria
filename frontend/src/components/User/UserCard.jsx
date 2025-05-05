import { Badge, Flex, Text, Box, useToast, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axiosInstance from "../../services/axios";
import { useState } from "react";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const deleteUser = (user_id) => {
    axiosInstance
      .delete(`/admin/delete_user/${user_id}`)
      .then(() => {
        toast({
          title: "user deleted successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could'nt delete user",
          status: "error",
          isClosable: true,
          duration: 2000,
        });
      })
      .finally(() => navigate('administration/user_management', { replace: true }));
  };

  return (
    <Flex
      bg={useColorModeValue("gray.300", "gray.600")}
      minHeight="5rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/user/${user.user_id}`, { replace: true })}
    >
      <Text>{user.username}</Text>

      <Text>{user.role}</Text>

      <Badge colorScheme={user.disabled ? "green" : "purple"}>
        {user.disabled ? "Active" : "Desactiver"}
      </Badge>

      <Box p={4}>
        <Button
          colorScheme="blue"
          leftIcon={<EditIcon />}
        >
          Modifier
        </Button>
        <Button
          colorScheme="red"

          // onClick={deleteUser(user.user_id)}
          leftIcon={<DeleteIcon />}
        >
          Supprimer
        </Button>
      </Box>

    </Flex>
  );
};
