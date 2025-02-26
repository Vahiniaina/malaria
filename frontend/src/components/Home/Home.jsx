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

export const Home = () => {
  // Define theme-based color constants using alpha values
  const COLORS = {
    bannerBg: useColorModeValue("whiteAlpha.600", "blackAlpha.600"),
    impactText: useColorModeValue("gray.800", "whiteAlpha.900"), // Lighter text in dark mode
    projectBorder: useColorModeValue("gray.200", "gray.600"),
    aboutBg: useColorModeValue("gray.100", "gray.700"),
    footerBg: useColorModeValue("blue.900", "blue.600"),
    footerText: useColorModeValue("white", "whiteAlpha.900"),
    footerLink: useColorModeValue("gray.300", "gray.200"),
  };

  return (
    <>
      {/* Banner Carousel */}
      {/* Uncomment below to enable the carousel */}
      {/*
      <Box bg={COLORS.bannerBg}>
        <Slider {...carouselSettings}>
          {bannerImages.map((img, index) => (
            <Box key={index}>
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="400px"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/1600x600?text=Image+not+available"
              />
            </Box>
          ))}
        </Slider>
      </Box>
      */}

      {/* Impact Section */}
      <Container maxW="container.lg" py="20vh">
        <Heading as="h2" size="xl" textAlign="center" mb={4} color={COLORS.impactText}>
          Our Impact Against Malaria
        </Heading>
        <Text fontSize="lg" textAlign="center" color={COLORS.impactText}>
          Malaria remains a major global health issue. Our platform provides{" "}
          <strong>
            real-time data, expert system services for diagnosis and treatment, and in-depth documentation
          </strong>{" "}
          to help combat malaria effectively.
        </Text>
      </Container>

      {/* Projects Section */}
      <Container maxW="container.lg" py={10} color={COLORS.impactText}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Featured Projects
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?ai"
              alt="AI Diagnosis"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              AI-Powered Diagnosis
            </Heading>
            <Text>
              Our AI-based expert system helps diagnose malaria efficiently.
            </Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?data"
              alt="Real-time Data"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              Real-time Malaria Data
            </Heading>
            <Text>
              Track malaria outbreaks with up-to-date statistics.
            </Text>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={COLORS.projectBorder}>
            <Image
              src="https://source.unsplash.com/featured/300x200?education"
              alt="Awareness Campaigns"
              fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
            />
            <Heading size="md" mt={3}>
              Awareness Campaigns
            </Heading>
            <Text>
              We run awareness programs to educate people about malaria prevention.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* About Us Section */}
      <Container maxW="container.lg" py={10} bg={COLORS.aboutBg}  color={COLORS.impactText} borderRadius="lg">
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          About Us
        </Heading>
        <Text fontSize="lg" textAlign="center">
          We are a dedicated team of researchers, healthcare professionals, and data scientists working to eradicate
          malaria through technology and education.
        </Text>
      </Container>

      {/* Contact Us Section */}
      <Container maxW="container.md" py={10}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Contact Us
        </Heading>
        <VStack spacing={4}>
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" type="email" />
          <Textarea placeholder="Your Message" />
          <Button colorScheme="blue">Send Message</Button>
        </VStack>
      </Container>

      {/* Footer */}
      <Box bg={COLORS.footerBg} color={COLORS.footerText} py={6} mt={10}>
        <Container maxW="container.lg">
          <SimpleGrid columns={[1, 2]} spacing={6} textAlign="center">
            <Box>
              <Heading as="h4" size="md">
                Quick Links
              </Heading>
              <Link href="#" color={COLORS.footerLink}>
                Home
              </Link>{" "}
              |{" "}
              <Link href="#" color={COLORS.footerLink}>
                Data
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
              <Text>Email: malaria-info@example.com</Text>
              <Text>Phone: +123 456 7890</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
