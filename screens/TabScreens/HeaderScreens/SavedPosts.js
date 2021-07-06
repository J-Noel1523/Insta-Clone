import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUser } from "../../../actions/user";
import {
  getSavedPosts,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
} from "../../../actions/post";
import PostComponent from "../../Components/PostComponent";
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

class SavedPosts extends React.Component {
  componentDidMount = () => {
    this.props.getSavedPosts();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {
          <FlatList
            data={this.props.post.saved_feed}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderItem={({ item }) => (
              <PostComponent
                item={item}
                likePost={(item) => this.props.likePost(item)}
                unlikePost={(item) => this.props.unlikePost(item)}
                savePost={(item) => this.props.savePost(item)}
                unsavePost={(item) => this.props.unsavePost(item)}
                user={this.props.user}
              />
            )}
          />
        }
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, getSavedPosts, likePost, unlikePost, savePost, unsavePost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user, post: state.post };
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedPosts);

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
  statusbar: { backgroundColor: "white" },
});
