import {
  Button,
  Center,
  Heading,
  VStack,
  ButtonIcon,
  Box,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Dimensions } from "react-native";
import { Plus, Minus, Asterisk, Divide } from "lucide-react-native";

const OPERATIONS = [
  [
    { icon: Plus, operation: "addition" },
    { icon: Minus, operation: "subtraction" },
  ],
  [
    { icon: Asterisk, operation: "multiplication" },
    { icon: Divide, operation: "division" },
  ],
];

const viewport = Dimensions.get("window");

export default function Home() {
  return (
    <Center minHeight={viewport.height}>
      <VStack space="md">
        <Heading textAlign="center">Math Drills</Heading>
        <Box gap="$4">
          {OPERATIONS.map((operationRows, operationRowIndex) => (
            <Box flexDirection="row" key={operationRowIndex} gap="$4">
              {operationRows.map((operationRow) => (
                <Link
                  key={operationRow.operation}
                  href={`/drills/${operationRow.operation}`}
                  asChild
                >
                  <Button flex={1} size="xl">
                    <ButtonIcon as={operationRow.icon} size="xl" />
                  </Button>
                </Link>
              ))}
            </Box>
          ))}
        </Box>
      </VStack>
    </Center>
  );
}
