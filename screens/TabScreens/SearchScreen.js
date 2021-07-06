import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUser } from "../../actions/user";
import { StyleSheet, Text, View, Image } from "react-native";

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>SearchScreen</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

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
