import { Button } from "@chakra-ui/react";

export default function DoodleButton({
  variant = "green",
  width = "200px",
  height = "60px",
  fontSize = "lg",
  onClick,
  children,
  ...props
}) {
  const getBgImage = () => {
    switch (variant) {
      case "white":
        return "/doodlebox_white.svg";
      case "green":
      default:
        return "/greenButton.png";
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
