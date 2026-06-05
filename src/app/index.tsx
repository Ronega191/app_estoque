import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

type Dados = {
  name: string;
  data: string;
  product: string;
}

export default function Index() {
  const [dados, setDados] = useState<Dados[]>([]);
  const [name, setname] = useState("");
  const [data, setdata] = useState("");
  const [product, setproduct] = useState(""); 

  function adicionar() {
    setDados((dados) => [...dados, { name, data, product}]);
    setname("");
    setdata("");
    setproduct("");
  }



  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text>Nome: </Text>
       <TextInput
        placeholder=""
        value={name}
        onChangeText={setname}
      />
      <Text>Data: </Text>
      <TextInput
        placeholder=""
        value={data}
        onChangeText={setdata}
      />
      <Text>Produto: </Text>
      <TextInput
        placeholder=""
        value={product}
        onChangeText={setproduct}
      />
      <Button title="Adicionar" onPress={adicionar} />
      </View>
      <View>
        <FlatList
          data={dados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>Nome: {item.name}</Text>
              <Text>Data: {item.data}</Text>
              <Text>Produto: {item.product}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  input: {
   flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textarea: {
    height: 100,
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  }
});
