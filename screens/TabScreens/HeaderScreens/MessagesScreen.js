import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { addMessage } from "../../../actions/post";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

class MessagesScreen extends React.Component {
  state = { messages: [], message: "" };
  constructor(props) {
    super(props);
    this.subscriber = firebase
      .firestore()
      .collection("messages")
      .limit(50)
      .orderBy("date", "desc")
      .onSnapshot((docs) => {
        let messages = [];
        docs.forEach((doc) => {
          messages.push(doc.data());
        });
        this.setState({ messages });
      });
  }

  sendMessage = () => {
    if (this.state.message.replace(/\s/g, "").length) {
      this.props.addMessage(this.state.message);
      this.setState({ message: "" });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 100}
        style={styles.container}
      >
        <FlatList
          inverted
          keyExtractor={(item) => JSON.stringify(item.date)}
          data={this.state.messages}
          style={{
            flex: 1,
            width: "100%",
            padding: 15,
          }}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 45 / 2,
                  }}
                />
                <Text
                  style={{ fontSize: 7, color: "black", fontWeight: "bold" }}
                >
                  {item.username}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#46A0F5",
                  borderRadius: 15,
                  marginHorizontal: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginHorizontal: 15,
                    color: "white",
                  }}
                >
                  {item.message}
                </Text>
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "grey" }}>
                  {moment(item?.date).format("MMM D, YYYY")}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderTop: 0.5,
            borderColor: "grey",
            margin: 15,
          }}
        >
          <TextInput
            style={{
              width: "75%",
              height: 50,
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: "black",
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            onChangeText={(message) => this.setState({ message })}
            value={this.state.message}
            returnKeyType="send"
            placeholder="Send Message..."
            onSubmitEditing={this.sendMessage}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#46A0F5",
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => this.sendMessage()}
          >
            <Text
              style={[
                !this.state.message.replace(/\s/g, "").length
                  ? {
                      color: "grey",
                      fontSize: 20,
                      margin: 10,
                      color: "rgba(255,255,255,0.5)",
                    }
                  : {
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 20,
                      fontSize: 20,
                      margin: 10,
                      color: "white",
                    },
              ]}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addMessage }, dispatch);
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 60,
    fontFamily: "logoFont",
    marginVertical: 60,
    color: "#46A0F5",
  },
});
