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
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          //translucent
          barStyle="dark-content"
          backgroundColor="rgba(255, 255, 255, 1.251)"
        />
        <View
          style={{
            width: screenWidth,
            height: 50,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            borderBottomWidth: 0.25,
            borderBottomColor: "rgba(0,0,0,0.05)",
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 35,
                fontFamily: "logoFont",
              }}
            >
              Insta-Clone
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SavedPosts")}
            >
              <MaterialCommunityIcons
                style={{
                  marginHorizontal: 15,
                  color: "red",
                }}
                name="heart"
                size={26}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MessagesScreen")}
            >
              <MaterialCommunityIcons
                style={{ transform: [{ rotateZ: "-40deg" }], marginTop: -6 }}
                name="send-outline"
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          <FlatList
            data={this.props.post.feed}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderItem={({ item }) => (
              <PostComponent
                item={item}
                user={this.props.user}
                likePost={(item) => this.props.likePost(item)}
                unlikePost={(item) => this.props.unlikePost(item)}
                savePost={(item) => this.props.savePost(item)}
                unsavePost={(item) => this.props.unsavePost(item)}
                navigation={this.props.navigation}
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
    { getUser, getPosts, likePost, unlikePost, savePost, unsavePost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user, post: state.post, profile: state.profile };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
