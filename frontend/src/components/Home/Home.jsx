import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Image,
  SimpleGrid,
  VStack,
  Button,
  Input,
  Textarea,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import Slider from "react-slick";

// Adjusted Unsplash images using the "featured" endpoint
const bannerImages = [
  "https://source.unsplash.com/featured/1600x600?malaria",
  "https://source.unsplash.com/featured/1600x600?mosquito",
  "https://source.unsplash.com/featured/1600x600?treatment",
];

// Slick Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};
// ... imports restent inchangés

export const Home = () => {
  const COLORS = {
    bannerBg: useColorModeValue("whiteAlpha.600", "blackAlpha.600"),
    impactText: useColorModeValue("gray.800", "whiteAlpha.900"),
    projectBorder: useColorModeValue("gray.200", "gray.600"),
    aboutBg: useColorModeValue("gray.100", "gray.700"),
    footerBg: useColorModeValue("blue.900", "blue.600"),
    footerText: useColorModeValue("white", "whiteAlpha.900"),
    footerLink: useColorModeValue("gray.300", "gray.200"),
  };

  return (
    <>
      {/* Section Impact */}
      <Container maxW="container.lg" py="20vh">
        <Heading as="h2" size="xl" textAlign="center" mb={4} color={COLORS.impactText}>
          Notre Impact Contre le Paludisme
        </Heading>
        <Text fontSize="lg" textAlign="center" color={COLORS.impactText}>
          Le paludisme demeure un problème majeur de santé publique. Notre plateforme fournit{" "}
          <strong>
            des données en temps réel, des services de diagnostic et traitement basés sur un système expert, ainsi qu'une documentation approfondie
          </strong>{" "}
          pour aider à combattre efficacement le paludisme.
        </Text>
      </Container>

      {/* Section Projets */}
      <Container maxW="container.lg" py={10} color={COLORS.impactText}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Projets en Vedette
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?ai"
              alt="Diagnostic IA"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              Diagnostic par IA
            </Heading>
            <Text>
              Notre système expert basé sur l'IA aide à diagnostiquer efficacement le paludisme.
            </Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?data"
              alt="Données en temps réel"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              Données en Temps Réel
            </Heading>
            <Text>
              Suivez les épidémies de paludisme grâce à des statistiques actualisées.
            </Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?education"
              alt="Campagnes de sensibilisation"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              Campagnes de Sensibilisation
            </Heading>
            <Text>
              Nous menons des programmes de sensibilisation pour éduquer sur la prévention du paludisme.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Section À Propos */}
      <Container maxW="container.lg" py={10} bg={COLORS.aboutBg} color={COLORS.impactText} borderRadius="lg">
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          À Propos de Nous
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Nous sommes une équipe dévouée de chercheurs, professionnels de la santé et scientifiques des données travaillant à éradiquer le paludisme grâce à la technologie et à l’éducation.
        </Text>
      </Container>

      {/* Section Contact */}
      <Container maxW="container.md" py={10}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Contactez-Nous
        </Heading>
        <VStack spacing={4}>
          <Input placeholder="Votre nom" />
          <Input placeholder="Votre adresse e-mail" type="email" />
          <Textarea placeholder="Votre message" />
          <Button colorScheme="blue">Envoyer le message</Button>
        </VStack>
      </Container>

      {/* Pied de Page */}
      <Box bg={COLORS.footerBg} color={COLORS.footerText} py={6} mt={10}>
        <Container maxW="container.lg">
          <SimpleGrid columns={[1, 2]} spacing={6} textAlign="center">
            <Box>
              <Heading as="h4" size="md">
                Liens Rapides
              </Heading>
              <Link href="#" color={COLORS.footerLink}>
                Accueil
              </Link>{" "}
              |{" "}
              <Link href="#" color={COLORS.footerLink}>
                Données
              </Link>{" "}
              |{" "}
              <Link href="#" color={COLORS.footerLink}>
                Documentation
              </Link>
            </Box>
            <Box>
              <Heading as="h4" size="md">
                Contact
              </Heading>
              <Text>Email : malaria-info@example.com</Text>
              <Text>Téléphone : +123 456 7890</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
