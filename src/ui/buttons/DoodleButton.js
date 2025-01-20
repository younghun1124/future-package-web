import { Button } from "@chakra-ui/react";

export default function DoodleButton({
  variant = "green",
  width = "140px",
  height = "60px",
  fontSize = "lg",
  onClick,
  children,
  ...props
}) {
  const getBgImage = () => {
    switch (variant) {
      case "white":
        return "https://storage.googleapis.com/future-box-cdn-public/static/assets/doodlebox/doodlebox_white_2x.webp";
      case "green":
      default:
        return "https://storage.googleapis.com/future-box-cdn-public/static/assets/doodlebox/doodlebox_green_2x.webp";
    }
  };

  return (
    <Button
      bgImage={`url('${getBgImage()}')`}
      bgSize="100% 100%"
      bgRepeat="no-repeat"
      bgPosition="center"
      h={height}
      w={width}
      border="none"
      color="black"
      fontSize='2xl'
      _hover={{ opacity: 0.9 }}
      _active={{ opacity: 0.8 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
