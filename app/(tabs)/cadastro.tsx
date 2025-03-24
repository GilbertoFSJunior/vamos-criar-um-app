import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { launchImageLibrary } from "react-native-image-picker";

const CadastroFornecedor = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  const router = useRouter();

  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelado", "Nenhuma imagem foi selecionada.");
      } else if (response.errorCode) {
        Alert.alert("Erro", "Não foi possível selecionar a imagem.");
      } else if (response.assets && response.assets.length > 0) {
        if (response.assets[0].uri) {
          setImagemUri(response.assets[0].uri);
        } else {
          setImagemUri(null);
        }
      }
    });
  };

  const salvarFornecedor = () => {
    if (!nome || !endereco || !contato || !categoria) {
      Alert.alert("Erro", "Preencha todos os campos para salvar o fornecedor.");
      return;
    }

    const novoFornecedor = {
      id: Date.now().toString(),
      nome,
      endereco,
      contato,
      categoria,
      imagem: imagemUri,
    };

    Alert.alert("Sucesso", "Fornecedor cadastrado com sucesso!", [
      {
        text: "OK",
        onPress: () => {
          setNome("");
          setEndereco("");
          setContato("");
          setCategoria("");
          setImagemUri(null);
          router.push({
            pathname: "/listagem",
            params: { fornecedor: JSON.stringify(novoFornecedor) },
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={selecionarImagem}
      >
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Adicionar Logo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do fornecedor"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço do fornecedor"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>Contato:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o contato do fornecedor"
        value={contato}
        onChangeText={setContato}
      />

      <Text style={styles.label}>Categoria:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a categoria do fornecedor"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Button
        title="Salvar Fornecedor"
        onPress={salvarFornecedor}
        color="#4CAF50"
      />

      <View style={styles.navButtons}>
        <Button title="Home" onPress={() => router.push("/")} color="#2196F3" />
        <Button
          title="Listagem"
          onPress={() => router.push("/listagem")}
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    textAlign: "center",
    color: "#888",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default CadastroFornecedor;

