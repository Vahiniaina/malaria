import { Box, Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
// import { AddUpdateCaseModal } from "./AddUpdateCaseModal";
import { UserCard } from "../User/UserCard";

export const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    console.log("fetch users use effect")
    fetchUsers();
    isMounted.current = true;
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    console.log("fetching user");
    axiosInstance
      .get("/admin/get_all_user")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data, "on succes");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      mt={9}
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")} // Softer dark mode navbar
      color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
    >
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {users?.map((user) => (
            <UserCard user={user} key={user.user_id} />
          ))}
        </Box>
      )}
    </Box>
  );
};
