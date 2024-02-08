import {
  Box,
  Button,
  ButtonText,
  Card,
  Center,
  Input,
  InputField,
  Text,
  VStack,
  Heading,
} from "@gluestack-ui/themed";
import { Link, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import { Operators } from "./types";
import { useMemo, useState } from "react";

const clamp = (min: number, max: number) =>
  Math.max(min, Math.floor(Math.random() * max));

function getOperands(totalDigitsA: number, totalDigitsB: number) {
  const largestDigits = Math.max(totalDigitsA, totalDigitsB);
  const smallestDigits = Math.min(totalDigitsA, totalDigitsB);

  const leftOperand = clamp(
    Math.pow(10, Math.max(largestDigits - 1, 0)),
    Math.pow(10, Math.max(largestDigits, 1))
  );

  const rightOperand = clamp(
    Math.pow(10, Math.max(smallestDigits - 1, 0)),
    Math.pow(10, Math.max(smallestDigits, 1))
  );

  return [
    Math.max(leftOperand, rightOperand),
    Math.min(leftOperand, rightOperand),
  ];
}

const MAX_ATTEMPTS = 10;

export default function Operands() {
  const { operation, operands } = useLocalSearchParams<{
    operation: Operators;
    // number of digits for each operand
    operands: `${number}x${number}`;
  }>();

  const [totalDigitsA, totalDigitsB] = (operands ?? "1x1")
    .split("x")
    .map((n) => (Number(n) < 0 ? 1 : Number(n)));

  const [attempt, setAttempt] = useState(1);
  const [answer, setAnswer] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  const [leftOperand, rightOperand] = useMemo(
    () => getOperands(totalDigitsA, totalDigitsB),
    [attempt]
  );

  let operator: string = "+";
  let correctAnswer: number = 0;

  switch (operation) {
    case "addition":
      operator = "+";
      correctAnswer = leftOperand + rightOperand;
      break;
    case "subtraction":
      operator = "-";
      correctAnswer = leftOperand - rightOperand;
      break;
    case "multiplication":
      operator = "*";
      correctAnswer = leftOperand * rightOperand;
      break;
    case "division":
      operator = "/";
      correctAnswer = leftOperand / rightOperand;
      break;
  }

  return (
    <Center minHeight={Dimensions.get("window").height}>
      <VStack space="md">
        <Card width={Dimensions.get("window").width - 32}>
          {attempt > MAX_ATTEMPTS ? (
            <VStack space="md">
              <Heading>Done!</Heading>
              <Text>
                Score: {totalCorrectAnswers} / {MAX_ATTEMPTS}
              </Text>
            </VStack>
          ) : (
            <VStack space="md">
              <Heading>Question #{attempt}</Heading>
              <Box flexDirection="row" justifyContent="flex-end">
                <Text alignSelf="flex-end" fontSize="$6xl" lineHeight="$6xl">
                  {operator}
                </Text>
                <Box>
                  <Text fontSize="$6xl" lineHeight="$6xl" textAlign="right">
                    {leftOperand}
                  </Text>
                  <Text fontSize="$6xl" lineHeight="$6xl" textAlign="right">
                    {rightOperand}
                  </Text>
                </Box>
              </Box>
              <Input variant="outline" size="xl" flexGrow={1}>
                <InputField
                  keyboardType="numeric"
                  textAlign="right"
                  placeholder="Enter Answer"
                  selectTextOnFocus={true}
                  onChangeText={(text) => {
                    if (text) {
                      setAnswer(Number(text));
                    }
                  }}
                />
              </Input>
              <Button
                onPress={() => {
                  if (answer === correctAnswer) {
                    setTotalCorrectAnswers(
                      (totalCorrectAnswers) => totalCorrectAnswers + 1
                    );
                  }
                  setAttempt((attempt) => attempt + 1);
                }}
              >
                <ButtonText>Submit</ButtonText>
              </Button>
            </VStack>
          )}
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
