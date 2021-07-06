import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login } from "../../actions/user";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class Login extends React.Component {
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
            <Text style={styles.logo}>Insta-Clone</Text>
            <View style={{ top: 100 }}>
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 5,
                }}
              >
                <Text style={{ left: 5 }}>Email</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="example@example.com"
                onChangeText={(input) => this.props.updateEmail(input)}
                value={this.props.user.email}
              />
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 5,
                }}
              >
                <Text style={{ left: 5 }}>Password</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="* * * * * *"
                secureTextEntry={true}
                onChangeText={(input) => this.props.updatePassword(input)}
                value={this.props.user.password}
              />
            </View>

            <View style={styles.loginBtnContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.props.login()}
              >
                <Text style={styles.loginBtnText}>LOGIN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ProfilePicture")}
                style={styles.signUpTouchableOpacity}
              >
                <Text style={{ color: "black" }}>Don't have an account? </Text>
                <Text style={{ color: "#46A0F5", fontWeight: "bold" }}>
                  Signup!
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  top: 250,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "grey", fontSize: 18 }}>From</Text>
                <Text style={{ fontSize: 20 }}>Jerry Noel</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch);
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
  logo: {
    fontSize: 60,
    fontFamily: "logoFont",
    marginVertical: 60,
    color: "#46A0F5",
  },
  loginBtnContainer: {
    width: screenWidth,
    alignItems: "center",
    margin: 120,
  },
  loginBtn: {
    backgroundColor: "#46A0F5",
    width: screenWidth * 0.4,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  signUpTouchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
