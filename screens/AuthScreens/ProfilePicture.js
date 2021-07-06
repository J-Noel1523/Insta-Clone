import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { uploadPhoto } from "../../actions/index";
import { updatePhoto } from "../../actions/user";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class ProfileScreen extends React.Component {
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
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
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
                bottom: 100,
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
                    source={{ uri: this.props.user.photo }}
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")}
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
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch);
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
