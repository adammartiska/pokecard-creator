import { Container, SimpleGrid, Skeleton } from "@mantine/core";
import { Form } from "../Form/Form";

export function Layout() {
  return (
    <Container py="md" fluid style={{ height: "100vh" }}>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing="lg"
        style={{ height: "100%" }}
      >
        <Skeleton radius="md" animate={false} />
        <Form />
        {/* <Skeleton radius="md" animate={false} /> */}
      </SimpleGrid>
    </Container>
  );
}
