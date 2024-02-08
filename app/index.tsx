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
  { icon: Plus, operation: "addition" },
  { icon: Minus, operation: "subtraction" },
  { icon: Asterisk, operation: "multiplication" },
  { icon: Divide, operation: "division" },
];

const viewport = Dimensions.get("window");

export default function Home() {
  return (
    <Center minHeight={viewport.height}>
      <VStack space="md">
        <Heading textAlign="center">Math Drills</Heading>
        <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
          {OPERATIONS.map((operation, index) => (
            <Box
              width={viewport.width / 2}
              height={viewport.width / 2}
              padding="$2"
              paddingLeft={index % 2 ? "$2" : "$4"}
              paddingRight={index % 2 ? "$4" : "$2"}
              key={operation.operation}
            >
              <Link href={`/drills/${operation.operation}`} asChild>
                <Button width="$full" height="$full">
                  <ButtonIcon as={operation.icon} width="$full" />
                </Button>
              </Link>
            </Box>
          ))}
        </Box>
      </VStack>
    </Center>
  );
}
