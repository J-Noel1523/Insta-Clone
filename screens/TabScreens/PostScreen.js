import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "../../actions/index";
import { updateNextPhoto, removeImage } from "../../actions/post";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class PostScreen extends React.Component {
  state = {
    urlChosen: undefined,
  };

  openLibrary = async () => {
    try {
      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      if (status.granted === true) {
        const image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        if (!image.cancelled) {
          const url = await this.props.uploadPhoto(image);
          this.props.updateNextPhoto(url);
          this.setState({ urlChosen: url });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  changeChosenUrl = (url) => {
    this.setState({ urlChosen: url });
  };

  removeImage = (url) => {
    const position = this.props.post.photos.indexOf(url);
    this.props.removeImage(position);
    this.setState({ urlChosen: this.props.post.photos[0] });
    if (this.props.post.photos?.length == 2) {
      this.setState({ urlChosen: this.props.post.photos[0] });
    } else {
      this.setState({ urlChosen: undefined });
    }
  };

  uploadPost = () => {
    this.props.navigation.navigate("PostCheckout");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={
            Platform.OS == "ios"
              ? {
                  width: screenWidth,
                  height: 55,
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                }
              : {
                  height: 55,
                  borderBottomWidth: 1,

                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  borderBottomColor: "lightgrey",
                }
          }
        >
          <Text
            style={{
              margin: 10,
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 20,
            }}
          >
            Create a new post
          </Text>
          <TouchableOpacity
            onPress={() => this.uploadPost()}
            style={{ margin: 10, marginTop: 20 }}
          >
            <Text
              style={{
                margin: 10,
                fontWeight: "bold",
                fontSize: 22,
                color: "#46A0F5",
              }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: screenWidth, height: 360 }}>
          <Image
            source={require("../../assets/backgrounds/Patterns-Wallpaper-.png")}
            style={{
              position: "absolute",
              zIndex: -1,
              width: screenWidth,
              height: screenHeight * 1.3,
            }}
          />
          {this.state.urlChosen == undefined ? (
            <View
              style={{
                width: screenWidth,
                height: 360,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: screenWidth,
                  height: 360,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.openLibrary()}
              >
                <View
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 65 / 2,
                    backgroundColor: "rgba(0,0,0, 0.1)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 40 }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ width: screenWidth, height: 360 }}>
              <Image
                source={{ uri: this.state.urlChosen }}
                style={{ width: screenWidth, height: 360 }}
              />
              <TouchableOpacity
                onPress={() => this.removeImage(this.state.urlChosen)}
                style={{ position: "absolute", bottom: 30, right: 30 }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color={"black"}
                  size={35}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            width: screenWidth,
            justifyContent: "center",
            alignItems: "center",
            top: 100,
          }}
        >
          {this.props.post.photos == undefined ||
          this.props.post.photos?.length === 3 ||
          this.props.post.photos?.length === 0 ? null : (
            <TouchableOpacity
              style={{
                width: 95,
                height: 90,
                backgroundColor: "rgba(0,0,0, 0.1)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 5,
              }}
              onPress={() => this.openLibrary()}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(0,0,0, 0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 30 }}>+</Text>
              </View>
            </TouchableOpacity>
          )}

          {this.props.post.photos?.map((e) => (
            <TouchableOpacity onPress={() => this.changeChosenUrl(e)}>
              <Image
                source={{ uri: e }}
                style={{
                  width: 95,
                  height: 90,
                  backgroundColor: "rgba(0,0,0, 0.1)",
                  borderRadius: 10,
                  margin: 5,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, uploadPhoto, updateNextPhoto, removeImage },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user, post: state.post };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
