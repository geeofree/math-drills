import { GluestackUIProvider, ScrollView } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Slot } from "expo-router";
import { Dimensions, StatusBar } from "react-native";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <ScrollView
        height={Dimensions.get("window").height}
        paddingTop={StatusBar.currentHeight}
      >
        <Slot />
      </ScrollView>
    </GluestackUIProvider>
  );
}
