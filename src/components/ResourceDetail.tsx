import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Image,
  Title,
  Text,
  Button,
  Badge,
  Skeleton,
  Alert,
  Accordion,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { fetchHomeworld, fetchPerson } from "../api";

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { data: person, isLoading: personLoading, error: personError } = useQuery(["person", id], () => fetchPerson(id));
  const {
    data: homeworld,
    isLoading: homeworldLoading,
    error: homeworldError,
  } = useQuery(["homeworld", person?.homeworld], () => fetchHomeworld(person?.homeworld), {
    enabled: !!person?.homeworld,
  });

  if (personError || homeworldError) {
    return (
      <Container size="lg" py={50}>
        <Alert color="red">An error occurred while fetching data.</Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py={50}>
      {/* Hero Section with Image */}
      <Card shadow="xl" radius="lg" p="xl" style={{ position: "relative", overflow: "hidden" }}>
        {personLoading ? (
          <Skeleton height={300} radius="md" />
        ) : (
          <Image
            src={person?.image ? person.image : "https://via.placeholder.com/1200x500"}
            alt={person?.name}
            height={300}
            radius="md"
            withPlaceholder
          />
        )}
        <Title align="center" mt={20} order={1}>
          {personLoading ? <Skeleton width={200} height={30} radius="md" /> : person?.name}
        </Title>
        <Text align="center" color="dimmed" size="lg">
          {personLoading ? <Skeleton width={300} height={20} radius="md" /> : `Detailed information about ${person?.name}`}
        </Text>
      </Card>
      
      {/* Details Section */}
      <Grid mt={30} gutter={30}>
        <Grid.Col md={6}>
          <Card shadow="sm" p="xl" radius="md" withBorder>
            <Title order={2} mb={20}>Personal Information</Title>
            {personLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="blue" variant="light">Height</Badge>}
            <Text size="lg">{personLoading ? <Skeleton width={50} height={20} radius="md" /> : `${person?.height} cm`}</Text>
            {personLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="green" variant="light" mt={10}>Mass</Badge>}
            <Text size="lg">{personLoading ? <Skeleton width={50} height={20} radius="md" /> : `${person?.mass} kg`}</Text>
            {personLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="yellow" variant="light" mt={10}>Birth Year</Badge>}
            <Text size="lg">{personLoading ? <Skeleton width={100} height={20} radius="md" /> : person?.birth_year}</Text>
            {personLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="pink" variant="light" mt={10}>Eye Color</Badge>}
            <Text size="lg">{personLoading ? <Skeleton width={100} height={20} radius="md" /> : person?.eye_color}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col md={6}>
          <Card shadow="sm" p="xl" radius="md" withBorder>
            <Title order={2} mb={20}>Homeworld Details</Title>
            {homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="violet" variant="light">Name</Badge>}
            <Text size="lg">{homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : homeworld?.name}</Text>
            {homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="cyan" variant="light" mt={10}>Population</Badge>}
            <Text size="lg">{homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : homeworld?.population}</Text>
            {homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="orange" variant="light" mt={10}>Climate</Badge>}
            <Text size="lg">{homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : homeworld?.climate}</Text>
            {homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : <Badge color="teal" variant="light" mt={10}>Terrain</Badge>}
            <Text size="lg">{homeworldLoading ? <Skeleton width={100} height={20} radius="md" /> : homeworld?.terrain}</Text>
          </Card>
        </Grid.Col>
      </Grid>
      
      {/* Additional Information */}
      <Accordion mt={40}>
        <Accordion.Item label="More Details">
          <Text size="md">More information about {person?.name} will be displayed here.</Text>
        </Accordion.Item>
      </Accordion>
      
      {/* Back Button */}
      <Button
        component={Link}
        to="/resources"
        leftIcon={<IconArrowLeft />}
        size="lg"
        variant="light"
        mt={30}
      >
        Back to List
      </Button>
    </Container>
  );
};

export default ResourceDetailPage;
