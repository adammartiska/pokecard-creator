import pokeCardTemplate from "@/assets/images/poke-card-template.png";
import { Container, Image, SimpleGrid } from "@mantine/core";
import { Form } from "../Form/Form";
import React from "react";
import { CardPreview } from "../CardPreview/CardPreview";

export function Layout() {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0,
  }); // Store the image dimensions

  const updateImageDimensions = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  React.useEffect(() => {
    // Set initial dimensions
    updateImageDimensions();

    // Update dimensions when window is resized
    const handleResize = () => {
      updateImageDimensions();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(imageDimensions);

  return (
    <Container py="md" fluid style={{ height: "100vh" }}>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing="lg"
        style={{ height: "100%" }}
      >
        {/* <Container
          p="lg"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            maxHeight: 800,
            position: "relative",
          }}
        >
          <Image
            radius="md"
            src={pokeCardTemplate}
            fit="contain"
            w="60%" // Use 100% height to fill the container
            ref={imageRef}
            style={{ aspectRatio: 0.7184 }}
          />
          <div style={{ zIndex: 20, position: "absolute", top: 500 }}>ahoj</div>
        </Container> */}
        <CardPreview />
        <Form />
      </SimpleGrid>
    </Container>
  );
}
