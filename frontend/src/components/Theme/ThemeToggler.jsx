import { IconButton, useColorMode, Text, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  const bgColor = useColorModeValue("whiteAlpha 900", "blackAlpha 50");
  const textColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const hoverTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha 300");

  return (
    <>
      <IconButton
        id="theme-toggler"
        size="sm"
        icon={colorMode === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
        aria-label="Toggle theme"
        bg={bgColor}
        color={textColor}
        _hover={{ color: hoverTextColor }}
        onClick={toggleColorMode}
        {...rest}

      />
      {showLabel && (
        <Text
          fontSize="sm"
          onClick={toggleColorMode}
          bg={bgColor}
          color={textColor}
          _hover={{ color: hoverTextColor }}
        >
          {colorMode === "dark" ? "Light mode" : "Dark mode"}
        </Text>
      )}
    </>
  );
};
