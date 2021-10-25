import "./App.css";
import { useState, useRef, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import JsonPlaceholder from "./pages/JsonPlaceholder";
import DeletePosts from "./pages/DeletePosts";
import DesktopNav from "./components/common/Navbar/DesktopNav";
import Profile from "./pages/Profile";
import ResetPassword from './pages/ResetPassword';
import socialfire from "./socialfire";
import firebase from "firebase";
import "firebase/messaging";
import EditProfile from "./pages/EditProfile";

import Post from "./pages/Post";
import Chat from './pages/Chat'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createToken } from "./api/user";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import EmailVerification from "./pages/EmailVerification";
import Notification from "./pages/Notification";



function App() {
  const userStore = useSelector((store) => store.userStore);

  useEffect(() => {
    if (userStore.token) {
      firebase
        .messaging()
        .getToken()
        .then(async (v) => {
          try{
          await createToken({token: userStore.token, deviceToken: v})
          }catch(e){
            console.log(e)
          }
        });
      firebase.messaging().onMessage((v) => {
        toast(v.data.body, {onClick: () => window.location.href =  v.data.action_url });

      });
    }
  }, [userStore]);

  return (
    <div>
      <DesktopNav />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/json">
          <JsonPlaceholder />
        </Route>
        <Route path="/chats">
          <Chat />
        </Route>
        <Route path="/deleteposts">
          <DeletePosts />
        </Route>
        <Route path="/editprofile">
          <EditProfile />
        </Route>
        <Route path="/post/:id" children={<Post />} />
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/change-password">
          <ChangePassword />
        </Route>
        <Route path="/email-verification">
          <EmailVerification />
        </Route>
        <Route path="/notification">
          <Notification />
        </Route>
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
