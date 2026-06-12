import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Produto = {
  codigo: string;
  nome: string;
  estoque: number;
};

const PRODUTOS_INICIAIS: Produto[] = [
  { codigo: "LIM001", nome: "Detergente Neutro", estoque: 50 },
  { codigo: "LIM002", nome: "Agua Sanitaria", estoque: 30 },
  { codigo: "LIM003", nome: "Desinfetante", estoque: 20 },
  { codigo: "LIM004", nome: "Multiuso", estoque: 15 },
  { codigo: "LIM005", nome: "Sabao Liquido", estoque: 40 },
  { codigo: "LIM006", nome: "Amaciante", estoque: 25 },
  { codigo: "LIM007", nome: "Alcool 70%", estoque: 8 },
  { codigo: "LIM008", nome: "Esponja", estoque: 60 },
  { codigo: "LIM009", nome: "Pano Microfibra", estoque: 12 },
  { codigo: "LIM010", nome: "Limpa Vidros", estoque: 6 },
];

export default function Index() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    salvarProdutos();
  }, [produtos]);

  async function carregarProdutos() {
    const dados = await AsyncStorage.getItem("estoque");

    if (dados) {
      setProdutos(JSON.parse(dados));
    } else {
      setProdutos(PRODUTOS_INICIAIS);
    }
  }

  async function salvarProdutos() {
    await AsyncStorage.setItem(
      "estoque",
      JSON.stringify(produtos)
    );
  }

  function adicionarEstoque(codigo: string) {
    setProdutos((lista) =>
      lista.map((item) =>
        item.codigo === codigo
          ? { ...item, estoque: item.estoque + 1 }
          : item
      )
    );
  }

  function retirarEstoque(codigo: string) {
    setProdutos((lista) =>
      lista.map((item) =>
        item.codigo === codigo && item.estoque > 0
          ? { ...item, estoque: item.estoque - 1 }
          : item
      )
    );
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  const totalItens = produtos.reduce(
    (acc, item) => acc + item.estoque,
    0
  );

  const estoqueBaixo = produtos.filter(
    (item) => item.estoque <= 10
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        📦 Controle de Estoque
      </Text>

      <View style={styles.dashboard}>
        <View style={styles.cardResumo}>
          <Text style={styles.numero}>
            {produtos.length}
          </Text>
          <Text style={styles.label}>
            Produtos
          </Text>
        </View>

        <View style={styles.cardResumo}>
          <Text style={styles.numero}>
            {totalItens}
          </Text>
          <Text style={styles.label}>
            Unidades
          </Text>
        </View>

        <View style={styles.cardResumo}>
          <Text style={styles.numero}>
            {estoqueBaixo}
          </Text>
          <Text style={styles.label}>
            Alertas
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="🔍 Pesquisar produto..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.codigo}>
                {item.codigo}
              </Text>

              <Text style={styles.estoque}>
                Estoque: {item.estoque}
              </Text>

              {item.estoque <= 10 && (
                <Text style={styles.alerta}>
                  ⚠️ Estoque Baixo
                </Text>
              )}
            </View>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botaoMais}
                onPress={() =>
                  adicionarEstoque(item.codigo)
                }
              >
                <Text style={styles.textoBotao}>
                  +
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoMenos}
                onPress={() =>
                  retirarEstoque(item.codigo)
                }
              >
                <Text style={styles.textoBotao}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FF",
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0A4DA2",
    textAlign: "center",
    marginBottom: 20,
  },

  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  cardResumo: {
    backgroundColor: "#0A4DA2",
    width: "31%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  numero: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  label: {
    color: "#FFF",
    marginTop: 5,
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DCE9FF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A4DA2",
  },

  codigo: {
    color: "#777",
    marginTop: 2,
  },

  estoque: {
    marginTop: 5,
    fontWeight: "600",
  },

  alerta: {
    color: "#FF4D4D",
    fontWeight: "bold",
    marginTop: 5,
  },

  botoes: {
    flexDirection: "row",
  },

  botaoMais: {
    backgroundColor: "#0A4DA2",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  botaoMenos: {
    backgroundColor: "#3D7DFF",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});