import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  List,
  ListItem,
  ListIcon,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const HowTo = () => {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={6}>
        Guide Utilisateur - MalarIA
      </Heading>

      <VStack align="start" spacing={6}>
        <Box>
          <Heading as="h2" size="lg">Accès et Navigation</Heading>
          <Text>L'application web MalarIA est accessible localement sur le port <b>3000</b>.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Page d'accueil</Heading>
          <Text>
            La page d'accueil permet d'accéder aux différentes fonctionnalités de l'application. Vous pouvez basculer en mode sombre grâce au bouton soleil/lune dans la barre de navigation.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Accès aux Données</Heading>
          <Text>
            En cliquant sur le bouton <b>Data</b>, vous accédez aux données analytiques sur l'état du paludisme.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Documentation</Heading>
          <Text>
            Le bouton <b>Documentation</b> vous redirige vers une page d'informations sur le paludisme et son traitement.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Utilisation du Système Expert</Heading>
          <Text>
            Pour accéder au <b>système expert</b>, cliquez sur <b>Expert System</b>. Si vous n'êtes pas authentifié, vous serez redirigé vers la page de connexion.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Gestion des Cas</Heading>
          <Text>
            Vous pouvez créer un nouveau cas en cliquant sur <b>Add new case</b>. Ensuite, vous pourrez ajouter des symptômes et obtenir un diagnostic.
          </Text>
        </Box>

        <Button colorScheme="blue" onClick={() => window.history.back()}>
          Retour
        </Button>
      </VStack>
    </Box>
  );
};

export default HowTo;
