import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Divider,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const Documentation = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h2" mb={8} textAlign="center" color="teal.500">
        Documentation sur le Paludisme
      </Heading>
      <Text fontSize="xl" mb={10} textAlign="justify">
        Ce document a pour vocation d’offrir une vue d’ensemble complète du paludisme – ses causes, modes de transmission, symptômes, moyens de prévention, traitements, ainsi que des études de cas, notamment à Madagascar. Destiné à des fins éducatives, ce guide détaillé vise à sensibiliser et informer sur cette maladie dévastatrice.
      </Text>

      <Stack spacing={10}>
        {/* Introduction */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Introduction
          </Heading>
          <Text textAlign="justify" mb={4}>
            Le paludisme est une maladie parasitaire causée par des protozoaires du genre <em>Plasmodium</em>. Transmis principalement par la piqûre de moustiques infectés du genre <em>Anopheles</em>, il représente un problème de santé publique majeur dans les régions tropicales et subtropicales du globe. Malgré les avancées médicales, le paludisme continue de faire des ravages, affectant des millions de personnes chaque année.
          </Text>
          <Text textAlign="justify">
            La compréhension des mécanismes de transmission et des facteurs environnementaux est essentielle pour mettre en place des stratégies efficaces de prévention et de traitement.
          </Text>
        </Box>
        <Divider />

        {/* Causes et Transmission */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Causes et Transmission
          </Heading>
          <Text textAlign="justify" mb={4}>
            Le paludisme est provoqué par différentes espèces de <strong>Plasmodium</strong>, notamment <strong>P. falciparum</strong>, <strong>P. vivax</strong>, <strong>P. ovale</strong> et <strong>P. malariae</strong>. Le mode de transmission le plus courant reste la piqûre d'une femelle moustique infectée.
          </Text>
          <Text textAlign="justify" mb={4}>
            D’autres modes de transmission incluent la transmission congénitale, les transfusions sanguines et, plus rarement, le partage d’aiguilles contaminées. Les variations climatiques telles que la température et l’humidité influent également sur la reproduction des moustiques, rendant certaines régions plus vulnérables que d’autres.
          </Text>
          <Flex direction="column" pl={4}>
            <Text fontWeight="bold" mb={2}>Modes de transmission :</Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Piqûre de moustique infecté
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Transmission par voie sanguine
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Transmission congénitale
              </ListItem>
            </List>
          </Flex>
        </Box>
        <Divider />

        {/* Symptômes et Diagnostic */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Symptômes et Diagnostic
          </Heading>
          <Text textAlign="justify" mb={4}>
            Les symptômes du paludisme apparaissent généralement entre 10 et 15 jours après l’infection et incluent :
          </Text>
          <List spacing={2} pl={4} mb={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Fièvre élevée et frissons
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Céphalées et douleurs musculaires
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Nausées et vomissements
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Fatigue extrême
            </ListItem>
          </List>
          <Text textAlign="justify">
            Le diagnostic repose principalement sur l’examen microscopique du sang et les tests de détection rapide des antigènes. Dans certains cas, la réaction en chaîne par polymérase (PCR) est utilisée pour confirmer l’infection.
          </Text>
        </Box>
        <Divider />

        {/* Prévention */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Prévention
          </Heading>
          <Text textAlign="justify" mb={4}>
            La lutte contre le paludisme repose sur un ensemble de mesures préventives visant à réduire la transmission. Parmi celles-ci, on compte :
          </Text>
          <List spacing={2} pl={4} mb={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              L’utilisation de moustiquaires imprégnées d’insecticide
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              La pulvérisation d’insecticides à l’intérieur des habitations
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              La gestion des zones de reproduction des moustiques
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              La sensibilisation et l’éducation des populations à risque
            </ListItem>
          </List>
          <Text textAlign="justify">
            Ces stratégies, combinées à une amélioration de l'accès aux soins, permettent de réduire significativement l'incidence de la maladie dans les zones endémiques.
          </Text>
        </Box>
        <Divider />

        {/* Traitement */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Traitement
          </Heading>
          <Text textAlign="justify" mb={4}>
            Le traitement du paludisme repose sur l'administration de médicaments antipaludiques. Selon la gravité de l'infection et le type de <em>Plasmodium</em> impliqué, les traitements varient :
          </Text>
          <List spacing={2} pl={4} mb={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Traitement à base d'artémisinine combinée (ACT)
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Utilisation d'antipaludiques tels que la quinine ou la chloroquine (selon la résistance)
            </ListItem>
          </List>
          <Text textAlign="justify">
            Pour les formes graves, une hospitalisation et des soins de soutien (comme l'hydratation et la gestion des complications) sont souvent nécessaires.
          </Text>
        </Box>
        <Divider />

        {/* Le Paludisme à Madagascar */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Le Paludisme à Madagascar
          </Heading>
          <Text textAlign="justify" mb={4}>
            Madagascar est l'un des pays les plus touchés par le paludisme en raison de ses conditions climatiques favorables à la reproduction des moustiques.
            Les zones côtières et les régions humides présentent une incidence particulièrement élevée, tandis que les hauts plateaux sont moins exposés.
          </Text>
          <Text textAlign="justify" mb={4}>
            Des initiatives gouvernementales et des partenariats avec des organisations internationales visent à améliorer la prévention, le diagnostic et le traitement
            du paludisme dans le pays. La distribution de moustiquaires imprégnées, les campagnes de sensibilisation et l’amélioration de l’accès aux soins sont
            au cœur de ces efforts.
          </Text>
          <Text textAlign="justify">
            La recherche locale continue de jouer un rôle essentiel pour adapter les stratégies de lutte contre le paludisme aux réalités du terrain et réduire
            l’impact de cette maladie sur la population.
          </Text>
        </Box>
        <Divider />

        {/* Recherches et Innovations */}
        <Box>
          <Heading as="h3" size="lg" mb={4} color="blue.600">
            Recherches et Innovations
          </Heading>
          <Text textAlign="justify" mb={4}>
            La lutte contre le paludisme est un domaine de recherche dynamique qui évolue constamment. Des projets novateurs portent sur la génétique
            des moustiques, la résistance aux médicaments et le développement de vaccins. Les collaborations internationales contribuent
            à accélérer la mise au point de solutions efficaces et durables.
          </Text>
          <Text textAlign="justify">
            Les avancées récentes permettent d'envisager un futur où le paludisme pourrait être significativement réduit, voire éliminé, grâce à des
            stratégies intégrées alliant prévention, traitement et recherche.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default Documentation;
