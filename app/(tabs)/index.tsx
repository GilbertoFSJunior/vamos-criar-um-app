import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Nome do App */}
      <Text style={styles.appName}>meeting</Text>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Novo Cadastro"
          onPress={() => router.push("/cadastro")}
          color="#4CAF50" // Cor customizada
        />
        <View style={styles.spacing} />
        <Button
          title="Listagem Fornecedores"
          onPress={() => router.push("/listagem")}
          color="#2196F3" // Cor customizada
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
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100, // Substitua para ajustar o tamanho
    height: 100,
    borderRadius: 50, // Circular
    backgroundColor: "#ddd", // Placeholder caso a imagem falhe
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
    height: 15, // Espaçamento entre os botões
  },
});

export default HomeScreen;
