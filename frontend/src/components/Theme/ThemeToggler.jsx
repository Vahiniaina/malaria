import {  IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <IconButton
        id="theme-toggler"
        size="sm"
        icon={colorMode === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
        aria-label="Toggle theme"
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
        color={useColorModeValue("blackAlpha.900", "whiteAlpha.700")}
        _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.150") }}
        onClick={toggleColorMode}
        {...rest}
      />
    </>
  );
};
