import { StyleSheet, Text } from "react-native";

export const BottomLabel = () => {
  return <Text style={styles.bottomLabel}>Володимир Шевель, ЗІПЗ-22-1</Text>;
};

const styles = StyleSheet.create({
  bottomLabel: {
    position: "absolute",
    bottom: 10,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    alignSelf: 'center'
  },
});
