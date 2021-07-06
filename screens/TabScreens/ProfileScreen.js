import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUser, followUser, unfollowUser } from "../../actions/user";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getPost } from "../../actions/post";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class ProfileScreen extends React.Component {
  componentDidMount = () => {
    const { params } = this.props.route;
    if (params !== undefined) {
      this.props.getUser(params, "PROFILE");
    }
  };

  follow = () => {
    this.props.followUser(this.props.profile.uid);
  };
  unfollow = () => {
    this.props.unfollowUser(this.props.profile.uid);
  };

  goToPost = (post) => {
    this.props.getPost(post);
    this.props.navigation.navigate("OnePost");
  };

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);
  };
  render() {
    this.state = { isRefreshing: false };

    const { params } = this.props.route;
    this.props.navigation.setOptions({
      title: this.props.profile?.username?.toLowerCase(),
    });

    if (params == undefined || params == this.props.user.uid) {
      return (
        <ScrollView
          style={{
            ...styles.container,
          }}
        >
          <SafeAreaView>
            <View
              style={{
                width: "100%",
                height: 120,
                //borderWidth: 0.2,
                //borderColor: "lightgrey",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: this.props.user?.photo }}
                style={{ width: 90, height: 90, borderRadius: 45, margin: 20 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  right: 15,
                }}
              >
                <View style={styles.userStatsContainer}>
                  <Text style={styles.userStatsTextNumber}>
                    {this.props.user.posts?.length}
                  </Text>
                  <Text style={styles.userStatsText}>Posts</Text>
                </View>
                <View style={styles.userStatsContainer}>
                  <Text style={styles.userStatsTextNumber}>
                    {this.props.user.followers?.length}
                  </Text>
                  <Text style={styles.userStatsText}>Followers</Text>
                </View>
                <View style={styles.userStatsContainer}>
                  <Text style={styles.userStatsTextNumber}>
                    {this.props.user.following?.length}
                  </Text>
                  <Text style={styles.userStatsText}>Following</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                //borderWidth: 0.2,
                // borderColor: "lightgrey",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {this.props.user?.name}
              </Text>
            </View>

            <View
              style={{
                //borderWidth: 0.2,
                // borderColor: "lightgrey",
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <Text>{this.props.user?.bio}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: screenWidth,
              }}
            >
              <TouchableOpacity
                style={{
                  ...styles.followUnfollow,
                  flex: 1,
                }}
                onPress={() => firebase.auth().signOut()}
              >
                <Text style={{ fontWeight: "bold" }}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("EditProfileScreen")
                }
                style={{
                  ...styles.followUnfollow,
                  flex: 1,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              numColumns={3}
              data={this.props.user?.posts}
              extraData={this.state.isRefreshing}
              keyExtractor={(item) => JSON.stringify(item.date)}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this.onRefresh}
                />
              }
              style={{
                flex: 1,
                backgroundColor: "white",
                width: screenWidth,
                marginTop: 15,
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => this.goToPost(item, index)}
                  style={{
                    borderColor: "white",
                    borderRightWidth: 3,
                    borderBottomWidth: 3,
                  }}
                >
                  <Image
                    source={{ uri: item.photos[0] }}
                    style={{ width: screenWidth / 3, height: screenWidth / 3 }}
                  />
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </ScrollView>
      );
    } else {
      // **************************** OTHER USER PROFILE ***********************************
      return (
        <ScrollView style={styles.container}>
          <View
            style={{
              width: "100%",
              height: 120,
              //borderWidth: 0.2,
              //borderColor: "lightgrey",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: this.props.profile?.photo }}
              style={{ width: 90, height: 90, borderRadius: 45, margin: 20 }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                right: 15,
              }}
            >
              <View style={styles.userStatsContainer}>
                <Text style={styles.userStatsTextNumber}>
                  {this.props.profile.posts?.length}
                </Text>
                <Text style={styles.userStatsText}>Posts</Text>
              </View>
              <View style={styles.userStatsContainer}>
                <Text style={styles.userStatsTextNumber}>
                  {this.props.profile.followers?.length}
                </Text>
                <Text style={styles.userStatsText}>Followers</Text>
              </View>
              <View style={styles.userStatsContainer}>
                <Text style={styles.userStatsTextNumber}>
                  {this.props.profile.following?.length}
                </Text>
                <Text style={styles.userStatsText}>Following</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              //borderWidth: 0.2,
              // borderColor: "lightgrey",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {this.props.profile?.name}
            </Text>
          </View>
          <View
            style={{
              //borderWidth: 0.2,
              // borderColor: "lightgrey",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <Text>{this.props.profile?.bio}</Text>
          </View>

          {this.props.profile?.followers?.includes(this.props.user.uid) ? (
            <View
              style={{
                //borderWidth: 0.2,
                // borderColor: "lightgrey",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.unfollow()}
                style={styles.followUnfollow}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    margin: 2.5,
                  }}
                >
                  Following
                </Text>
                <MaterialCommunityIcons
                  style={{ marginTop: 3 }}
                  name="chevron-down"
                  size={20}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.followUnfollow}>
                <Text style={{ fontWeight: "bold" }}>Message</Text>
              </TouchableOpacity>
            </View>
          ) : (
            //DOES NOT FOLLOW PROFILE
            <View
              style={{
                //borderWidth: 0.2,
                // borderColor: "lightgrey",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.follow()}
                style={{
                  ...styles.followUnfollow,
                  backgroundColor: "#46A0F5",
                  width: "90%",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            numColumns={3}
            data={this.props.profile?.posts}
            keyExtractor={(item) => JSON.stringify(item.date)}
            extraData={this.state}
            style={{
              flex: 1,
              backgroundColor: "white",
              width: screenWidth,
              marginTop: 15,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.goToPost(item)}
                style={{
                  borderColor: "white",
                  borderRightWidth: 3,
                  borderBottomWidth: 3,
                }}
              >
                <Image
                  source={{ uri: item.photos[0] }}
                  style={{ width: screenWidth / 3, height: screenWidth / 3 }}
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getUser, followUser, unfollowUser, getPost },
    dispatch
  );
};
const mapStateToProps = (state) => {
  return { user: state.user, profile: state.profile };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 60,
    fontFamily: "logoFont",
    marginVertical: 60,
    color: "#46A0F5",
  },
  userStatsTextNumber: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userStatsContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  followUnfollow: {
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 0.5,
    borderRadius: 5,
    width: screenWidth * 0.45,
    height: 35,
    margin: screenWidth * 0.015,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  StatusBar: { backgroundColor: "white" },
});
