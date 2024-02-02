import {
  Box,
  Button,
  ButtonText,
  Card,
  Center,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Link, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";

export default function Home() {
  const { operation, operands } = useLocalSearchParams<{
    operation: string;
    operands: string;
  }>();
  return (
    <Center minHeight={Dimensions.get("window").height}>
      <VStack space="md">
        <Card width={Dimensions.get("window").width - 32}>
          <VStack space="md">
            <Heading>Math Drills</Heading>
            <Text>
              {operation} {operands}
            </Text>
          </VStack>
        </Card>
        <Link href="/" asChild>
          <Button variant="link">
            <ButtonText>Go Home</ButtonText>
          </Button>
        </Link>
      </VStack>
    </Center>
  );
}
