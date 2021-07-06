import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { updateDescription } from "../../../actions/post";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class PostCheckout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/backgrounds/Patterns-Wallpaper-.png")}
          style={{
            position: "absolute",
            zIndex: -1,
            width: screenWidth,
            height: screenHeight * 1.3,
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Type in your description..."
          onChangeText={(input) => this.props.updateDescription(input)}
          value={this.props.post.description}
        />

        <ScrollView pagingEnabled={true} horizontal={true}>
          {this.props.post.photos?.map((e) => (
            <Image
              source={{ uri: e }}
              style={{
                width: screenWidth,
                height: 360,
                backgroundColor: "rgba(0,0,0, 0.1)",
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDescription }, dispatch);
};
const mapStateToProps = (state) => {
  return { user: state.user, post: state.post };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostCheckout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    fontSize: 60,
    fontFamily: "logoFont",
    marginVertical: 60,
    color: "#46A0F5",
  },
  textInput: {
    borderRadius: 10,
    padding: 10,
    height: 50,
    width: screenWidth * 0.9,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    margin: 50,
    fontSize: 20,
  },
});
