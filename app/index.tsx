import {
  Button,
  ButtonText,
  Card,
  Center,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Dimensions } from "react-native";

const OPERATIONS = [
  { operation: "addition", label: "Addition" },
  { operation: "subtraction", label: "Subtraction" },
  { operation: "multiplication", label: "Multiplication" },
  { operation: "division", label: "Division" },
];

export default function Home() {
  return (
    <Center minHeight={Dimensions.get("window").height}>
      <Card width={Dimensions.get("window").width - 32}>
        <VStack space="md">
          <Heading textAlign="center">Math Drills</Heading>
          {OPERATIONS.map((operation) => (
            <Link
              href={`/drills/${operation.operation}`}
              key={operation.operation}
              asChild
            >
              <Button>
                <ButtonText>{operation.label}</ButtonText>
              </Button>
            </Link>
          ))}
        </VStack>
      </Card>
    </Center>
  );
}
