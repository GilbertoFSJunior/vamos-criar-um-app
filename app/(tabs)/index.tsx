import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>meeting</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Novo Cadastro"
          onPress={() => router.push("/cadastro")}
          color="#4CAF50"
        />
        <View style={styles.spacing} />
        <Button
          title="Listagem Fornecedores"
          onPress={() => router.push("/listagem")}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#333",
    marginBottom: 40,
  },
  buttonsContainer: {
    width: "80%",
  },
  spacing: {
    height: 15,
  },
});

export default HomeScreen;

