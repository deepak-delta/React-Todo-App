import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import SafeArea from "../SafeArea";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class TodoModal extends React.Component {
  state = {
    newTodo: "",
  };

  toogleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);
    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    const createTwoButtonAlert = () =>
      Alert.alert(
        "Delete",
        "Do you want to delete this task?",
        [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "Yes", onPress: () => this.deleteTodo(index) },
        ],
        { cancelable: false }
      );

    return (
      <TouchableWithoutFeedback
        onLongPress={createTwoButtonAlert}
        delayLongPress={500}
      >
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toogleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              colors={colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: todo.completed ? "line-through" : "none",
                color: todo.completed ? colors.gray : colors.black,
              },
            ]}
          >
            {todo.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  CheckTextInput = () => {
    if (this.state.newTodo != "") {
      {
        this.addTodo();
      }
    } else {
      alert("Task name can't be empty!");
    }
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={-500}
      >
        <SafeAreaView style={[styles.container, styles.SafeArea]}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.CheckTextInput()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.yel,
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 20,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
