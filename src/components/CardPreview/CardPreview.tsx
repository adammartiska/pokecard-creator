import cactus from "@/assets/images/my.png";
import pokeCardTemplate from "@/assets/images/poke-card-template.png";
import { Container } from "@mantine/core";
import React from "react";
import { Image, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";

export function CardPreview() {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const containerRef = React.useRef(null);

  const [containerDimensions, setContainerDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0,
  }); // Store the image dimensions

  const [image] = useImage(pokeCardTemplate);
  const url = "https://konvajs.github.io/assets/yoda.jpg";
  const [yodaImage] = useImage(cactus);

  console.log(image?.width);
  console.log(image?.height);

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

    if (containerRef?.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      console.log(width);
      setContainerDimensions({ width, height });
    }

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  console.log(containerRef?.current);

  return (
    <Container
      p="lg"
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        maxHeight: 800,
        position: "relative",
      }}
    >
      <Stage width={image?.width / 5} height={image?.height / 5}>
        <Layer>
          <Image
            image={image}
            width={image?.width / 5}
            height={image?.height / 5}
          />
          <Text
            text="50HP"
            fontSize={15}
            fontStyle="bold"
            fontFamily="Kavivanar"
            x={30}
            y={70}
            fill="green"
          />
          <Image image={yodaImage} width={200} height={200} x={150} y={150} />
        </Layer>
      </Stage>
    </Container>
  );
}
