import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const ListagemFornecedores = () => {
  const [categoria, setCategoria] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [fornecedores, setFornecedores] = useState([
    {
      id: "1",
      nome: "Fornecedor A",
      categoria: "Alimentos",
      localizacao: "Rio de Janeiro",
      imagem: null,
    },
    {
      id: "2",
      nome: "Fornecedor B",
      categoria: "Tecnologia",
      localizacao: "São Paulo",
      imagem: null,
    },
    {
      id: "3",
      nome: "Fornecedor C",
      categoria: "Vestuário",
      localizacao: "Belo Horizonte",
      imagem: null,
    },
  ]);

  const router = useRouter();

  const fornecedoresFiltrados = fornecedores.filter(
    (fornecedor) =>
      (categoria === "" || fornecedor.categoria === categoria) &&
      (localizacao === "" || fornecedor.localizacao === localizacao)
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca por categoria */}
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={categoria}
          style={styles.picker}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Alimentos" value="Alimentos" />
          <Picker.Item label="Tecnologia" value="Tecnologia" />
          <Picker.Item label="Vestuário" value="Vestuário" />
        </Picker>
      </View>

      {/* Campo de busca por localização */}
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Localização:</Text>
        <Picker
          selectedValue={localizacao}
          style={styles.picker}
          onValueChange={(itemValue) => setLocalizacao(itemValue)}
        >
          <Picker.Item label="Todas" value="" />
          <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
          <Picker.Item label="São Paulo" value="São Paulo" />
          <Picker.Item label="Belo Horizonte" value="Belo Horizonte" />
        </Picker>
      </View>

      {/* Botão de busca */}
      <Button title="Buscar" onPress={() => {}} color="#4CAF50" />

      {/* Lista de fornecedores */}
      <FlatList
        data={fornecedoresFiltrados.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        )} // Ordena alfabeticamente
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.fornecedorItem}
            onPress={() => router.push(`/perfil/${item.id}` as any)} // Redireciona para o perfil (Tela 4)
          >
            <Image
              source={
                item.imagem
                  ? { uri: item.imagem }
                  : require("../../assets/images/placeholder.png") // Caminho correto
              }
              style={styles.imagem}
            />

            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhes}>Categoria: {item.categoria}</Text>
              <Text style={styles.detalhes}>
                Localização: {item.localizacao}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum fornecedor encontrado.</Text>
        )}
      />

      {/* Botões de navegação */}
      <View style={styles.navButtons}>
        <Button title="Home" onPress={() => router.push("/")} color="#2196F3" />
        <Button
          title="Cadastrar Fornecedor"
          onPress={() => router.push("/cadastro")}
          color="#FF5722"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  filterContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  fornecedorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
  },
  imagem: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: "#ddd",
    borderRadius: 25,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
  },
  detalhes: {
    color: "#555",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ListagemFornecedores;
