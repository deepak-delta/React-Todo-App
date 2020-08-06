import { StatusBar } from "expo-status-bar";
import React from "react";
import { YellowBox } from "react-native";
import _ from "lodash";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import colors from "./Colors";
import { AntDesign } from "@expo/vector-icons";

import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import delta from "./assets/delta.jpeg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uh oh,Somethinf went wrong");
      }
      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Modal
              animationType="slide"
              visible={this.state.addTodoVisible}
              onRequestClose={() => this.toggleAddTodoModal()}
            >
              <AddListModal
                closeModal={() => this.toggleAddTodoModal()}
                addList={this.addList}
              />
            </Modal>
            <View>
              <Image source={delta} style={styles.delta} />
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.divider} />

              <Text style={styles.title}>
                Todo <Text style={styles.list}>List</Text>
              </Text>
              <View style={styles.divider} />
            </View>

            <View style={{ marginVertical: 38 }}>
              <TouchableOpacity
                style={styles.addList}
                onPress={() => this.toggleAddTodoModal()}
              >
                <AntDesign name="plus" size={16} color={colors.blue} />
              </TouchableOpacity>
            </View>

            <View style={{ height: 275 }}>
              <FlatList
                data={this.state.lists}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  delta: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },

  divider: {
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 40,
  },
  list: {
    fontWeight: "200",
    color: colors.blue,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
