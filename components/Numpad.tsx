import { Box, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { Delete } from "lucide-react-native";
import { ReactNode, useRef, ComponentProps } from "react";

export type Numpad = {
  value?: string;
  onChange?: (value: string) => void;
};

const KEYS = [
  [null, null, "B"],
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  ["C", 0, "."],
];

const KeyContentMap: Record<string | number, ReactNode> = {
  B: <ButtonIcon as={Delete} size="xl" />,
};

const KeyActionMap: Record<
  string | number,
  ComponentProps<typeof Button>["action"]
> = {
  C: "negative",
  B: "secondary",
};

function getNextValue(key: string | number, currentValue: string) {
  if (key === "C") {
    return "";
  }

  if (key === "B") {
    return currentValue
      ? currentValue.slice(0, currentValue.length - 1)
      : currentValue;
  }

  if (key === "." && currentValue === "") {
    return "0.";
  }

  if (currentValue === "0" && typeof key === "number" && key > 0 && key < 10) {
    return key + "";
  }

  if (key === 0 && currentValue === "0") {
    return currentValue;
  }

  if (key === "." && currentValue.includes(".")) {
    return currentValue;
  }

  return currentValue + key;
}

export function Numpad(props: Numpad) {
  const { value, onChange } = props;
  const text = useRef("");

  return (
    <Box gap="$2">
      {KEYS.map((keyRow, keyRowIndex) => (
        <Box flexDirection="row" flexWrap="wrap" key={keyRowIndex} gap="$2">
          {keyRow.map((key, keyIndex) => (
            <Button
              key={`${keyRowIndex}${keyIndex}`}
              flex={1}
              variant="outline"
              size="xl"
              action={key === null ? undefined : KeyActionMap[key] ?? "primary"}
              opacity={key === null ? "$0" : "$100"}
              onPress={() => {
                if (typeof onChange === "function") {
                  if (key === null) {
                    return;
                  }

                  text.current = getNextValue(
                    key,
                    typeof value === "string" ? value : text.current
                  );

                  onChange(text.current);
                }
              }}
            >
              {key === null
                ? key
                : KeyContentMap[key] ?? (
                    <ButtonText size="xl">{key}</ButtonText>
                  )}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
}
