import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class PostComponent extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  state = {
    liked: undefined,
    numLike: 0,
    saved: undefined,
  };

  likePost = () => {
    if (
      this.props.item?.likes.includes(this.props.user.uid) ||
      this.state.liked == true
    ) {
      if (this.state.liked == false) {
        this.setState({ liked: true });
        this.setState({ numLike: this.state.numLike + 1 });
        this.props.likePost(this.props.item);
      } else {
        this.setState({ liked: false });
        this.setState({ numLike: this.state.numLike - 1 });
        this.props.unlikePost(this.props.item);
      }
    } else {
      this.setState({ liked: true });
      this.setState({ numLike: this.state.numLike + 1 });
      this.props.likePost(this.props.item);
    }
  };

  savePost = () => {
    if (
      this.props.item?.savedBy.includes(this.props.user.uid) ||
      this.state.saved == true
    ) {
      if (this.state.liked == false) {
        this.setState({ saved: true });
        this.props.savePost(this.props.item);
      } else {
        this.setState({ saved: false });

        this.props.unsavePost(this.props.item);
      }
    } else {
      this.setState({ saved: true });

      this.props.savePost(this.props.item);
    }
  };

  render() {
    return (
      <View style={{ marginBottom: 15 }}>
        <View
          style={{
            width: screenWidth,
            backgroundColor: "white",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                "ProfileScreen",
                this.props.item?.uid
              );
            }}
            style={{
              flexDirection: "row",
              margin: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: this.props.item?.photo }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
              }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16, margin: 10 }}>
              {this.props.item?.username.toLowerCase()}
            </Text>
          </TouchableOpacity>
          <Text style={{ margin: 15 }}>
            {<MaterialCommunityIcons name="dots-vertical" size={26} />}
          </Text>
        </View>
        <View>
          <ScrollView pagingEnabled={true} horizontal={true}>
            {this.props.item?.photos.map((e) => (
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
        <View
          style={{
            width: screenWidth,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.likePost()}
              style={{ margin: 10 }}
            >
              {this.props.item?.likes.includes(this.props.user.uid) &&
              this.state.liked == undefined ? (
                <MaterialCommunityIcons
                  style={{ color: "red" }}
                  name="heart"
                  size={26}
                />
              ) : this.state.liked == true ? (
                <MaterialCommunityIcons
                  style={{ color: "red" }}
                  name="heart"
                  size={26}
                />
              ) : (
                <MaterialCommunityIcons
                  style={{ color: "black" }}
                  name="heart-outline"
                  size={26}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 0 }}>
              <MaterialCommunityIcons name="chat-outline" size={26} />
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10 }}>
              <MaterialCommunityIcons
                style={{
                  transform: [{ rotateZ: "-40deg" }],
                  marginTop: -6,
                }}
                name="send-outline"
                size={26}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.savePost()}
            style={{ margin: 10 }}
          >
            {this.props.item?.savedBy.includes(this.props.user.uid) &&
            this.state.saved == undefined ? (
              <MaterialCommunityIcons
                style={{ color: "black" }}
                name="archive-arrow-down"
                size={26}
              />
            ) : this.state.saved == true ? (
              <MaterialCommunityIcons
                style={{ color: "black" }}
                name="archive-arrow-down"
                size={26}
              />
            ) : (
              <MaterialCommunityIcons
                style={{ color: "black" }}
                name="archive-arrow-down-outline"
                size={26}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={{ marginHorizontal: 10, fontWeight: "bold" }}>
          {this.props.item?.likes.length + this.state.numLike} likes
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
            {this.props.item?.username.toLowerCase()}
          </Text>
          <Text> {this.props.item?.description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ marginLeft: 10, color: "grey" }}>
            View all comments: {this.props.item?.comments.length}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: this.props.user.photo }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 25 / 2,
                marginLeft: 10,
              }}
            />
            <Text style={{ marginLeft: 10, color: "grey" }}>
              Add a comment...
            </Text>
          </View>
        </View>
        <Text style={{ marginLeft: 10, color: "grey" }}>
          {moment(this.props.item?.date).format("MMM D, YYYY")}
        </Text>
      </View>
    );
  }
}
