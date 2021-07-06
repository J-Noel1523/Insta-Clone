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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import {
  updatePhoto,
  updateEmail,
  updatePassword,
  updateUsername,
  updateName,
  updateBio,
  signup,
  updateUser,
} from "../../actions/user";
import { uploadPhoto } from "../../actions";
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
  TextInput,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class EditProfile extends React.Component {
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
          this.props.updatePhoto(url);
          //this.setState({ url: url });
          this.setState({ urlChosen: url });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  async onEdit() {
    try {
      await this.props.updateUser();
      this.setState({ message: "Profile updated successfully!" });
    } catch (e) {
      alert(e);
    }
  }
  state = {
    message: "",
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/backgrounds/Patterns-Wallpaper-.png")}
            style={{
              position: "absolute",
              zIndex: -1,
              width: screenWidth,
              height: screenHeight * 1.3,
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              bottom: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: "black",
                margin: 15,
              }}
            >
              Choose a profile picture
            </Text>
            {this.props.user.photo == undefined ? (
              <TouchableOpacity onPress={() => this.openLibrary()}>
                <View
                  style={{
                    width: screenWidth * 0.5,
                    height: screenWidth * 0.5,
                    borderRadius: screenWidth * 0.25,
                    backgroundColor: "#46A0F5",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-box"
                    style={{
                      color: "rgba(255,255,255, 0.8)",
                      fontSize: 100,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.openLibrary()}>
                <Image
                  source={{ uri: this.props.user?.photo }}
                  style={{
                    width: screenWidth * 0.5,
                    height: screenWidth * 0.5,
                    borderRadius: screenWidth * 0.25,
                    backgroundColor: "#46A0F5",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </TouchableOpacity>
            )}

            <View style={{ bottom: 10 }}>
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 20,
                }}
              >
                <Text style={{ left: 5 }}>Name</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                onChangeText={(input) => this.props.updateName(input)}
                value={this.props.user?.name}
              />
            </View>

            <View style={{ bottom: 10 }}>
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 20,
                }}
              >
                <Text style={{ left: 5 }}>Username</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="EXAMPLEME"
                onChangeText={(input) => this.props.updateUsername(input)}
                value={this.props.user.username}
                autoCapitalize={"characters"}
              />
            </View>

            <View style={{ bottom: 10 }}>
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 20,
                }}
              >
                <Text style={{ left: 5 }}>Bio</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Bio..."
                onChangeText={(input) => this.props.updateBio(input)}
                value={this.props.user.bio}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.onEdit()}
              style={{
                margin: 20,
                padding: 20,
                borderRadius: 20,
                backgroundColor: "rgba(0,0,0,0.05)",
                width: screenWidth * 0.9,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 24, color: "black" }}
              >
                Update Profile
              </Text>
            </TouchableOpacity>
            <Text>{this.state.message}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePhoto,
      uploadPhoto,
      updateUser,
      updateEmail,
      updatePassword,
      updateName,
      signup,
      updateUsername,
      updateBio,
    },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
  textInput: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 15,
    padding: 10,
    height: 50,
    width: screenWidth * 0.9,
    backgroundColor: "white",
  },
});
