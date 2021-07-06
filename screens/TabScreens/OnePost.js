import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUser } from "../../actions/user";
import {
  getPosts,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
} from "../../actions/post";
import PostComponent from "../Components/PostComponent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class HomeScreen extends React.Component {
  render() {
    this.props.navigation.setOptions({
      title: "Posts",
    });
    return (
      <PostComponent
        item={this.props.post.onePost}
        user={this.props.user}
        likePost={(item) => this.props.likePost(item)}
        unlikePost={(item) => this.props.unlikePost(item)}
        savePost={(item) => this.props.savePost(item)}
        unsavePost={(item) => this.props.unsavePost(item)}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, getPosts, likePost, unlikePost, savePost, unsavePost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user, post: state.post };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: 400,
    width: 400,
    marginVertical: 100,
  },
  logo: {
    fontSize: 60,
    fontFamily: "logoFont",
    marginVertical: 60,
    color: "#46A0F5",
  },
  statusbar: { backgroundColor: "white" },
});
