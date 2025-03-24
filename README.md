Missão Prática
Disciplina: RPG - 0023 | Vamos Criar um APP


# Meeting Mobile App

Este é um aplicativo móvel desenvolvido com **React Native** e **Expo Router**. O projeto foi criado para a empresa "Meeting" e tem como objetivo gerenciar fornecedores, permitindo o cadastro de novos fornecedores, a listagem filtrada de fornecedores e a navegação para o perfil de cada fornecedor.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Exemplos de Código](#exemplos-de-código)
- [Considerações Finais](#considerações-finais)

---

## Visão Geral

O aplicativo "Meeting" possui três telas principais:

1. **Home**: Tela inicial com botões para navegação – "Novo Cadastro" e "Listagem de Fornecedores".
2. **Cadastro de Fornecedores**: Tela para inserir informações (nome, endereço, contato, categoria) e para selecionar uma imagem do fornecedor a partir da galeria, utilizando o pacote `react-native-image-picker`.
3. **Listagem de Fornecedores**: Tela que exibe todos os fornecedores cadastrados, permitindo filtrar por categoria e localização. Também possibilita a navegação para uma tela de perfil via rota dinâmica.

O fluxo de navegação e a manipulação de estados utilizam conceitos do React Native, como componentes, hooks e props.

---

## Funcionalidades

- **Navegação com Expo Router**  
  A navegação entre as telas é gerenciada pelo Expo Router, que utiliza a estrutura de arquivos para definir as rotas. Por exemplo, para navegar para o perfil do fornecedor é utilizado:
  ```tsx
  router.push(`/perfil/${item.id}`);
  ```

Essa abordagem utiliza string interpolation para construir a URL da rota dinâmica, de acordo com a estrutura definida (por exemplo, app/perfil/[id].tsx).

Cadastro de Fornecedores A tela de cadastro contém campos para os dados do fornecedor e permite a seleção de uma imagem. Após a validação dos campos, os dados são agrupados em um objeto e passados para a tela de listagem através dos parâmetros da rota. Veja um trecho representativo:

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
// Após limpar os campos, redireciona para a listagem,
// passando o novo fornecedor como parâmetro:
router.push({
pathname: "/listagem",
params: { fornecedor: JSON.stringify(novoFornecedor) },
});
},
},
]);
};

Listagem e Filtros A tela de listagem permite filtrar fornecedores por categoria e localização. Caso um novo fornecedor tenha sido cadastrado, o hook useLocalSearchParams é utilizado para captar os parâmetros e atualizar o estado da lista, evitando duplicidades:

useEffect(() => {
if (searchParams.fornecedor) {
try {
const novoFornecedor = JSON.parse(searchParams.fornecedor as string);
setFornecedores((prevFornecedores) => {
if (prevFornecedores.find((f) => f.id === novoFornecedor.id)) {
return prevFornecedores;
}
return [...prevFornecedores, novoFornecedor];
});
} catch (error) {
console.log("Erro ao parsear o fornecedor:", error);
}
}
}, [searchParams]);

Tecnologias Utilizadas
React Native – Framework para criar interfaces móveis.

Expo Router – Gerencia as rotas e a navegação entre as telas.

react-native-image-picker – Permite a seleção de imagens a partir da galeria.

@react-native-picker/picker – Componente para seleção de itens (Pickers) nos filtros.

Estrutura do Projeto
A estrutura básica do projeto é a seguinte:

project-root/
├── app/
│ ├── index.tsx # Tela Home
│ ├── cadastro.tsx # Tela de Cadastro de Fornecedores
│ ├── listagem.tsx # Tela de Listagem de Fornecedores
│ └── perfil/
│ └── [id].tsx # Tela de Perfil (rota dinâmica)
├── assets/
│ └── images/
│ └── placeholder.png # Imagem padrão para fornecedores sem logo
├── package.json
└── README.md

> Observação: > A existência do arquivo de rota dinâmica (app/perfil/[id].tsx) é fundamental para que a navegação dinâmica funcione corretamente.
