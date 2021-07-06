import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUser } from "../../actions/user";
import { StyleSheet, Text, View, Image } from "react-native";

class Login extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
        if (this.props.user != null) {
          this.props.navigation.navigate("StackNavigator");
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "StackNavigator" }],
          });
        }
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Insta-Clone</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
