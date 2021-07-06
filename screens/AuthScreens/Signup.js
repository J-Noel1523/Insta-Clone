import { Component } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateUsername,
  signup,
} from "../../actions/user";
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

class Signup extends React.Component {
  state = {
    repeat: "",
  };
  onSignupPress = () => {
    if (
      this.props.user.password == this.state.repeat &&
      this.props.user.username !== ""
    ) {
      this.props.signup();
    } else {
      alert("Not identical");
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
            <Text style={styles.logo}>Insta-Clone</Text>
            <View style={{ bottom: 50 }}>
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
              <View
                style={{
                  width: screenWidth * 0.9,
                  marginTop: 5,
                }}
              >
                <Text style={{ left: 5 }}>Confirm Password</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="* * * * * *"
                secureTextEntry={true}
                onChangeText={(input) => this.setState({ repeat: input })}
                value={this.state.repeat}
              />
            </View>
            <View style={styles.signupBtnContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => this.onSignupPress()}
              >
                <Text style={styles.loginBtnText}>SIGNUP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
                style={styles.signUpTouchableOpacity}
              >
                <Text style={{ color: "black" }}>
                  Already have an account?{" "}
                </Text>
                <Text style={{ color: "#46A0F5", fontWeight: "bold" }}>
                  Login
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  marginTop: 200,
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
  return bindActionCreators(
    { updateEmail, updatePassword, updateUsername, signup },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 2,
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
    marginVertical: 20,
    color: "#46A0F5",
  },
  signupBtnContainer: {
    width: screenWidth,
    alignItems: "center",
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
