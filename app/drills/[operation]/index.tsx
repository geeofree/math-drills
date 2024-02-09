import {
  Box,
  Button,
  ButtonText,
  Center,
  Heading,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Operators } from "./types";

export default function Operation() {
  const { operation } = useLocalSearchParams<{ operation: Operators }>();

  const [operands, setOperands] = useState<{
    leftOperand: number;
    rightOperand: number;
  }>({ leftOperand: 1, rightOperand: 1 });

  return (
    <Center minHeight={Dimensions.get("window").height}>
      <VStack space="md" width="$full" padding="$4">
        <Heading>Drills: {operation}</Heading>
        <Text>Enter no. of operands:</Text>

        <Box
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          gap="$2"
        >
          <Input variant="rounded" size="md" flexGrow={1}>
            <InputField
              value={operands.leftOperand ? operands.leftOperand + "" : ""}
              keyboardType="numeric"
              selectTextOnFocus={true}
              onChangeText={(text) =>
                setOperands((operands) => ({
                  ...operands,
                  leftOperand: text ? Number(text) : 0,
                }))
              }
            />
          </Input>

          <Text>by</Text>

          <Input variant="rounded" size="md" flexGrow={1}>
            <InputField
              value={operands.rightOperand ? operands.rightOperand + "" : ""}
              keyboardType="numeric"
              onChangeText={(text) =>
                setOperands((operands) => ({
                  ...operands,
                  rightOperand: text ? Number(text) : 0,
                }))
              }
            />
          </Input>
        </Box>

        <Link
          href={`/drills/${operation}/${operands.leftOperand}x${operands.rightOperand}`}
          asChild
        >
          <Button>
            <ButtonText>Start</ButtonText>
          </Button>
        </Link>

        <Link href="/" asChild>
          <Button variant="link">
            <ButtonText>Go Home</ButtonText>
          </Button>
        </Link>
      </VStack>
    </Center>
  );
}
