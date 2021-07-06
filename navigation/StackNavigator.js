import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import PostCheckout from "../screens/TabScreens/Upload/PostCheckout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { uploadPost, getPosts } from "../actions/post";
import SavedPosts from "../screens/TabScreens/HeaderScreens/SavedPosts";
import MessagesScreen from "../screens/TabScreens/HeaderScreens/MessagesScreen";
import ProfileScreen from "../screens/TabScreens/ProfileScreen";
import OnePost from "../screens/TabScreens/OnePost";
import EditProfileScreen from "../screens/TabScreens/EditProfileScreen";
const Stack = createStackNavigator();

class myStack extends React.Component {
  uploadPost = () => {
    this.props.navigation.navigate("TabNavigator");
    alert("Posted!");
    this.props.uploadPost();
    this.props.getPosts();
  };
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{ headerShown: true, title: "SavedPosts" }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="OnePost"
          component={OnePost}
          options={{
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{
            title: "Messages",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="PostCheckout"
          component={PostCheckout}
          options={{
            headerShown: true,
            title: "See your post",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.uploadPost()}
                style={{
                  margin: 15,
                }}
              >
                <MaterialCommunityIcons
                  name="check-bold"
                  color={"#46A0F5"}
                  size={30}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPost, getPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(myStack);
