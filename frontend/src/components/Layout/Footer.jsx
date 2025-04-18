import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer"
      w="100%"
      py={4}
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")} // Softer dark mode navbar
      color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
      px={8}>
      <Text textAlign="center" fontSize="sm">
        &copy; {new Date().getFullYear()} MalarIA Corps. <br /> Tout droit reservé.
      </Text>
    </Box>
  );
};

