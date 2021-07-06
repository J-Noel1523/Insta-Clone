import { forEach } from "lodash";
import * as firebase from "firebase";
import uuid from "uuid";
import db from "../config/Firebase";

export const updateDescription = (input) => {
  return { type: "UPDATE_DESCRIPTION", payload: input };
};

export const updateNextPhoto = (input) => {
  return async (dispatch, getState) => {
    try {
      let array = [];
      const { post } = getState();
      post.photos?.forEach((photo) => {
        array.push(photo);
      });
      array.push(input);
      dispatch({ type: "UPDATE_POST_NEXT_PHOTO", payload: array });
    } catch (error) {
      alert(error);
    }
  };
};

export const removeImage = (photoToRemove) => {
  return async (dispatch, getState) => {
    try {
      let array = [];
      const { post } = getState();
      post.photos?.forEach((photo) => {
        array.push(photo);
      });
      array.splice(photoToRemove, 1);
      dispatch({ type: "UPDATE_POST_NEXT_PHOTO", payload: array });
    } catch (error) {
      alert(error);
    }
  };
};

export const uploadPost = () => {
  return async (dispatch, getState) => {
    try {
      const { post, user } = getState();
      const id = uuid.v4();
      const upload = {
        id: id,
        uid: user.uid,
        photo: user.photo,
        photos: post.photos,
        username: user.username,
        date: new Date().getTime(),
        savedBy: [],
        likes: [],
        comments: [],
        description: post.description,
      };
      await db.collection("posts").doc(id).set(upload);
      await db
        .collection("users")
        .doc(user.uid)
        .update({
          posts: firebase.firestore.FieldValue.arrayUnion(id),
        });
    } catch (e) {
      alert(e);
    }
  };
};

export const getPosts = (numberOfPosts) => {
  return async (dispatch, getState) => {
    const posts = await db
      .collection("posts")
      .orderBy("date", "desc")
      .limit(numberOfPosts)
      .get();
    let array = [];
    posts.forEach((post) => {
      array.push(post.data());
    });
    dispatch({ type: "GET_POSTS", payload: array });
  };
};

export const getSavedPosts = (numberOfPosts) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user;
      const posts = await db
        .collection("posts")
        .orderBy("date", "desc")
        .where("savedBy", "array-contains", uid)
        .get();
      let array = [];
      posts.forEach((post) => {
        array.push(post.data());
      });
      dispatch({ type: "GET_SAVED_POSTS", payload: array });
    } catch (e) {
      console.log(e);
    }
  };
};

export const likePost = (post) => {
  return async (dispatch, getState) => {
    try {
      const { uid, username, photo } = getState().user;
      db.collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    } catch (e) {}
  };
};

export const unlikePost = (post) => {
  return async (dispatch, getState) => {
    try {
      const { uid, username, photo } = getState().user;
      db.collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } catch (e) {}
  };
};

export const savePost = (post) => {
  return async (dispatch, getState) => {
    try {
      const { uid, username, photo } = getState().user;
      db.collection("posts")
        .doc(post.id)
        .update({
          savedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
      db.collection("users")
        .doc(uid)
        .update({
          savedPosts: firebase.firestore.FieldValue.arrayUnion(post.id),
        });
    } catch (e) {}
  };
};

export const unsavePost = (post) => {
  return async (dispatch, getState) => {
    try {
      const { uid, username, photo } = getState().user;
      db.collection("posts")
        .doc(post.id)
        .update({
          savedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
      db.collection("users")
        .doc(uid)
        .update({
          savedPosts: firebase.firestore.FieldValue.arrayRemove(post.id),
        });
    } catch (e) {}
  };
};

export const getPost = (post) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_POST", payload: post });
    } catch (e) {
      alert(e);
    }
  };
};

export const addMessage = (text) => {
  return (dispatch, getState) => {
    const { uid, photo, username } = getState().user;

    try {
      const message = {
        message: text,
        photo: photo,
        username: username,
        uid: uid,
        date: new Date().getTime(),
      };
      db.collection("messages").doc().set(message);
    } catch (e) {
      alert(e);
    }
  };
};
