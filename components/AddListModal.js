import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../Colors";
import { AntDesign } from "@expo/vector-icons";

export default class AddListModal extends React.Component {
  backgroundcolor = [
    "#4a4e4d",
    "#0e9aa7",
    "#3da4ab",
    "#f6cd61",
    "#fe8a71",
    "#7bc043",
    "#0392cf",
  ];

  state = {
    name: "",
    color: this.backgroundcolor[0],
  };

  createTodo = () => {
    const { name, color } = this.state;

    const list = { name, color };
    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  renderColor() {
    return this.backgroundcolor.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        ></TouchableOpacity>
      );
    });
  }

  CheckTextInput = () => {
    const name = this.state;
    if (name.name != "") {
      {
        this.createTodo();
      }
    } else {
      alert("List title can't be empty!");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={-500}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 15, right: 20 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Todo List</Text>
          <TextInput
            style={styles.input}
            placeholder="Add List ?"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {this.renderColor()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.CheckTextInput}
          >
            <Text style={{ color: colors.white }}>Create!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 50,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 40,
    height: 30,
    borderRadius: 50,
  },
});
