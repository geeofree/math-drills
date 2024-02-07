import {
  Button,
  Card,
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
  { icon: Plus, operation: "addition" },
  { icon: Minus, operation: "subtraction" },
  { icon: Asterisk, operation: "multiplication" },
  { icon: Divide, operation: "division" },
];

export default function Home() {
  return (
    <Center minHeight={Dimensions.get("window").height}>
      <Card width={Dimensions.get("window").width - 32}>
        <VStack space="md">
          <Heading textAlign="center">Math Drills</Heading>
          <Box flexDirection="row" flexWrap="wrap">
            {OPERATIONS.map((operation, index) => (
              <Box
                flexDirection="row"
                key={operation.operation}
                width="50%"
                justifyContent={index % 2 ? "flex-start" : "flex-end"}
                padding="$2"
              >
                <Link
                  href={`/drills/${operation.operation}`}
                  key={operation.operation}
                  asChild
                >
                  <Button>
                    <ButtonIcon as={operation.icon} />
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>
        </VStack>
      </Card>
    </Center>
  );
}
